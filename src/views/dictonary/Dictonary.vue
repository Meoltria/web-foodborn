<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 系统设置
        </el-breadcrumb-item>
        <el-breadcrumb-item>数据字典</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="listQuery.typeCode"
                placeholder="字典类别代码"
                class="handle-input"></el-input>
      <el-input v-model="listQuery.typeName"
                placeholder="字典类别名称"
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
                       label="字典类别代码">
        <template slot-scope="scope">
          <span>{{scope.row.typeCode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="字典类别名称">
        <template slot-scope="scope">
          <span>{{scope.row.typeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="字典编码">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="字典名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="备注名称">
        <template slot-scope="scope">
          <span>{{scope.row.remarkName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="备注值">
        <template slot-scope="scope">
          <span>{{scope.row.remarkValue}}</span>
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
        <el-form-item label="字典类别代码"
                      prop="typeCode">
          <el-input v-model="temp.typeCode"></el-input>
        </el-form-item>
        <el-form-item label="字典类别名称"
                      prop="typeName">
          <el-input v-model="temp.typeName"></el-input>
        </el-form-item>
        <el-form-item label="字典编码"
                      prop="code">
          <el-input v-model="temp.code"></el-input>
        </el-form-item>
        <el-form-item label="字典名称"
                      prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="备注名称">
          <el-input v-model="temp.remarkName"></el-input>
        </el-form-item>
        <el-form-item label="备注值">
          <el-input v-model="temp.remarkValue"></el-input>
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
  getDictionaries,
  getDictonary,
  createDictonary,
  updateDictonary,
  deleteDictonary
} from '@/api/dictionary'

export default {
  data () {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        typeCode: undefined,
        typeName: undefined,
        page: 1,
        per_Page: 10
      },
      temp: {
        id: undefined,
        typeCode: '',
        typeName: '',
        code: '',
        name: '',
        remarkName: '',
        remarkValue: ''
      },
      rules: {
        typeCode: [
          { required: true, message: '请输入字典类别代码', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请输入字典类别名称', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入字典编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '创建字典',
        edit: '编辑字典'
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true;
      getDictionaries(this.listQuery).then(response => {
        this.list = response.data
        this.total = parseInt(response.headers['x-totalcount'])
        this.listLoading = false
      })
    },
    getTemp (id) {
      getDictonary(id).then(response => {
        this.temp = {
          id: response.data.id,
          typeCode: response.data.typeCode,
          typeName: response.data.typeName,
          code: response.data.code,
          name: response.data.name,
          remarkName: response.data.remarkName,
          remarkValue: response.data.remarkValue
        }
      })
    },
    createTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          createDictonary(this.temp).then(response => {
            if (response.status === 201) {
              this.dialogFormVisible = false;
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
          updateDictonary(this.temp).then(response => {
            if (response.status === 204) {
              this.dialogFormVisible = false;
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
          return false;
        }
      })
    },
    deleteTemp (id) {
      deleteDictonary(id).then(response => {
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
    search () {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp () {
      this.temp = {
        id: undefined,
        typeCode: '',
        typeName: '',
        code: '',
        name: '',
        remarkName: '',
        remarkValue: ''
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
          this.deleteTemp(row.id);
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
