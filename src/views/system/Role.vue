<template>
  <div class="role-container">
    <div class="page-header">
      <h2>角色管理</h2>
      <p>管理系统中的角色及其权限</p>
    </div>
    
    <div class="role-content">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <div class="search-input">
          <input 
            v-model="searchForm.roleName"
            type="text" 
            placeholder="请输入角色名称"
            @keyup.enter="handleSearch"
          />
          <button class="btn-search" @click="handleSearch">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span>搜索</span>
          </button>
          <button class="btn-reset" @click="handleReset">重置</button>
        </div>
        <button class="btn-primary" @click="handleAdd">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          <span>新增角色</span>
        </button>
      </div>
      
      <!-- 表格 -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th width="80">ID</th>
              <th width="120">角色编码</th>
              <th>角色名称</th>
              <th>描述</th>
              <th width="100">状态</th>
              <th width="180">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="loading-cell">
                <div class="loading-spinner"></div>
                <span>加载中...</span>
              </td>
            </tr>
            <tr v-else-if="roleList.length === 0">
              <td colspan="6" class="empty-cell">暂无数据</td>
            </tr>
            <tr v-else v-for="role in roleList" :key="role.id">
              <td>{{ role.id }}</td>
              <td><code>{{ role.roleCode }}</code></td>
              <td>{{ role.roleName }}</td>
              <td>{{ role.description || '-' }}</td>
              <td>
                <span class="status-tag" :class="role.status === 1 ? 'status-active' : 'status-inactive'">
                  {{ role.status === 1 ? '启用' : '禁用' }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-action btn-edit" @click="handleEdit(role)">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    编辑
                  </button>
                  <button class="btn-action btn-delete" @click="handleDelete(role)">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                    删除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页 -->
      <div class="pagination-container" v-if="pagination.total > 0">
        <div class="pagination-info">
          共 {{ pagination.total }} 条记录，第 {{ pagination.pageNum }}/{{ totalPages }} 页
        </div>
        <div class="pagination-buttons">
          <button :disabled="pagination.pageNum <= 1" @click="handlePageChange(pagination.pageNum - 1)">上一页</button>
          <button :disabled="pagination.pageNum >= totalPages" @click="handlePageChange(pagination.pageNum + 1)">下一页</button>
        </div>
      </div>
    </div>
    
    <!-- 新增/编辑弹窗 -->
    <transition name="modal-fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3>{{ modalTitle }}</h3>
            <button class="modal-close" @click="closeModal">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-item">
                <label class="form-label">角色编码 <span class="required">*</span></label>
                <input 
                  v-model="formData.roleCode"
                  type="text" 
                  class="form-input"
                  placeholder="请输入角色编码"
                  :disabled="isEdit"
                />
              </div>
              <div class="form-item">
                <label class="form-label">角色名称 <span class="required">*</span></label>
                <input 
                  v-model="formData.roleName"
                  type="text" 
                  class="form-input"
                  placeholder="请输入角色名称"
                />
              </div>
              <div class="form-item">
                <label class="form-label">描述</label>
                <textarea 
                  v-model="formData.description"
                  class="form-textarea"
                  placeholder="请输入角色描述"
                  rows="3"
                ></textarea>
              </div>
              <div class="form-item">
                <label class="form-label">状态</label>
                <div class="radio-group">
                  <label class="radio-item">
                    <input type="radio" v-model.number="formData.status" :value="1" />
                    <span>启用</span>
                  </label>
                  <label class="radio-item">
                    <input type="radio" v-model.number="formData.status" :value="0" />
                    <span>禁用</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="closeModal">取消</button>
            <button class="btn-confirm" @click="handleSubmit" :disabled="submitting">
              {{ submitting ? '提交中...' : '确定' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- 消息提示 -->
    <transition name="message-fade">
      <div v-if="showMessage" class="message-popup" :class="messageType">
        <span class="message-icon">{{ messageType === 'success' ? '✓' : '✕' }}</span>
        <span class="message-text">{{ messageText }}</span>
      </div>
    </transition>
    
    <!-- 确认删除弹窗 -->
    <transition name="modal-fade">
      <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="showDeleteConfirm = false">
        <div class="modal-dialog modal-sm">
          <div class="modal-header modal-warning">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            <h3>确认删除</h3>
          </div>
          <div class="modal-body">
            <p>确定要删除角色 <strong>{{ deleteTarget?.roleName }}</strong> 吗？</p>
            <p class="warning-text">此操作不可恢复</p>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel" @click="showDeleteConfirm = false">取消</button>
            <button class="btn-confirm btn-danger" @click="confirmDelete" :disabled="deleting">
              {{ deleting ? '删除中...' : '确定删除' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { getRolePage, createRole, updateRole, deleteRole } from '@/api/role'

// 列表数据
const roleList = ref([])
const loading = ref(false)
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const totalPages = computed(() => Math.ceil(pagination.total / pagination.pageSize))

// 搜索
const searchForm = reactive({
  roleName: ''
})

// 弹窗
const showModal = ref(false)
const isEdit = ref(false)
const modalTitle = computed(() => isEdit.value ? '编辑角色' : '新增角色')
const formData = reactive({
  id: null,
  roleCode: '',
  roleName: '',
  description: '',
  status: 1
})
const submitting = ref(false)

// 删除确认
const showDeleteConfirm = ref(false)
const deleteTarget = ref(null)
const deleting = ref(false)

// 消息提示
const showMessage = ref(false)
const messageText = ref('')
const messageType = ref('success')

const showMessagePopup = (text, type = 'success') => {
  messageText.value = text
  messageType.value = type
  showMessage.value = true
  setTimeout(() => { showMessage.value = false }, 3000)
}

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params = {
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    }
    if (searchForm.roleName) {
      params.roleName = searchForm.roleName
    }
    
    const response = await getRolePage(params)
    if (response.code === 200 && response.data) {
      roleList.value = response.data.records || []
      pagination.total = response.data.total || 0
    }
  } catch (error) {
    showMessagePopup('加载数据失败', 'error')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageNum = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.roleName = ''
  pagination.pageNum = 1
  loadData()
}

// 翻页
const handlePageChange = (page) => {
  pagination.pageNum = page
  loadData()
}

// 新增
const handleAdd = () => {
  isEdit.value = false
  Object.assign(formData, {
    id: null,
    roleCode: '',
    roleName: '',
    description: '',
    status: 1
  })
  showModal.value = true
}

// 编辑
const handleEdit = (role) => {
  isEdit.value = true
  Object.assign(formData, {
    id: role.id,
    roleCode: role.roleCode,
    roleName: role.roleName,
    description: role.description,
    status: role.status
  })
  showModal.value = true
}

// 关闭弹窗
const closeModal = () => {
  showModal.value = false
}

// 提交表单
const handleSubmit = async () => {
  if (!formData.roleCode.trim()) {
    showMessagePopup('请输入角色编码', 'error')
    return
  }
  if (!formData.roleName.trim()) {
    showMessagePopup('请输入角色名称', 'error')
    return
  }
  
  submitting.value = true
  try {
    if (isEdit.value) {
      await updateRole({
        id: formData.id,
        roleName: formData.roleName,
        description: formData.description,
        status: formData.status
      })
      showMessagePopup('更新成功', 'success')
    } else {
      await createRole({
        roleCode: formData.roleCode,
        roleName: formData.roleName,
        description: formData.description,
        status: formData.status
      })
      showMessagePopup('创建成功', 'success')
    }
    closeModal()
    loadData()
  } catch (error) {
    let errorMsg = '操作失败'
    if (error.response?.data?.message) {
      errorMsg = error.response.data.message
    }
    showMessagePopup(errorMsg, 'error')
  } finally {
    submitting.value = false
  }
}

// 删除
const handleDelete = (role) => {
  deleteTarget.value = role
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    await deleteRole(deleteTarget.value.id)
    showMessagePopup('删除成功', 'success')
    showDeleteConfirm.value = false
    loadData()
  } catch (error) {
    let errorMsg = '删除失败'
    if (error.response?.data?.message) {
      errorMsg = error.response.data.message
    }
    showMessagePopup(errorMsg, 'error')
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.role-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 24px;
  
  h2 {
    font-size: 20px;
    color: #262626;
    margin: 0 0 6px 0;
    font-weight: 600;
  }
  
  p {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0;
  }
}

.role-content {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.search-input {
  display: flex;
  align-items: center;
  gap: 12px;
  
  input {
    width: 240px;
    height: 40px;
    padding: 0 14px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
    
    &:focus {
      border-color: #1890ff;
    }
    
    &::placeholder {
      color: #bfbfbf;
    }
  }
}

.btn-search, .btn-reset {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-search {
  background: #1890ff;
  color: #fff;
  border: none;
  
  &:hover {
    background: #40a9ff;
  }
}

.btn-reset {
  background: #fff;
  color: #595959;
  border: 1px solid #d9d9d9;
  
  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #40a9ff;
  }
}

// 表格
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  
  th {
    background: #fafafa;
    padding: 14px 16px;
    text-align: left;
    font-weight: 500;
    color: #262626;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  td {
    padding: 14px 16px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 14px;
    color: #595959;
  }
  
  tr:hover td {
    background: #fafafa;
  }
  
  code {
    background: #f5f5f5;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 13px;
    color: #1890ff;
  }
  
  .loading-cell, .empty-cell {
    text-align: center;
    padding: 40px;
    color: #bfbfbf;
  }
  
  .loading-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e8e8e8;
      border-top-color: #1890ff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// 状态标签
.status-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  &.status-active {
    background: #f6ffed;
    color: #52c41a;
  }
  
  &.status-inactive {
    background: #fff7e6;
    color: #fa8c16;
  }
}

// 操作按钮
.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  
  &.btn-edit {
    background: #e6f7ff;
    color: #1890ff;
    
    &:hover {
      background: #bae7ff;
    }
  }
  
  &.btn-delete {
    background: #fff1f0;
    color: #ff4d4f;
    
    &:hover {
      background: #ffccc7;
    }
  }
}

// 分页
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  
  .pagination-info {
    font-size: 14px;
    color: #8c8c8c;
  }
  
  .pagination-buttons {
    display: flex;
    gap: 8px;
    
    button {
      padding: 8px 16px;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover:not(:disabled) {
        border-color: #1890ff;
        color: #1890ff;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

// 弹窗
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-dialog {
  background: #fff;
  border-radius: 12px;
  width: 480px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  
  &.modal-sm {
    width: 360px;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  
  h3 {
    font-size: 16px;
    color: #262626;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  &.modal-warning {
    h3 {
      color: #fa8c16;
    }
    svg {
      color: #fa8c16;
    }
  }
  
  .modal-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #8c8c8c;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover {
      background: #f5f5f5;
      color: #262626;
    }
  }
}

.modal-body {
  padding: 24px;
  
  .form-item {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    color: #262626;
    margin-bottom: 8px;
    
    .required {
      color: #ff4d4f;
    }
  }
  
  .form-input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
    
    &:focus {
      border-color: #1890ff;
    }
    
    &:disabled {
      background: #f5f5f5;
      cursor: not-allowed;
    }
  }
  
  .form-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    resize: vertical;
    transition: border-color 0.3s;
    
    &:focus {
      border-color: #1890ff;
    }
  }
  
  .radio-group {
    display: flex;
    gap: 24px;
    
    .radio-item {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      
      input[type="radio"] {
        accent-color: #1890ff;
      }
    }
  }
  
  p {
    margin: 0 0 8px 0;
    color: #595959;
  }
  
  .warning-text {
    color: #ff4d4f;
    font-size: 13px;
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  
  .btn-cancel, .btn-confirm {
    padding: 8px 24px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-cancel {
    background: #fff;
    border: 1px solid #d9d9d9;
    color: #595959;
    
    &:hover {
      border-color: #1890ff;
      color: #1890ff;
    }
  }
  
  .btn-confirm {
    background: #1890ff;
    border: none;
    color: #fff;
    
    &:hover:not(:disabled) {
      background: #40a9ff;
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    &.btn-danger {
      background: #ff4d4f;
      
      &:hover:not(:disabled) {
        background: #ff7875;
      }
    }
  }
}

// 消息提示
.message-popup {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &.success {
    background: #52c41a;
    color: #fff;
  }
  
  &.error {
    background: #ff4d4f;
    color: #fff;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.message-fade-enter-active {
  transition: all 0.3s ease;
}

.message-fade-leave-active {
  transition: all 0.2s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-16px);
}
</style>