<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 食源监测
        </el-breadcrumb-item>
        <el-breadcrumb-item>患者管理</el-breadcrumb-item>
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
        <el-form-item label="患者门诊号"
                      prop="outpatientNo">
          <el-input v-model="temp.outpatientNo"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名"
                      prop="patientName">
          <el-input v-model="temp.patientName"></el-input>
        </el-form-item>
        <el-form-item label="发病时间"
                      prop="illnessTime">
          <el-date-picker
            v-model="temp.illnessTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="就诊时间"
                      prop="treatmentTime">
          <el-date-picker
            v-model="temp.treatmentTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="珍前使用抗生素"
                      prop="isAntibioticCode">
          <el-select v-model="temp.isAntibioticCode">
            <el-option v-for="item in isAntibioticSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抗生素名称"
                      prop="antibioticName">
          <el-input v-model="temp.antibioticName"></el-input>
        </el-form-item>
        <el-form-item label="是否复诊"
                      prop="isReviewCode">
          <el-select v-model="temp.isReviewCode">
            <el-option v-for="item in isReviewSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否住院"
                      prop="isHospitalizationCode">
          <el-select v-model="temp.isHospitalizationCode">
            <el-option v-for="item in isHospitalizationSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住院号"
                      prop="inpatientNo">
          <el-input v-model="temp.inpatientNo"></el-input>
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
        <el-form-item label="患者职业"
                      prop="professionCode">
          <el-select v-model="temp.professionCode">
            <el-option v-for="item in professionSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="temp.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="temp.idCard"></el-input>
        </el-form-item>
        <el-form-item label="省市区"
                      prop="provinceCityDistrict">
          <el-input v-model="temp.provinceCityDistrict"></el-input>
        </el-form-item>
        <el-form-item label="详细地址"
                      prop="address">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>
        <el-form-item label="监护人姓名">
          <el-input v-model="temp.guardianName"></el-input>
        </el-form-item>
        <el-form-item label="接诊医生"
                      prop="receivingDoctor">
          <el-input v-model="temp.receivingDoctor"></el-input>
        </el-form-item>
          <el-form-item label="填表人"
                      prop="fillUser">
          <el-input v-model="temp.fillUser"></el-input>
        </el-form-item>
        <el-form-item label="填表时间"
                      prop="fillTime">
          <el-date-picker
            v-model="temp.fillTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
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
import { getDictonarySelect } from '@/api/dictionary'
import {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} from '@/api/patient'

