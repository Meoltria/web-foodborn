<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 系统设置
        </el-breadcrumb-item>
        <el-breadcrumb-item>部门管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      上级部门:
      <el-cascader :options="selects"
                   :props="defaultProps"
                   v-model="selected"
                   @change="handleChange"
                   change-on-select></el-cascader>
      <el-input v-model="listQuery.name"
                placeholder="部门名称"
                class="handle-input"></el-input>
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
                       label="部门编码">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="部门名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="部门类型"
                       width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.orgTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="部门电话">
        <template slot-scope="scope">
          <span>{{scope.row.tel}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="部门地址">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
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
        <el-form-item label="部门编码"
                      prop="code">
          <el-input v-model="temp.code"></el-input>
        </el-form-item>
        <el-form-item label="部门名称"
                      prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="部门类型"
                      prop="orgTypeCode">
          <el-select v-model="temp.orgTypeCode">
            <el-option v-for="item in orgTypeSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级部门">
          <el-cascader :options="selects"
                       :props="defaultProps"
                       v-model="tempSelected"
                       change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="temp.tel"></el-input>
        </el-form-item>
        <el-form-item label="部门地址">
          <el-input type="textarea"
                    v-model="temp.address"></el-input>
        </el-form-item>
        <el-form-item label="介绍信息">
          <el-input type="textarea"
                    v-model="temp.info"></el-input>
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
import {
  getOrgTree,
  getOrgs,
  getOrg,
  createOrg,
  updateOrg,
  deleteOrg
} from '@/api/orgnazition'
import { getDictonarySelect } from '@/api/dictionary'

export default {
  data () {
    return {
      list: null,
      total: null,
      selects: null,
      selected: [1],
      tempSelected: [1],
      orgTypeSelects: null,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
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
        orgTypeCode: '',
        orgTypeName: '',
        parent: 0,
        tel: '',
        address: '',
        info: '',
        status: '正常'
      },
      rules: {
        code: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        orgTypeCode: [
          { required: true, message: '请选择部门类型', trigger: 'select' }
        ]
      },
      synchronizingTemp: {
        opcode: undefined,
        ids: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '创建部门',
        edit: '编辑部门'
      }
    }
  },
  created () {
    this.getSelects()
    this.getOrgTypeSelects()
    this.getList()
  },
  methods: {
    getSelects () {
      getOrgTree(1).then(response => {
        this.selects = [response.data]
      })
    },
    getList () {
      this.listLoading = true
      var id = this.selected[this.selected.length - 1]
      getOrgs(id, this.listQuery).then(response => {
        this.list = response.data
        this.total = parseInt(response.headers['x-totalcount'])
        this.listLoading = false
      })
    },
    getOrgTypeSelects () {
      getDictonarySelect('OrgType').then(response => {
        this.orgTypeSelects = response.data
      })
    },
    getTemp (id) {
      getOrg(id).then(response => {
        this.temp = {
          id: response.data.id,
          code: response.data.code,
          name: response.data.name,
          orgTypeCode: response.data.orgTypeCode,
          orgTypeName: response.data.orgTypeName,
          parent: response.data.parent,
          tel: response.data.tel,
          address: response.data.address,
          info: response.data.info,
          status: response.data.status
        }
      })
    },
    createTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          this.temp.orgTypeName = this.orgTypeSelects.find(
            item => item.code === this.temp.orgTypeCode
          ).name
          this.temp.parent = this.tempSelected[this.tempSelected.length - 1]
          createOrg(this.temp).then(response => {
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
          this.temp.orgTypeName = this.orgTypeSelects.find(
            item => item.code === this.temp.orgTypeCode
          ).name
          this.temp.parent = this.tempSelected[this.tempSelected.length - 1]
          updateOrg(this.temp).then(response => {
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
      deleteOrg(id).then(response => {
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
        orgTypeCode: '',
        orgTypeName: '',
        parent: 0,
        tel: '',
        address: '',
        info: '',
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
