<template>
  <div class="page-container">
    <!-- 搜索区域卡片 -->
    <div class="card">
      <div class="search-form">
        <el-form :model="searchForm" inline>
          <el-form-item label="用户名">
            <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable @keyup.enter="handleSearch" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable @keyup.enter="handleSearch" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              <span>搜索</span>
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              <span>重置</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 表格区域卡片 -->
    <div class="card table-card">
      <div class="table-header">
        <h3>用户列表</h3>
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          <span>新增用户</span>
        </el-button>
      </div>
      
      <el-table v-loading="loading" :data="userList" stripe style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="username" label="用户名" min-width="120" />
        <el-table-column prop="phone" label="手机号" min-width="130" />
        <el-table-column prop="email" label="邮箱" min-width="150" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="warning" link @click="handleResetPassword(row)">重置密码</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper" v-if="pagination.total > 0">
        <el-pagination
          v-model:current-page="pagination.pageNum"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="showModal" :title="modalTitle" width="500px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showModal = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { getUserPage, createUser, updateUser, deleteUser, resetPassword } from '@/api/user'

const userList = ref([])
const loading = ref(false)
const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })
const searchForm = reactive({ username: '', phone: '' })
const showModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const submitting = ref(false)

const modalTitle = computed(() => isEdit.value ? '编辑用户' : '新增用户')

const formData = reactive({ id: null, username: '', password: '', phone: '', email: '', status: 1 })

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getUserPage({ pageNum: pagination.pageNum, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 200 && res.data) {
      userList.value = res.data.records || []
      pagination.total = res.data.total || 0
    }
  } catch (e) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.pageNum = 1; loadData() }
const handleReset = () => { searchForm.username = ''; searchForm.phone = ''; pagination.pageNum = 1; loadData() }
const handlePageChange = (page) => { pagination.pageNum = page; loadData() }
const handleSizeChange = (size) => { pagination.pageSize = size; pagination.pageNum = 1; loadData() }

const handleAdd = () => {
  isEdit.value = false
  Object.assign(formData, { id: null, username: '', password: '', phone: '', email: '', status: 1 })
  showModal.value = true
}

const handleEdit = (user) => {
  isEdit.value = true
  Object.assign(formData, { ...user, password: '' })
  showModal.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      if (isEdit.value) {
        await updateUser({ id: formData.id, phone: formData.phone, email: formData.email, status: formData.status })
      } else {
        await createUser({ ...formData })
      }
      ElMessage.success('操作成功')
      showModal.value = false
      loadData()
    } catch (e) {
      ElMessage.error(e.message || '操作失败')
    } finally {
      submitting.value = false
    }
  })
}

const handleDelete = async (user) => {
  try {
    await ElMessageBox.confirm(`确定要删除用户 "${user.username}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deleteUser(user.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

const handleResetPassword = async (user) => {
  try {
    await ElMessageBox.confirm(`确定要重置用户 "${user.username}" 的密码吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await resetPassword(user.id)
    ElMessage.success('密码重置成功')
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('重置失败')
  }
}

onMounted(() => { loadData() })
</script>

<style scoped lang="scss">
.page-container { padding: 0; }
.card { background: var(--card-bg); border-radius: var(--radius-lg); box-shadow: var(--shadow-light); margin-bottom: 16px;
  &.table-card { padding: 20px;
    .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; h3 { font-size: 16px; font-weight: 500; color: var(--text-color); margin: 0; } }
  }
}
.search-form { padding: 20px; }
.pagination-wrapper { display: flex; justify-content: flex-end; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color); }
:deep(.el-table) { --el-table-border-color: var(--border-color); --el-table-header-bg-color: #fafafa; th { background: #fafafa; color: var(--text-color); font-weight: 500; } }
:deep(.el-button.is-link) { padding: 0 4px; }
</style>