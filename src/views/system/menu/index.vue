<template>
  <div class="page-container">
    <div class="card table-card">
      <div class="table-header">
        <h3>菜单管理</h3>
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          <span>新增菜单</span>
        </el-button>
      </div>
      
      <el-table v-loading="loading" :data="menuList" stripe style="width: 100%" border row-key="id" :tree-props="{ children: 'children' }">
        <el-table-column prop="menuName" label="菜单名称" min-width="200" />
        <el-table-column prop="menuType" label="类型" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.menuType === 0 ? '' : row.menuType === 1 ? 'success' : 'warning'" size="small">
              {{ getTypeText(row.menuType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="100" align="center">
          <template #default="{ row }">
            <span v-if="row.icon">{{ row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由路径" min-width="150" show-overflow-tooltip />
        <el-table-column prop="component" label="组件路径" min-width="150" show-overflow-tooltip />
        <el-table-column prop="perms" label="权限标识" min-width="150" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="80" align="center" />
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="info" link @click="handleAddChild(row)">新增子项</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="showModal" :title="modalTitle" width="550px" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="上级菜单">
          <el-select v-model="formData.parentId" placeholder="请选择上级菜单" style="width: 100%">
            <el-option :value="0" label="顶级菜单" />
            <el-option v-for="menu in menuOptions" :key="menu.id" :value="menu.id" :label="menu.menuName" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="formData.menuType">
            <el-radio :value="0">目录</el-radio>
            <el-radio :value="1">菜单</el-radio>
            <el-radio :value="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="formData.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="路由路径" v-if="formData.menuType !== 2">
          <el-input v-model="formData.path" placeholder="请输入路由路径" />
        </el-form-item>
        <el-form-item label="组件路径" v-if="formData.menuType === 1">
          <el-input v-model="formData.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item label="权限标识" v-if="formData.menuType === 2">
          <el-input v-model="formData.perms" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="formData.icon" placeholder="请输入图标名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
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
import { getMenuTree, createMenu, updateMenu, deleteMenu } from '@/api/menu'

const menuList = ref([])
const loading = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const submitting = ref(false)
const modalTitle = computed(() => isEdit.value ? '编辑菜单' : '新增菜单')
const formData = reactive({ id: null, parentId: 0, menuName: '', menuType: 0, path: '', component: '', perms: '', icon: '', sort: 0, visible: 1, status: 1 })

const rules = { menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }], menuType: [{ required: true, message: '请选择菜单类型', trigger: 'change' }] }

const menuOptions = computed(() => {
  const list = []
  const traverse = (items) => { items.forEach(item => { if (item.menuType !== 2) { list.push(item); if (item.children) traverse(item.children) } }) }
  traverse(menuList.value)
  return list
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await getMenuTree()
    if (res.code === 200) {
      menuList.value = res.data || []
    }
  } catch (e) {
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

const handleAdd = () => {
  isEdit.value = false
  Object.assign(formData, { id: null, parentId: 0, menuName: '', menuType: 0, path: '', component: '', perms: '', icon: '', sort: 0, visible: 1, status: 1 })
  showModal.value = true
}

const handleAddChild = (menu) => {
  isEdit.value = false
  Object.assign(formData, { id: null, parentId: menu.id, menuName: '', menuType: menu.menuType === 0 ? 1 : 2, path: '', component: '', perms: '', icon: '', sort: 0, visible: 1, status: 1 })
  showModal.value = true
}

const handleEdit = (menu) => {
  isEdit.value = true
  Object.assign(formData, { ...menu })
  showModal.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    submitting.value = true
    try {
      if (isEdit.value) {
        await updateMenu({ id: formData.id, parentId: formData.parentId, menuName: formData.menuName, menuType: formData.menuType, path: formData.path, component: formData.component, perms: formData.perms, icon: formData.icon, sort: formData.sort, visible: formData.visible, status: formData.status })
      } else {
        await createMenu({ parentId: formData.parentId, menuName: formData.menuName, menuType: formData.menuType, path: formData.path, component: formData.component, perms: formData.perms, icon: formData.icon, sort: formData.sort, visible: formData.visible, status: formData.status })
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

const handleDelete = async (menu) => {
  try {
    await ElMessageBox.confirm(`确定要删除菜单 "${menu.menuName}" 吗？`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    await deleteMenu(menu.id)
    ElMessage.success('删除成功')
    loadData()
  } catch (e) {
    if (e !== 'cancel') ElMessage.error(e.message || '删除失败')
  }
}

const getTypeText = (type) => ({ 0: '目录', 1: '菜单', 2: '按钮' }[type] || '未知')

onMounted(() => { loadData() })
</script>

<style scoped lang="scss">
.page-container { padding: 0; }
.card { background: var(--card-bg); border-radius: var(--radius-lg); box-shadow: var(--shadow-light); margin-bottom: 16px;
  &.table-card { padding: 20px;
    .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; h3 { font-size: 16px; font-weight: 500; color: var(--text-color); margin: 0; } }
  }
}
:deep(.el-table) { --el-table-border-color: var(--border-color); --el-table-header-bg-color: #fafafa; th { background: #fafafa; color: var(--text-color); font-weight: 500; } }
:deep(.el-button.is-link) { padding: 0 4px; }
</style>