export default {
  data () {
    return {
      list: null,
      total: null,
      isAntibioticSelects: null,
      isReviewSelects: null,
      isHospitalizationSelects: null,
      genderSelects: null,
      professionSelects: null,
      listLoading: true,
      listQuery: {
        outPatientNo: undefined,
        patientName: undefined,
        page: 1,
        per_Page: 10
      },
      temp: {
        id: undefined,
        guid: '',
        outpatientNo: '',
        patientName: '',
        illnessTime: '',
        treatmentTime: '',
        isAntibioticCode: '',
        isAntibioticName: '',
        antibioticName: '',
        isReviewCode: '',
        isReviewName: '',
        isHospitalizationCode: '',
        isHospitalizationName: '',
        inpatientNo: '',
        genderCode: '',
        genderName: '',
        professionCode: '',
        professionName: '',
        birthday: '',
        idCard: '',
        provinceCityDistrict: '',
        address: '',
        guardianName: '',
        receivingDoctor: '',
        fillUser: '',
        fillTime: '',
        status: '正常'
      },
      rules: {
        outpatientNo: [
          { required: true, message: '请输入患者门诊号', trigger: 'blur' }
        ],
        patientName: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' }
        ],
        illnessTime: [{ required: true, message: '请选择发病时间', trigger: 'change' }],
        treatmentTime: [{ required: true, message: '请选择就诊时间', trigger: 'change' }],
        isAntibioticCode: [
          { required: true, message: '请选择珍前是否使用抗生素', trigger: 'select' }
        ],
        isReviewCode: [
          { required: true, message: '请选是否复诊', trigger: 'select' }
        ],
        isHospitalizationCode: [
          { required: true, message: '请选是否住院', trigger: 'select' }
        ],
        genderCode: [
          { required: true, message: '请选择性别', trigger: 'select' }
        ],
        professionCode: [
          { required: true, message: '请选择患者职业', trigger: 'select' }
        ],
        provinceCityDistrict: [{ required: true, message: '请输入省市区', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        receivingDoctor: [{ required: true, message: '请输入接诊医生', trigger: 'blur' }],
        fillUser: [{ required: true, message: '请输入填表人', trigger: 'blur' }],
        fillTime: [{ required: true, message: '请选择填表时间', trigger: 'change' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '患者登记',
        edit: '编辑患者'
      }
    }
  },
  created () {
    this.getIsAntibioticSelects()
    this.getIsReviewSelectsSelects()
    this.getIsHospitalizationSelects()
    this.getGenderSelects()
    this.getProfessionSelects()
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
    getTemp (id) {
      getPatient(id).then(response => {
        this.temp = {
          id: response.data.id,
          guid: response.data.guid,
          outpatientNo: response.data.outpatientNo,
          patientName: response.data.patientName,
          illnessTime: response.data.illnessTime,
          treatmentTime: response.data.treatmentTime,
          isAntibioticCode: response.data.isAntibioticCode,
          isAntibioticName: response.data.isAntibioticName,
          antibioticName: response.data.antibioticName,
          isReviewCode: response.data.isReviewCode,
          isReviewName: response.data.isReviewName,
          isHospitalizationCode: response.data.isHospitalizationCode,
          isHospitalizationName: response.data.isHospitalizationName,
          inpatientNo: response.data.inpatientNo,
          genderCode: response.data.genderCode,
          genderName: response.data.genderName,
          professionCode: response.data.professionCode,
          professionName: response.data.professionName,
          birthday: response.data.birthday,
          idCard: response.data.idCard,
          provinceCityDistrict: response.data.provinceCityDistrict,
          address: response.data.address,
          guardianName: response.data.guardianName,
          receivingDoctor: response.data.receivingDoctor,
          fillUser: response.data.fillUser,
          fillTime: response.data.fillTime,
          status: response.data.status
        }
      })
    },
    getIsAntibioticSelects () {
      getDictonarySelect('IsAntibiotic').then(response => {
        this.isAntibioticSelects = response.data
      })
    },
    getIsReviewSelectsSelects () {
      getDictonarySelect('IsReview').then(response => {
        this.isReviewSelects = response.data
      })
    },
    getIsHospitalizationSelects () {
      getDictonarySelect('IsHospitalization').then(response => {
        this.isHospitalizationSelects = response.data
      })
    },
    getGenderSelects () {
      getDictonarySelect('Gender').then(response => {
        this.genderSelects = response.data
      })
    },
    getProfessionSelects () {
      getDictonarySelect('Profession').then(response => {
        this.professionSelects = response.data
      })
    },
    createTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          this.temp.isAntibioticName = this.isAntibioticSelects.find(item => item.code === this.temp.isAntibioticCode).name
          this.temp.isReviewName = this.isReviewSelects.find(item => item.code === this.temp.isReviewCode).name
          this.temp.isHospitalizationName = this.isHospitalizationSelects.find(item => item.code === this.temp.isHospitalizationCode).name
          this.temp.genderName = this.genderSelects.find(item => item.code === this.temp.genderCode).name
          this.temp.professionName = this.professionSelects.find(item => item.code === this.temp.professionCode).name
          createPatient(this.temp).then(response => {
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
          this.temp.isAntibioticName = this.isAntibioticSelects.find(item => item.code === this.temp.isAntibioticCode).name
          this.temp.isReviewName = this.isReviewSelects.find(item => item.code === this.temp.isReviewCode).name
          this.temp.isHospitalizationName = this.isHospitalizationSelects.find(item => item.code === this.temp.isHospitalizationCode).name
          this.temp.genderName = this.genderSelects.find(item => item.code === this.temp.genderCode).name
          this.temp.professionName = this.professionSelects.find(item => item.code === this.temp.professionCode).name
          updatePatient(this.temp).then(response => {
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
      deletePatient(id).then(response => {
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
        guid: '',
        outpatientNo: '',
        patientName: '',
        illnessTime: '',
        treatmentTime: '',
        isAntibioticCode: '',
        isAntibioticName: '',
        antibioticName: '',
        isReviewCode: '',
        isReviewName: '',
        isHospitalizationCode: '',
        isHospitalizationName: '',
        inpatientNo: '',
        genderCode: '',
        genderName: '',
        professionCode: '',
        professionName: '',
        birthday: '',
        idCard: '',
        provinceCityDistrict: '山东省济宁市鱼台县',
        address: '',
        guardianName: '',
        receivingDoctor: this.$store.getters.name,
        fillUser: this.$store.getters.name,
        fillTime: '',
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
