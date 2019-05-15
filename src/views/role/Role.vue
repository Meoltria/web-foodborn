<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 系统设置
        </el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="search">查询</el-button>
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="handleCreate">添加</el-button>
    </div>
    <el-table :data="list"
              v-loading="listLoading"
              element-loading-text="正在加载数据..."
              borde
              fit
              highlight-current-row
              style="width:100%">
      <el-table-column align="center"
                       label="角色编码">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="角色名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="角色描述">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="270px">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="small"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary"
                     icon="el-icon-setting"
                     size="small"
                     @click="handlePower(scope.row)">权限</el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="small"
                     @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading"
         class="pagination">
      <el-pagination :page-sizes="[10,15,20,30]"
                     :page-size="listQuery.per_Page"
                     layout="total, sizes, prev, pager, next"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :total="total"></el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form class="small-space"
               :model="temp"
               :rules="rules"
               ref="temp"
               label-position="left"
               label-width="120px"
               style="width: 450px; margin-left:50px;">
        <el-form-item label="角色编码"
                      prop="code">
          <el-input v-model="temp.code"></el-input>
        </el-form-item>
        <el-form-item label="角色名称"
                      prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea"
                    v-model="temp.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="createTemp">确 定</el-button>
        <el-button v-if="dialogStatus=='edit'"
                   type="primary"
                   @click="updateTemp">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置权限"
               :visible.sync="dialogPowerVisible">
      <el-tree ref="powerTree"
               :data="powerTree"
               :props="defaultProps"
               :default-checked-keys="powerTemp.permIds"
               node-key="id"
               check-strictly
               show-checkbox
               default-expand-all></el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogPowerVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="setPowerTemp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole
} from '@/api/role'
import {
  getPermissionTree,
  getRolePermissions,
  setRolePermissions
} from '@/api/permission'

export default {
  data () {
    return {
      list: null,
      powerTree: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        per_Page: 10
      },
      temp: {
        id: undefined,
        code: '',
        name: '',
        description: '',
        status: '正常'
      },
      rules: {
        code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      powerTemp: {
        roleId: undefined,
        permIds: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '创建角色',
        edit: '编辑角色'
      },
      dialogPowerVisible: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      getRoles(this.listQuery).then(response => {
        this.list = response.data
        this.total = parseInt(response.headers['x-totalcount'])
        this.listLoading = false
      })
    },
    getPermissionTree () {
      getPermissionTree(1).then(response => {
        this.powerTree = [response.data]
      })
    },
    getTemp (id) {
      getRole(id).then(response => {
        this.temp = {
          id: response.data.id,
          code: response.data.code,
          name: response.data.name,
          description: response.data.description,
          status: response.data.status
        }
      })
    },
    getPowerTemp (id) {
      getRolePermissions(id).then(response => {
        this.powerTemp = {
          roleId: id,
          permIds: response.data
        }
      })
    },
    createTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          createRole(this.temp).then(response => {
            if (response.status === 201) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },
    updateTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          updateRole(this.temp).then(response => {
            if (response.status === 204) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },
    deleteTemp (id) {
      deleteRole(id).then(response => {
        if (response.status === 204) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.getList()
        }
      })
    },
    setPowerTemp () {
      this.powerTemp.permIds = this.$refs.powerTree.getCheckedKeys()
      setRolePermissions(this.powerTemp).then(response => {
        if (response.status === 204) {
          this.dialogPowerVisible = false
          this.$notify({
            title: '成功',
            message: '权限设置成功',
            type: 'success',
            duration: 3000
          })
        }
      })
    },
    search () {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        code: '',
        name: '',
        description: '',
        status: '正常'
      }
    },
    handleSizeChange (val) {
      this.listQuery.per_Page = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.getTemp(row.id)
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    handleDelete (row) {
      this.$confirm('确定要删除当前信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteTemp(row.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          })
        })
    },
    handlePower (row) {
      this.getPermissionTree()
      this.getPowerTemp(row.id)
      this.dialogPowerVisible = true
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 180px;
  display: inline-block;
}
</style>
