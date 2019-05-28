<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 食源监测
        </el-breadcrumb-item>
        <el-breadcrumb-item>患者详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="listQuery.outPatientNo"
                size="medium"
                placeholder="患者门诊号"
                class="handle-input"></el-input>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="search">查询</el-button>
    </div>
    <el-divider content-position="left">病人信息</el-divider>
    <div>
      <el-row gutter="10">
        <el-col :span="6">门诊号：<span v-text="temp.outpatientNo"></span></el-col>
        <el-col :span="6">患者姓名：<span v-text="temp.patientName"></span></el-col>
        <el-col :span="6">发病时间：<span v-text="temp.illnessTime"></span></el-col>
        <el-col :span="6">就诊时间：<span v-text="temp.treatmentTime"></span></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="6">珍前是否使用抗生素：<span v-text="temp.isAntibioticName"></span></el-col>
        <el-col :span="6">抗生素名称：<span v-text="temp.antibioticName"></span></el-col>
        <el-col :span="6">是否住院：<span v-text="temp.isHospitalizationName"></span></el-col>
        <el-col :span="6">住院号：<span v-text="temp.inpatientNo"></span></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="6">是否复诊：<span v-text="temp.isReviewName"></span></el-col>
        <el-col :span="6">患者性别：<span v-text="temp.genderName"></span></el-col>
        <el-col :span="6">患者职业：<span v-text="temp.professionName"></span></el-col>
        <el-col :span="6">出生日期：<span v-text="temp.birthday"></span></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="6">省市区：<span v-text="temp.provinceCityDistrict"></span></el-col>
        <el-col :span="6">详细地址：<span v-text="temp.address"></span></el-col>
        <el-col :span="6">监护人：<span v-text="temp.guardianName"></span></el-col>
        <el-col :span="6">接诊医生：<span v-text="temp.receivingDoctor"></span></el-col>
      </el-row>
    </div>
    <el-divider content-position="left">初步诊断</el-divider>
    <div>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.acuteGastroenteritis">急性胃肠炎</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.infectiousDiarrhea">感染性腹泻</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.poisonousMushroomPoisoning">毒蘑菇中毒</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.beanPoisoning">菜豆中毒</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.pufferfishPoisoning">河豚中毒</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.botulism">肉毒中毒</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.nitritePoisoning">亚硝酸盐中毒</el-checkbox></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.rhabdomyolysisSyndrome">横纹肌溶解综合征</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="initialDiagnosesTemp.shellfishToxinPoisoning">贝类毒素中毒</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="initialDiagnosesTemp.other">其他</el-checkbox>
        <el-input v-model="initialDiagnosesTemp.otherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-row>
      </el-row>
      <el-row align="bottom">
        <el-col :span="24" push="10"><el-button type="primary"  @click="saveInitialDiagnoses">保存</el-button></el-col>
      </el-row>
    </div>
    <el-divider content-position="left">既往病史</el-divider>
    <div>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.no">无</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.generalGastrointestinalInflammation">一般消化道炎症</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.crohnsDisease">克罗恩病</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.gastrointestinalUlcer">消化道溃疡</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.gastrointestinalCancer">消化道肿瘤</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.irritableBowelSyndrome">肠易激综合征</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.meningitis">脑膜炎</el-checkbox></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="pastMedicalHistoryTemp.brainTumor">脑肿瘤</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="pastMedicalHistoryTemp.other">其他</el-checkbox>
        <el-input v-model="pastMedicalHistoryTemp.otherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-row>
      </el-row>
      <el-row align="bottom">
        <el-col :span="24" push="10"><el-button type="primary"  @click="savePastMedicalHistory">保存</el-button></el-col>
      </el-row>
    </div>
    <el-divider content-position="left">症状体征</el-divider>
    <div>
    </div>
    <el-divider content-position="left">暴露信息(若怀疑进食某种食物后出现以上症状，则添加食品信息，可添加多行)</el-divider>
    <div>
    </div>
  </div>
</template>

<script>
import { getPatientByOutpatientNo } from '@/api/patient'
import {
  getInitialDiagnosisByPatientId,
  createInitialDiagnosis,
  updateInitialDiagnosis
} from '@/api/initialDiagnosis'
import {
  getPastMedicalHistoryByPatientId,
  createPastMedicalHistory,
  updatePastMedicalHistory
} from '@/api/pastMedicalHistory'

