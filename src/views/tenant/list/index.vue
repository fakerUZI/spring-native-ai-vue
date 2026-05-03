<template>
  <div class="page-container">
    <div class="card">
      <div class="search-form">
        <el-form :model="searchForm" inline>
          <el-form-item label="租户名称">
            <el-input v-model="searchForm.tenantName" placeholder="请输入租户名称" clearable @keyup.enter="handleSearch" />
          </el-form-item>
          <el-form-item label="租户编码">
            <el-input v-model="searchForm.tenantCode" placeholder="请输入租户编码" clearable @keyup.enter="handleSearch" />
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
        <h3>租户列表</h3>
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          <span>新增租户</span>
        </el-button>
      </div>
      
      <el-table v-loading="loading" :data="tenantList" stripe style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="tenantCode" label="租户编码" width="120" />
        <el-table-column prop="tenantName" label="租户名称" min-width="150" />
        <el-table-column prop="contactName" label="联系人" width="100" />
        <el-table-column prop="contactPhone" label="联系电话" width="130" />
        <el-table-column prop="maxUsers" label="最大用户数" width="100" align="center" />
        <el-table-column prop="expireTime" label="到期时间" width="120" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : row.status === 0 ? 'danger' : 'info'" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
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

    <el-dialog v-model="showModal" :title="modalTitle" width="600px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="90px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="租户编码" prop="tenantCode">
              <el-input v-model="formData.tenantCode" placeholder="请输入租户编码" :disabled="isEdit" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="租户名称" prop="tenantName">
              <el-input v-model="formData.tenantName" placeholder="请输入租户名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="formData.contactName" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="formData.contactPhone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系邮箱">
              <el-input v-model="formData.contactEmail" placeholder="请输入联系邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大用户数">
              <el-input-number v-model="formData.maxUsers" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="独立域名">
          <el-input v-model="formData.domain" placeholder="请输入独立域名" />
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker v-model="formData.expireTime" type="datetime" placeholder="请选择到期时间" style="width: 100%" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.description" type="textarea" placeholder="请输入备注" :rows="3" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
            <el-radio :value="2">到期</el-radio>
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
import { getTenantPage, createTenant, updateTenant, deleteTenant } from '@/api/tenant'

const tenantList = ref([])
const loading = ref(false)
const pagination = reactive({ pageNum: 1, pageSize: 10, total: 0 })
const searchForm = reactive({ tenantName: '', tenantCode: '' })
const showModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const submitting = ref(false)
const modalTitle = computed(() => isEdit.value ? '编辑租户' : '新增租户')
const formData = reactive({ id: null, tenantCode: '', tenantName: '', domain: '', logo: '', status: 1, expireTime: '', contactName: '', contactPhone: '', contactEmail: '', maxUsers: 100, description: '' })

const rules = {
  tenantCode: [{ required: true, message: '请输入租户编码', trigger: 'blur' }],
  tenantName: [{ required: true, message: '请输入租户名称', trigger: 'blur' }]
}

const getStatusText = (status) => ({ 1: '启用', 0: '禁用', 2: '到期' }[status] || '未知')

const loadData = async () => {
  loading.value = true
  try {
    const res = await getTenantPage({ pageNum: pagination.pageNum, pageSize: pagination.pageSize, ...searchForm })
    if (res.code === 200 && res.data) {
      tenantList.value = res.data.records || []
      pagination.total = res.data.total || 0
    }
  } catch (e) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => { pagination.pageNum = 1; loadData() }
const handleReset = () => { searchForm.tenantName = ''; searchForm.tenantCode = ''; pagination.pageNum = 1; loadData() }
const handlePageChange = (page) => { pagination.pageNum = page; loadData() }
const handleSizeChange = (size) => { pagination.pageSize = size; pagination.pageNum = 1; loadData() }
const handleAdd = () => { isEdit.value = false; Object.assign(formData, { id: null, tenantCode: '', tenantName: '', domain: '', logo: '', status: 1, expireTime: '', contactName: '', contactPhone: '', contactEmail: '', maxUsers: 100, description: '' }); showModal.value = true }
const handleEdit = (tenant) => { isEdit.value = true; Object.assign(formData, { ...tenant }); showModal.value = true }

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      if (isEdit.value) {
        await updateTenant({ id: formData.id, tenantCode: formData.tenantCode, tenantName: formData.tenantName, domain: formData.domain, logo: formData.logo, status: formData.status, expireTime: formData.expireTime, contactName: formData.contactName, contactPhone: formData.contactPhone, contactEmail: formData.contactEmail, maxUsers: formData.maxUsers, description: formData.description })
      } else {
        await createTenant({ tenantCode: formData.tenantCode, tenantName: formData.tenantName, domain: formData.domain, logo: formData.logo, status: formData.status, expireTime: formData.expireTime, contactName: formData.contactName, contactPhone: formData.contactPhone, contactEmail: formData.contactEmail, maxUsers: formData.maxUsers, description: formData.description })
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

const handleDelete = async (tenant) => {
  try {
    await ElMessageBox.confirm(`确定要删除租户 "${tenant.tenantName}" 吗？`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    await deleteTenant(tenant.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('删除失败')
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