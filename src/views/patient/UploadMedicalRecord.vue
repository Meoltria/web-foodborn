<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 食源监测
        </el-breadcrumb-item>
        <el-breadcrumb-item>病历上报</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="listQuery.outPatientNo"
                size="medium"
                placeholder="患者门诊号"
                class="handle-input"></el-input>
      <el-input v-model="listQuery.patientName"
                size="medium"
                placeholder="患者姓名"
                class="handle-input"></el-input>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="search">查询</el-button>
    </div>
    <el-table :data="list"
              v-loading="listLoading"
              element-loading-text="正在加载数据..."
              borde
              fit
              highlight-current-row
              style="width:100%">
      <el-table-column align="center"
                       label="患者门诊号">
        <template slot-scope="scope">
          <span>{{scope.row.outpatientNo}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="患者姓名">
        <template slot-scope="scope">
          <span>{{scope.row.patientName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.genderName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="就诊时间">
        <template slot-scope="scope">
          <span>{{scope.row.treatmentTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="患者职业">
        <template slot-scope="scope">
          <span>{{scope.row.professionName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="接诊医生">
        <template slot-scope="scope">
          <span>{{scope.row.receivingDoctor}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       width="180px">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-upload"
                     size="small"
                     @click="handleUpload(scope.row)">上报</el-button>
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
  </div>
</template>

<script>
import {
  getPatients,
  uploadMedicalRecord
} from '@/api/patient'

export default {
  data () {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        outPatientNo: undefined,
        patientName: undefined,
        page: 1,
        per_Page: 10
      },
      temp: {
        patientId: undefined,
        operationType: undefined
      }
    }
  },
  created () {
    this.listLoading = false
  },
  methods: {
    getList () {
      this.listLoading = true
      getPatients(this.listQuery).then(response => {
        this.list = response.data
        this.total = parseInt(response.headers['x-totalcount'])
        this.listLoading = false
      })
    },
    uploadTemp (id, operationType) {
      this.temp.patientId = id
      this.temp.operationType = operationType
      uploadMedicalRecord(this.temp).then(response => {
        if (response.status === 200) {
          this.$notify({
            title: '提示信息',
            message: response.data['msg'],
            type: 'info',
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
        patientId: undefined,
        operationType: undefined
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
    handleUpload (row) {
      this.resetTemp()
      if (row.status === '正常') {
        this.uploadTemp(row.id, 1)
      } else {
        this.uploadTemp(row.id, 2)
      }
    },
    handleDelete (row) {
      this.$confirm('确定要删除当前上报？该操作会在上级系统中删除本条上报信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.resetTemp()
          this.uploadTemp(row.id, 3)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除上报!'
          })
        })
    }
  }
}
</Script>

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
