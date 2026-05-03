<template>
  <div class="page-container">
    <div class="card">
      <div class="search-form">
        <el-form :model="searchForm" inline>
          <el-form-item label="角色名称">
            <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable @keyup.enter="handleSearch" />
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

    <div class="card table-card">
      <div class="table-header">
        <h3>角色列表</h3>
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          <span>新增角色</span>
        </el-button>
      </div>
      
      <el-table v-loading="loading" :data="roleList" stripe style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="roleCode" label="角色编码" width="150" />
        <el-table-column prop="roleName" label="角色名称" min-width="120" />
        <el-table-column prop="description" label="描述" min-width="150" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="warning" link @click="handleAssignMenus(row)">分配权限</el-button>
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

    <!-- 新增/编辑角色对话框 -->
    <el-dialog v-model="showModal" :title="modalTitle" width="500px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="formData.roleCode" placeholder="请输入角色编码" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" placeholder="请输入描述" :rows="3" />
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

    <!-- 分配权限对话框 -->
    <el-dialog v-model="showMenuDialog" title="分配权限" width="500px" :close-on-click-modal="false">
      <div v-loading="menuLoading">
        <el-tree
          ref="treeRef"
          :data="menuTree"
          :props="{ label: 'menuName', children: 'children' }"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkedMenuIds"
          :check-strictly="true"
          style="max-height: 400px; overflow-y: auto;"
        />
      </div>
      <template #footer>
        <el-button @click="showMenuDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSaveMenus" :loading="savingMenus">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getRolePage, createRole, updateRole, deleteRole, getRoleMenus, assignRoleMenus } from '@/api/role'
import { getMenuTree } from '@/api/menu'

const roleList = ref([])
const loading = ref(false)
const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })
const searchForm = reactive({ roleName: '' })
const showModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const submitting = ref(false)
const modalTitle = computed(() => isEdit.value ? '编辑角色' : '新增角色')
const formData = reactive({ id: null, roleCode: '', roleName: '', description: '', status: 1 })

// 分配权限相关
const showMenuDialog = ref(false)
const menuTree = ref([])
const checkedMenuIds = ref([])
const currentRoleId = ref(null)
const menuLoading = ref(false)
const savingMenus = ref(false)
const treeRef = ref(null)

const rules = {
  roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
}

const loadData = async () => {
  loading.value = true
  try {
    const res = await getRolePage({ pageNum: pagination.pageNum, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 200 && res.data) {
      roleList.value = res.data.records || []
      pagination.total = res.data.total || 0
    }
  } catch (e) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.pageNum = 1; loadData() }
const handleReset = () => { searchForm.roleName = ''; pagination.pageNum = 1; loadData() }
const handlePageChange = (page) => { pagination.pageNum = page; loadData() }
const handleSizeChange = (size) => { pagination.pageSize = size; pagination.pageNum = 1; loadData() }
const handleAdd = () => { isEdit.value = false; Object.assign(formData, { id: null, roleCode: '', roleName: '', description: '', status: 1 }); showModal.value = true }
const handleEdit = (role) => { isEdit.value = true; Object.assign(formData, { ...role }); showModal.value = true }

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      if (isEdit.value) await updateRole({ id: formData.id, roleName: formData.roleName, description: formData.description, status: formData.status })
      else await createRole({ roleCode: formData.roleCode, roleName: formData.roleName, description: formData.description, status: formData.status })
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

const handleDelete = async (role) => {
  try {
    await ElMessageBox.confirm(`确定要删除角色 "${role.roleName}" 吗？`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    await deleteRole(role.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('删除失败')
  }
}

// 打开分配权限对话框
const handleAssignMenus = async (role) => {
  currentRoleId.value = role.id
  showMenuDialog.value = true
  menuLoading.value = true
  
  try {
    // 获取菜单树
    const menuRes = await getMenuTree()
    if (menuRes.code === 200 && menuRes.data) {
      menuTree.value = menuRes.data
    }
    
    // 获取已分配的菜单
    const roleMenuRes = await getRoleMenus(role.id)
    if (roleMenuRes.code === 200 && roleMenuRes.data) {
      checkedMenuIds.value = roleMenuRes.data
    }
  } catch (e) {
    ElMessage.error('加载菜单失败')
  } finally {
    menuLoading.value = false
  }
}

// 保存分配的菜单
const handleSaveMenus = async () => {
  if (!treeRef.value) return
  
  savingMenus.value = true
  try {
    // 获取选中的节点（包括半选中状态）
    const checkedKeys = treeRef.value.getCheckedKeys()
    const halfCheckedKeys = treeRef.value.getHalfCheckedKeys()
    const allKeys = [...checkedKeys, ...halfCheckedKeys]
    
    await assignRoleMenus(currentRoleId.value, allKeys)
    ElMessage.success('分配成功')
    showMenuDialog.value = false
  } catch (e) {
    ElMessage.error('分配失败')
  } finally {
    savingMenus.value = false
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