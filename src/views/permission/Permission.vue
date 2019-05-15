<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>功能管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      父级功能:
      <el-cascader :options="selects"
                   :props="defaultProps"
                   size="medium"
                   v-model="selected"
                   @change="handleChange"
                   change-on-select>
      </el-cascader>
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
                       label="功能编码">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="功能名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="功能类型"
                       width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.property}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="功能描述">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="排序">
        <template slot-scope="scope">
          <span>{{scope.row.order}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="180px">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="small"
                     @click="handleEdit(scope.row)">编辑</el-button>
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
                     :total='total'>
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form class="small-space"
               :model="temp"
               :rules="rules"
               ref="temp"
               label-position="left"
               label-width="120px"
               style='width: 450px; margin-left:50px;'>
        <el-form-item label="功能编码"
                      prop="code">
          <el-input v-model="temp.code"></el-input>
        </el-form-item>
        <el-form-item label="功能名称"
                      prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="功能类型"
                      prop="property">
          <el-select v-model="temp.property">
            <el-option v-for="item in propertySelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级功能">
          <el-cascader :options="selects"
                       :props="defaultProps"
                       v-model="tempSelected"
                       change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="功能图标">
          <el-input v-model="temp.icon"></el-input>
        </el-form-item>
        <el-form-item label="功能路径">
          <el-input v-model="temp.path"></el-input>
        </el-form-item>
        <el-form-item label="功能描述">
          <el-input type="textarea"
                    v-model="temp.description"></el-input>
        </el-form-item>
        <el-form-item label="功能排序">
          <el-input v-model="temp.order"></el-input>
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
  </div>
</template>

<script>
import { getPermissionTree, getPermissions, getPermission, createPermission, updatePermission, deletePermission } from '@/api/permission'

export default {
  data () {
    return {
      list: null,
      total: null,
      selects: null,
      selected: [1],
      tempSelected: [1],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      propertySelects: [{
        code: '目录',
        name: '目录'
      }, {
        code: '菜单',
        name: '菜单'
      }],
      listLoading: true,
      listQuery: {
        name: undefined,
        page: 1,
        per_Page: 10
      },
      temp: {
        id: undefined,
        code: '',
        name: '',
        parent: 0,
        icon: '',
        path: '',
        property: '',
        description: '',
        order: 0,
        status: '正常'
      },
      rules: {
        code: [
          { required: true, message: '请输入功能编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入功能名称', trigger: 'blur' }
        ],
        property: [
          { required: true, message: '请选择功能类型', trigger: 'select' }
        ]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '创建功能',
        edit: '编辑功能'
      }
    }
  },
  created () {
    this.getSelects()
    this.getList()
  },
  methods: {
    getSelects () {
      getPermissionTree(1).then(response => {
        this.selects = [response.data]
      })
    },
    getList () {
      this.listLoading = true
      var id = this.selected[this.selected.length - 1]
      getPermissions(id, this.listQuery).then(response => {
        this.list = response.data
        this.total = parseInt(response.headers['x-totalcount'])
        this.listLoading = false
      })
    },
    getTemp (id) {
      getPermission(id).then(response => {
        this.temp = {
          id: response.data.id,
          code: response.data.code,
          name: response.data.name,
          parent: response.data.parent,
          icon: response.data.icon,
          path: response.data.path,
          property: response.data.property,
          description: response.data.description,
          order: response.data.order,
          status: response.data.status
        }
      })
    },
    createTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          this.temp.parent = this.tempSelected[this.tempSelected.length - 1]
          createPermission(this.temp).then(response => {
            if (response.status === 201) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
              this.getSelects()
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
          this.temp.parent = this.tempSelected[this.tempSelected.length - 1]
          updatePermission(this.temp).then(response => {
            if (response.status === 204) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
              this.getSelects()
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },
    deleteTemp (id) {
      deletePermission(id).then(response => {
        if (response.status === 204) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.getSelects()
          this.getList()
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
        parent: 0,
        icon: '',
        path: '',
        property: '',
        description: '',
        order: 0,
        status: '正常'
      }
    },
    handleChange () {
      this.listQuery.page = 1
      this.getList()
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
      this.tempSelected = this.selected
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.getTemp(row.id)
      this.tempSelected = this.selected
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
    },
    handleDelete (row) {
      this.$confirm('确定要删除当前信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTemp(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      })
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
