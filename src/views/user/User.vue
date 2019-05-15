<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 系统设置
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      所属部门:
      <el-cascader :options="orgSelects"
                   :props="defaultProps"
                   size="medium"
                   v-model="orgSelected"
                   @change="handleChange"
                   change-on-select></el-cascader>
      <el-input v-model="listQuery.name"
                size="medium"
                placeholder="用户名称"
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
                       label="用户编码">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="用户名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="性别"
                       width="80px">
        <template slot-scope="scope">
          <span>{{scope.row.genderName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="用户类型"
                       width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.userTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="用户部门">
        <template slot-scope="scope">
          <span>{{scope.row.organazitionName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="用户角色">
        <template slot-scope="scope">
          <span>{{scope.row.roleName}}</span>
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
        <el-form-item label="用户编码"
                      prop="code">
          <el-input v-model="temp.code"></el-input>
        </el-form-item>
        <el-form-item label="用户名称"
                      prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="密   码"
                      prop="passWord"
                      v-if="dialogStatus=='create'">
          <el-input type="password"
                    v-model="temp.passWord"></el-input>
        </el-form-item>
        <el-form-item label="用户类型"
                      prop="userTypeCode">
          <el-select v-model="temp.userTypeCode">
            <el-option v-for="item in userTypeSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-cascader :options="orgSelects"
                       :props="defaultProps"
                       v-model="tempOrgSelected"
                       change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="所属角色"
                      prop="roleId">
          <el-select v-model.number="temp.roleId">
            <el-option v-for="item in roleSelects"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性  别"
                      prop="genderCode">
          <el-select v-model="temp.genderCode">
            <el-option v-for="item in genderSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职  称"
                      prop="userRankCode">
          <el-select v-model="temp.userRankCode">
            <el-option v-for="item in userRankSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="temp.tel"></el-input>
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
import { getOrgTree } from '@/api/orgnazition'
import { getRoles } from '@/api/role'
import { getDictonarySelect } from '@/api/dictionary'
import {
  getOrgUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '@/api/user'

export default {
  data () {
    return {
      list: null,
      total: null,
      orgSelects: null,
      orgSelected: [1, 2],
      roleSelects: null,
      tempOrgSelected: [1, 2],
      userTypeSelects: null,
      genderSelects: null,
      userRankSelects: null,
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
        passWord: '',
        userTypeCode: '',
        userTypeName: '',
        organazitionId: 0,
        roleId: 0,
        genderCode: '',
        genderName: '',
        userRankCode: '',
        userRankName: '',
        tel: '',
        info: '',
        status: '正常'
      },
      rules: {
        code: [{ required: true, message: '请输入用户编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择用户角色' }],
        userTypeCode: [
          { required: true, message: '请选择用户类型', trigger: 'select' }
        ],
        genderCode: [
          { required: true, message: '请选择性别', trigger: 'select' }
        ],
        userRankCode: [
          { required: true, message: '请选择用户职称', trigger: 'select' }
        ]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '创建用户',
        edit: '编辑用户'
      }
    }
  },
  created () {
    this.getOrgSelects()
    this.getRoleSelects()
    this.getUserTypeSelects()
    this.getGenderSelects()
    this.getUserRankSelects()
    this.getList()
  },
  methods: {
    getOrgSelects () {
      getOrgTree(1).then(response => {
        this.orgSelects = [response.data]
      })
    },
    getRoleSelects () {
      getRoles().then(response => {
        this.roleSelects = response.data
      })
    },
    getList () {
      this.listLoading = true
      var orgId = this.orgSelected[this.orgSelected.length - 1]
      getOrgUsers(orgId, this.listQuery).then(response => {
        this.list = response.data
        this.total = parseInt(response.headers['x-totalcount'])
        this.listLoading = false
      })
    },
    getUserTypeSelects () {
      getDictonarySelect('UserType').then(response => {
        this.userTypeSelects = response.data
      })
    },
    getGenderSelects () {
      getDictonarySelect('Gender').then(response => {
        this.genderSelects = response.data
      })
    },
    getUserRankSelects () {
      getDictonarySelect('UserRank').then(response => {
        this.userRankSelects = response.data
      })
    },
    getTemp (id) {
      getUser(id).then(response => {
        this.temp = {
          id: response.data.id,
          code: response.data.code,
          name: response.data.name,
          passWord: response.data.passWord,
          userTypeCode: response.data.userTypeCode,
          userTypeName: response.data.userTypeName,
          organazitionId: response.data.organazitionId,
          roleId: response.data.roleId,
          genderCode: response.data.genderCode,
          genderName: response.data.genderName,
          userRankCode: response.data.userRankCode,
          userRankName: response.data.userRankName,
          tel: response.data.tel,
          info: response.data.info,
          status: response.data.status
        }
      })
    },
    createTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          this.temp.userTypeName = this.userTypeSelects.find(item => item.code === this.temp.userTypeCode).name
          this.temp.genderName = this.genderSelects.find(item => item.code === this.temp.genderCode).name
          this.temp.userRankName = this.userRankSelects.find(item => item.code === this.temp.userRankCode).name
          this.temp.organazitionId = this.tempOrgSelected[this.tempOrgSelected.length - 1]
          createUser(this.temp).then(response => {
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
          this.temp.userTypeName = this.userTypeSelects.find(item => item.code === this.temp.userTypeCode).name
          this.temp.genderName = this.genderSelects.find(item => item.code === this.temp.genderCode).name
          this.temp.userRankName = this.userRankSelects.find(item => item.code === this.temp.userRankCode).name
          this.temp.organazitionId = this.tempOrgSelected[this.tempOrgSelected.length - 1]
          updateUser(this.temp).then(response => {
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
      deleteUser(id).then(response => {
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
        passWord: '',
        userTypeCode: '',
        userTypeName: '',
        organazitionId: undefined,
        roleId: undefined,
        genderCode: '',
        genderName: '',
        userRankCode: '',
        userRankName: '',
        tel: '',
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
      this.tempOrgSelected = this.orgSelected
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.getTemp(row.id)
      this.tempOrgSelected = this.orgSelected
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