export default {
  data () {
    return {
      listQuery: {
        outPatientNo: undefined
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
        status: ''
      },
      initialDiagnosesTemp: {
        id: undefined,
        patientId: undefined,
        acuteGastroenteritis: false,
        infectiousDiarrhea: false,
        poisonousMushroomPoisoning: false,
        beanPoisoning: false,
        pufferfishPoisoning: false,
        botulism: false,
        nitritePoisoning: false,
        rhabdomyolysisSyndrome: false,
        shellfishToxinPoisoning: false,
        other: false,
        otherInfo: '',
        status: '正常'
      },
      pastMedicalHistoryTemp: {
        id: undefined,
        patientId: undefined,
        no: false,
        generalGastrointestinalInflammation: false,
        crohnsDisease: false,
        gastrointestinalUlcer: false,
        gastrointestinalCancer: false,
        irritableBowelSyndrome: false,
        meningitis: false,
        brainTumor: false,
        other: false,
        otherInfo: '',
        status: '正常'
      }
    }
  },
  created () {

  },
  methods: {
    getTemp () {
      getPatientByOutpatientNo(this.listQuery.outPatientNo).then(response => {
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
        this.getInitialDiagnosesTemp(response.data.id)
        this.getPastMedicalHistoryTemp(response.data.id)
      })
    },
    getInitialDiagnosesTemp (patientId) {
      getInitialDiagnosisByPatientId(patientId).then(response => {
        this.initialDiagnosesTemp = {
          id: response.data.id,
          patientId: response.data.patientId,
          acuteGastroenteritis: response.data.acuteGastroenteritis,
          infectiousDiarrhea: response.data.infectiousDiarrhea,
          poisonousMushroomPoisoning: response.data.poisonousMushroomPoisoning,
          beanPoisoning: response.data.beanPoisoning,
          pufferfishPoisoning: response.data.pufferfishPoisoning,
          botulism: response.data.botulism,
          nitritePoisoning: response.data.nitritePoisoning,
          rhabdomyolysisSyndrome: response.data.rhabdomyolysisSyndrome,
          shellfishToxinPoisoning: response.data.shellfishToxinPoisoning,
          other: response.data.other,
          otherInfo: response.data.otherInfo,
          status: response.data.status
        }
      })
    },
    getPastMedicalHistoryTemp (patientId) {
      getPastMedicalHistoryByPatientId(patientId).then(response => {
        this.pastMedicalHistoryTemp = {
          id: response.data.id,
          patientId: response.data.patientId,
          no: response.data.no,
          generalGastrointestinalInflammation: response.data.generalGastrointestinalInflammation,
          crohnsDisease: response.data.crohnsDisease,
          gastrointestinalUlcer: response.data.gastrointestinalUlcer,
          gastrointestinalCancer: response.data.gastrointestinalCancer,
          irritableBowelSyndrome: response.data.irritableBowelSyndrome,
          meningitis: response.data.meningitis,
          brainTumor: response.data.brainTumor,
          other: response.data.other,
          otherInfo: response.data.otherInfo,
          status: response.data.status
        }
      })
    },
    createInitialDiagnosesTemp () {
      createInitialDiagnosis(this.initialDiagnosesTemp).then(response => {
        if (response.status === 201) {
          this.$notify({
            title: '成功',
            message: '保存初步诊断成功',
            type: 'success',
            duration: 3000
          })
          this.getInitialDiagnosesTemp(this.temp.id)
        }
      })
    },
    createPastMedicalHistoryTemp () {
      createPastMedicalHistory(this.pastMedicalHistoryTemp).then(response => {
        if (response.status === 201) {
          this.$notify({
            title: '成功',
            message: '保存既往病史成功',
            type: 'success',
            duration: 3000
          })
          this.getPastMedicalHistoryTemp(this.temp.id)
        }
      })
    },
    updateInitialDiagnosesTemp () {
      updateInitialDiagnosis(this.initialDiagnosesTemp).then(response => {
        if (response.status === 204) {
          this.$notify({
            title: '成功',
            message: '保存初步诊断成功',
            type: 'success',
            duration: 3000
          })
          this.getInitialDiagnosesTemp(this.temp.id)
        }
      })
    },
    updatePastMedicalHistoryTemp () {
      updatePastMedicalHistory(this.pastMedicalHistoryTemp).then(response => {
        if (response.status === 204) {
          this.$notify({
            title: '成功',
            message: '保存既往病史成功',
            type: 'success',
            duration: 3000
          })
          this.getPastMedicalHistoryTemp(this.temp.id)
        }
      })
    },
    saveInitialDiagnoses () {
      if (this.temp.id === undefined) {
        this.$message({
          message: '请先查询患者信息',
          type: 'warning'
        })
      } else {
        if (this.initialDiagnosesTemp.id === undefined) {
          this.initialDiagnosesTemp.patientId = this.temp.id
          this.createInitialDiagnosesTemp()
        } else {
          this.updateInitialDiagnosesTemp()
        }
      }
    },
    savePastMedicalHistory () {
      if (this.temp.id === undefined) {
        this.$message({
          message: '请先查询患者信息',
          type: 'warning'
        })
      } else {
        if (this.pastMedicalHistoryTemp.id === undefined) {
          this.pastMedicalHistoryTemp.patientId = this.temp.id
          this.createPastMedicalHistoryTemp()
        } else {
          this.updatePastMedicalHistoryTemp()
        }
      }
    },
    search () {
      this.resetTemp()
      this.resetInitialDiagnosesTemp()
      this.resetPastMedicalHistoryTemp()
      this.getTemp()
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
        provinceCityDistrict: '',
        address: '',
        guardianName: '',
        receivingDoctor: '',
        fillUser: '',
        fillTime: '',
        status: ''
      }
    },
    resetInitialDiagnosesTemp () {
      this.initialDiagnosesTemp = {
        id: undefined,
        patientId: undefined,
        acuteGastroenteritis: false,
        infectiousDiarrhea: false,
        poisonousMushroomPoisoning: false,
        beanPoisoning: false,
        pufferfishPoisoning: false,
        botulism: false,
        nitritePoisoning: false,
        rhabdomyolysisSyndrome: false,
        shellfishToxinPoisoning: false,
        other: false,
        otherInfo: '',
        status: '正常'
      }
    },
    resetPastMedicalHistoryTemp () {
      this.pastMedicalHistoryTemp = {
        id: undefined,
        patientId: undefined,
        no: false,
        generalGastrointestinalInflammation: false,
        crohnsDisease: false,
        gastrointestinalUlcer: false,
        gastrointestinalCancer: false,
        irritableBowelSyndrome: false,
        meningitis: false,
        brainTumor: false,
        other: false,
        otherInfo: '',
        status: '正常'
      }
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

.el-row {
    margin-bottom: 10px;
  }

.content-input {
  width: auto;
  display: inline-block;
}
</style>
