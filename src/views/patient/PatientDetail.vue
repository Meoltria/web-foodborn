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
      <el-divider content-position="center">全身症状与体征</el-divider>
      <el-row gutter="10">
        <el-col :span="6"><el-checkbox v-model="symptomTemp.fever">发热</el-checkbox>
        <el-input v-model="symptomTemp.feverDegree" size="mini" placeholder="发热度数(℃)" class="content-input"></el-input></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.facialFlush">面色潮红</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.pale">面色苍白</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.hairpin">发绀</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.dehydration">脱水</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.thirsty">口渴</el-checkbox></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.puffiness">浮肿</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.weightLoss">体重下降</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.chill">寒战</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.weak">乏力</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.anemia">贫血</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.swollen">肿胀</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.insomnia">失眠</el-checkbox></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.photophobia">畏光</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.mouthly">口有糊味</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.metallic">金属味</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.soapSalty">肥皂/咸味</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.excessiveSaliva">唾液过多</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.footWristPendant">足/腕下垂</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.pigmentation">色素沉着</el-checkbox></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.peeling">脱皮</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.nailBand">指甲出现白带</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.signsOther">其他</el-checkbox>
        <el-input v-model="symptomTemp.signsOtherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-divider content-position="center">消化系统</el-divider>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.disgusting">恶心</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.vomiting">呕吐</el-checkbox>
        <el-input v-model="symptomTemp.vomitingCount" size="mini" placeholder="呕吐次数(次/天)" class="content-input"></el-input></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.stomachAche">腹痛</el-checkbox></el-col>
        <el-col :span="9"><el-checkbox v-model="symptomTemp.diarrhea">腹泻</el-checkbox>
        <el-input v-model="symptomTemp.diarrheaCount" size="mini" placeholder="腹泻次数(次/天)" class="content-input"></el-input>
        <el-select v-model="symptomTemp.diarrheaTraits" size="mini" clearable placeholder="请选择大便性状" class="content-input">
          <el-option v-for="item in stoolTraitSelects"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name"></el-option>
        </el-select></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.constipation">便秘</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.heavyAndHeavy">里急后重</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.digestiveOther">其他</el-checkbox>
        <el-input v-model="symptomTemp.digestiveOtherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-divider content-position="center">呼吸系统</el-divider>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.shortnessOfBreath">呼吸短促</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.hemoptysis">咯血</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.difficultyBreathing">呼吸困难</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.respiratoryOther">其他</el-checkbox>
        <el-input v-model="symptomTemp.respiratoryOtherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-divider content-position="center">心脑血管系统</el-divider>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.chestTightness">胸闷</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.chestPain">胸痛</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.palpitations">心悸</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.breathHard">气短</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.cardiovascularOther">其他</el-checkbox>
        <el-input v-model="symptomTemp.cardiovascularOtherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-divider content-position="center">泌尿系统</el-divider>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.reducedUrineOutput">尿量减少</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.backKidneyPain">背部肾区疼痛</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.bloodInTheUrine">尿中带血</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.kidneyStones">肾结石</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.urinaryOther">其他</el-checkbox>
        <el-input v-model="symptomTemp.urinaryOtherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-divider content-position="center">神经系统</el-divider>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.headache">头痛</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.dizziness">眩晕</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.coma">昏迷</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.convulsion">抽搐</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.horror">惊厥</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.delirium">谵妄</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.paralysis">瘫痪</el-checkbox></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.difficultiesInSpeech">言语困难</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.hardToSwallow">吞咽困难</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.feelingAbnormal">感觉异常</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.mentalDisorder">精神失常</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.diplopia">复视</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.blurredVision">视力模糊</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.eyelidDrooping">眼睑下垂</el-checkbox></el-col>
      </el-row>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.limbNumbness">肢体麻木</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.peripheralSensoryDisorder">末梢感觉障碍</el-checkbox></el-col>
        <el-col :span="7"><el-checkbox v-model="symptomTemp.pupilAbnormality">瞳孔异常</el-checkbox>
        <el-select v-model="symptomTemp.pupilStatus" size="mini" clearable placeholder="请选择瞳孔状态" class="content-input">
          <el-option v-for="item in pupilStatusSelects"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name"></el-option>
        </el-select></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.acupuncture">针刺感</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.nerveother">其他</el-checkbox>
        <el-input v-model="symptomTemp.nerveOtherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-divider content-position="center">皮肤和皮下组织</el-divider>
      <el-row gutter="10">
        <el-col :span="3"><el-checkbox v-model="symptomTemp.itching">瘙痒</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.burningSensation">烧灼感</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.rash">皮疹</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.bleedingPoint">出血点</el-checkbox></el-col>
        <el-col :span="3"><el-checkbox v-model="symptomTemp.jaundice">黄疸</el-checkbox></el-col>
        <el-col :span="6"><el-checkbox v-model="symptomTemp.skinOther">其他</el-checkbox>
        <el-input v-model="symptomTemp.skinOtherInfo" size="mini" placeholder="其他信息" class="content-input"></el-input></el-col>
      </el-row>
      <el-row align="bottom">
        <el-col :span="24" push="10"><el-button type="primary"  @click="saveSymptom">保存</el-button></el-col>
      </el-row>
    </div>
    <el-divider content-position="left">暴露信息(若怀疑进食某种食物后出现以上症状，则添加食品信息，可添加多行)</el-divider>
    <div>
      <el-row align="bottom">
        <el-col :span="24" push="2"><el-button type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button></el-col>
      </el-row>
    </div>
    <el-table :data="list"
              v-loading="listLoading"
              element-loading-text="正在加载数据..."
              borde
              fit
              highlight-current-row
              style="width:100%">
      <el-table-column align="center"
                       label="食品名称">
        <template slot-scope="scope">
          <span>{{scope.row.foodName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="食品分类">
        <template slot-scope="scope">
          <span>{{scope.row.foodType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="加工及包装方式">
        <template slot-scope="scope">
          <span>{{scope.row.foodPackaging}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="食品品牌">
        <template slot-scope="scope">
          <span>{{scope.row.foodBrand}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="生产厂家">
        <template slot-scope="scope">
          <span>{{scope.row.manufacturer}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="进食场所">
        <template slot-scope="scope">
          <span>{{scope.row.eatingPlace}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="购买场所">
        <template slot-scope="scope">
          <span>{{scope.row.purchasePlace}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="进食人数">
        <template slot-scope="scope">
          <span>{{scope.row.eatingCounts}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="进食时间">
        <template slot-scope="scope">
          <span>{{scope.row.eatingTime}}</span>
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

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form class="small-space"
               :model="foodInfoTemp"
               :rules="rules"
               ref="temp"
               label-position="left"
               label-width="120px"
               style="width: 450px; margin-left:50px;">
        <el-form-item label="食品名称"
                      prop="foodName">
          <el-input v-model="foodInfoTemp.foodName"></el-input>
        </el-form-item>
        <el-form-item label="食品分类"
                      prop="foodType">
          <el-select v-model="foodInfoTemp.foodType">
            <el-option v-for="item in foodClassificationSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加工及包装"
                      prop="foodPackaging">
          <el-select v-model="foodInfoTemp.foodPackaging">
            <el-option v-for="item in foodPackagingSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品品牌">
          <el-input v-model="foodInfoTemp.foodBrand"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家">
          <el-input v-model="foodInfoTemp.manufacturer"></el-input>
        </el-form-item>
        <el-form-item label="进食场所"
                      prop="eatingPlace">
          <el-select v-model="foodInfoTemp.eatingPlace">
            <el-option v-for="item in foodPurchasePlaceSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买场所"
                      prop="purchasePlace">
          <el-select v-model="foodInfoTemp.purchasePlace">
            <el-option v-for="item in foodPurchasePlaceSelects"
                       :key="item.code"
                       :label="item.name"
                       :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买地点境内/外">
          <el-radio-group v-model="foodInfoTemp.purchaseBorderland">
            <el-radio label="境内">境内</el-radio>
            <el-radio label="境外">境外</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="购买地点省市区">
          <el-input v-model="foodInfoTemp.purchaseProvinceCityDistrict"></el-input>
        </el-form-item>
        <el-form-item label="购买详细地址"
                      prop="purchaseAddress">
          <el-input v-model="foodInfoTemp.purchaseAddress"></el-input>
        </el-form-item>
        <el-form-item label="进食地点境内/外">
          <el-radio-group v-model="foodInfoTemp.eatingBorderland">
            <el-radio label="境内">境内</el-radio>
            <el-radio label="境外">境外</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="进食地点省市区">
          <el-input v-model="foodInfoTemp.eatingProvinceCityDistrict"></el-input>
        </el-form-item>
        <el-form-item label="进食详细地址"
                      prop="eatingAddress">
          <el-input v-model="foodInfoTemp.eatingAddress"></el-input>
        </el-form-item>
        <el-form-item label="进食人数">
          <el-input-number v-model="foodInfoTemp.eatingCounts" @change="handleChange" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="进食时间"
                      prop="eatingTime">
          <el-date-picker
            v-model="foodInfoTemp.eatingTime"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="其他人是否发病">
          <el-radio v-model="foodInfoTemp.isOtherPeople" label="否">否</el-radio>
          <el-radio v-model="foodInfoTemp.isOtherPeople" label="是">是</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="createFoodInfoTemp">确 定</el-button>
        <el-button v-if="dialogStatus=='edit'"
                   type="primary"
                   @click="updateFoodInfoTemp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDictonarySelect } from '@/api/dictionary'
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
import {
  getSymptomByPatientId,
  createSymptom,
  updateSymptom
} from '@/api/symptom'
import {
  getFoodInfos,
  getFoodInfo,
  createFoodInfo,
  updateFoodInfo,
  deleteFoodInfo
} from '@/api/foodInfo'

export default {
  data () {
    return {
      list: null,
      stoolTraitSelects: null,
      pupilStatusSelects: null,
      foodClassificationSelects: null,
      foodPackagingSelects: null,
      foodPurchasePlaceSelects: null,
      listLoading: true,
      listQuery: {
        outPatientNo: undefined
      },
      foodInfosQuery: {
        patientId: undefined
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
      },
      symptomTemp: {
        id: undefined,
        patientId: undefined,
        fever: false,
        feverDegree: '',
        facialFlush: false,
        pale: false,
        hairpin: false,
        dehydration: false,
        thirsty: false,
        puffiness: false,
        weightLoss: false,
        chill: false,
        weak: false,
        anemia: false,
        swollen: false,
        insomnia: false,
        photophobia: false,
        mouthly: false,
        metallic: false,
        soapSalty: false,
        excessiveSaliva: false,
        footWristPendant: false,
        pigmentation: false,
        peeling: false,
        nailBand: false,
        signsOther: false,
        signsOtherInfo: '',
        disgusting: false,
        vomiting: false,
        vomitingCount: '',
        stomachAche: false,
        diarrhea: false,
        diarrheaTraits: '',
        diarrheaCount: '',
        constipation: false,
        heavyAndHeavy: false,
        digestiveOther: false,
        digestiveOtherInfo: '',
        shortnessOfBreath: false,
        hemoptysis: false,
        difficultyBreathing: false,
        respiratoryOther: false,
        respiratoryOtherInfo: '',
        chestTightness: false,
        chestPain: false,
        palpitations: false,
        breathHard: false,
        cardiovascularOther: false,
        cardiovascularOtherInfo: '',
        reducedUrineOutput: false,
        backKidneyPain: false,
        bloodInTheUrine: false,
        kidneyStones: false,
        urinaryOther: false,
        urinaryOtherInfo: '',
        headache: false,
        dizziness: false,
        coma: false,
        convulsion: false,
        horror: false,
        delirium: false,
        paralysis: false,
        difficultiesInSpeech: false,
        hardToSwallow: false,
        feelingAbnormal: false,
        mentalDisorder: false,
        diplopia: false,
        blurredVision: false,
        eyelidDrooping: false,
        limbNumbness: false,
        peripheralSensoryDisorder: false,
        pupilAbnormality: false,
        pupilStatus: '',
        acupuncture: false,
        nerveother: false,
        nerveOtherInfo: '',
        itching: false,
        burningSensation: false,
        rash: false,
        bleedingPoint: false,
        jaundice: false,
        skinOther: false,
        skinOtherInfo: '',
        status: '正常'
      },
      foodInfoTemp: {
        id: undefined,
        patientId: undefined,
        foodName: '',
        foodType: '',
        foodPackaging: '',
        foodBrand: '',
        manufacturer: '',
        eatingPlace: '',
        purchasePlace: '',
        eatingBorderland: '',
        eatingProvinceCityDistrict: '',
        eatingAddress: '',
        purchaseBorderland: '',
        purchaseProvinceCityDistrict: '',
        purchaseAddress: '',
        eatingCounts: '',
        eatingTime: '',
        isOtherPeople: '',
        status: '正常'
      },
      rules: {
        foodName: [
          { required: true, message: '请输入食品名称', trigger: 'blur' }
        ],
        foodType: [
          { required: true, message: '请选择食品分类', trigger: 'select' }
        ],
        foodPackaging: [
          { required: true, message: '请选择加工或包装方式', trigger: 'select' }
        ],
        eatingPlace: [
          { required: true, message: '请选择进食场所', trigger: 'select' }
        ],
        purchasePlace: [
          { required: true, message: '请选择购买场所', trigger: 'select' }
        ],
        eatingTime: [{ required: true, message: '请选择进食时间', trigger: 'change' }],
        eatingAddress: [{ required: true, message: '请输入进食地址', trigger: 'blur' }],
        purchaseAddress: [{ required: true, message: '请输入购买地址', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '添加食品暴露信息',
        edit: '编辑食品暴露信息'
      }
    }
  },
  created () {
    this.getStoolTraitSelects()
    this.getPupilStatusSelects()
    this.getFoodClassificationSelects()
    this.getFoodPackagingSelects()
    this.getFoodPurchasePlaceSelects()
    this.listLoading = false
  },
  methods: {
    getList () {
      this.listLoading = true
      getFoodInfos(this.foodInfosQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
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
        this.getSymptomTemp(response.data.id)
        this.foodInfosQuery.patientId = response.data.id
        this.getList()
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
    getSymptomTemp (patientId) {
      getSymptomByPatientId(patientId).then(response => {
        this.symptomTemp = {
          id: response.data.id,
          patientId: response.data.patientId,
          fever: response.data.fever,
          feverDegree: response.data.feverDegree,
          facialFlush: response.data.facialFlush,
          pale: response.data.pale,
          hairpin: response.data.hairpin,
          dehydration: response.data.dehydration,
          thirsty: response.data.dehydration,
          puffiness: response.data.puffiness,
          weightLoss: response.data.weightLoss,
          chill: response.data.chill,
          weak: response.data.weak,
          anemia: response.data.anemia,
          swollen: response.data.swollen,
          insomnia: response.data.insomnia,
          photophobia: response.data.photophobia,
          mouthly: response.data.mouthly,
          metallic: response.data.metallic,
          soapSalty: response.data.soapSalty,
          excessiveSaliva: response.data.excessiveSaliva,
          footWristPendant: response.data.footWristPendant,
          pigmentation: response.data.pigmentation,
          peeling: response.data.peeling,
          nailBand: response.data.nailBand,
          signsOther: response.data.signsOther,
          signsOtherInfo: response.data.signsOtherInfo,
          disgusting: response.data.disgusting,
          vomiting: response.data.vomiting,
          vomitingCount: response.data.vomitingCount,
          stomachAche: response.data.stomachAche,
          diarrhea: response.data.diarrhea,
          diarrheaTraits: response.data.diarrheaTraits,
          diarrheaCount: response.data.diarrheaCount,
          constipation: response.data.constipation,
          heavyAndHeavy: response.data.heavyAndHeavy,
          digestiveOther: response.data.digestiveOther,
          digestiveOtherInfo: response.data.digestiveOtherInfo,
          shortnessOfBreath: response.data.shortnessOfBreath,
          hemoptysis: response.data.hemoptysis,
          difficultyBreathing: response.data.difficultyBreathing,
          respiratoryOther: response.data.respiratoryOther,
          respiratoryOtherInfo: response.data.respiratoryOtherInfo,
          chestTightness: response.data.chestTightness,
          chestPain: response.data.chestPain,
          palpitations: response.data.palpitations,
          breathHard: response.data.breathHard,
          cardiovascularOther: response.data.cardiovascularOther,
          cardiovascularOtherInfo: response.data.cardiovascularOtherInfo,
          reducedUrineOutput: response.data.reducedUrineOutput,
          backKidneyPain: response.data.backKidneyPain,
          bloodInTheUrine: response.data.bloodInTheUrine,
          kidneyStones: response.data.kidneyStones,
          urinaryOther: response.data.urinaryOther,
          urinaryOtherInfo: response.data.urinaryOtherInfo,
          headache: response.data.headache,
          dizziness: response.data.dizziness,
          coma: response.data.coma,
          convulsion: response.data.convulsion,
          horror: response.data.horror,
          delirium: response.data.delirium,
          paralysis: response.data.paralysis,
          difficultiesInSpeech: response.data.difficultiesInSpeech,
          hardToSwallow: response.data.hardToSwallow,
          feelingAbnormal: response.data.feelingAbnormal,
          mentalDisorder: response.data.mentalDisorder,
          diplopia: response.data.diplopia,
          blurredVision: response.data.blurredVision,
          eyelidDrooping: response.data.eyelidDrooping,
          limbNumbness: response.data.limbNumbness,
          peripheralSensoryDisorder: response.data.peripheralSensoryDisorder,
          pupilAbnormality: response.data.pupilAbnormality,
          pupilStatus: response.data.pupilAbnormality,
          acupuncture: response.data.acupuncture,
          nerveother: response.data.nerveother,
          nerveOtherInfo: response.data.nerveOtherInfo,
          itching: response.data.itching,
          burningSensation: response.data.burningSensation,
          rash: response.data.rash,
          bleedingPoint: response.data.bleedingPoint,
          jaundice: response.data.jaundice,
          skinOther: response.data.skinOther,
          skinOtherInfo: response.data.skinOtherInfo,
          status: response.data.status
        }
      })
    },
    getFoodInfoTemp (id) {
      getFoodInfo(id).then(response => {
        this.foodInfoTemp = {
          id: response.data.id,
          patientId: response.data.patientId,
          foodName: response.data.foodName,
          foodType: response.data.foodType,
          foodPackaging: response.data.foodPackaging,
          foodBrand: response.data.foodBrand,
          manufacturer: response.data.manufacturer,
          eatingPlace: response.data.eatingPlace,
          purchasePlace: response.data.purchasePlace,
          eatingBorderland: response.data.eatingBorderland,
          eatingProvinceCityDistrict: response.data.eatingProvinceCityDistrict,
          eatingAddress: response.data.eatingAddress,
          purchaseBorderland: response.data.purchaseBorderland,
          purchaseProvinceCityDistrict: response.data.purchaseProvinceCityDistrict,
          purchaseAddress: response.data.purchaseAddress,
          eatingCounts: response.data.eatingCounts,
          eatingTime: response.data.eatingTime,
          isOtherPeople: response.data.isOtherPeople,
          status: response.data.status
        }
      })
    },
    getStoolTraitSelects () {
      getDictonarySelect('StoolTrait').then(response => {
        this.stoolTraitSelects = response.data
      })
    },
    getPupilStatusSelects () {
      getDictonarySelect('PupilStatus').then(response => {
        this.pupilStatusSelects = response.data
      })
    },
    getFoodClassificationSelects () {
      getDictonarySelect('FoodClassification').then(response => {
        this.foodClassificationSelects = response.data
      })
    },
    getFoodPackagingSelects () {
      getDictonarySelect('FoodPackaging').then(response => {
        this.foodPackagingSelects = response.data
      })
    },
    getFoodPurchasePlaceSelects () {
      getDictonarySelect('FoodPurchasePlace').then(response => {
        this.foodPurchasePlaceSelects = response.data
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
    createSymptomTemp () {
      createSymptom(this.symptomTemp).then(response => {
        if (response.status === 201) {
          this.$notify({
            title: '成功',
            message: '保存症状体征成功',
            type: 'success',
            duration: 3000
          })
          this.getSymptomTemp(this.temp.id)
        }
      })
    },
    createFoodInfoTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          this.foodInfoTemp.patientId = this.temp.id
          createFoodInfo(this.foodInfoTemp).then(response => {
            if (response.status === 201) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
              this.foodInfosQuery.patientId = this.temp.id
              this.getList()
            }
          })
        } else {
          return false
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
    updateSymptomTemp () {
      updateSymptom(this.symptomTemp).then(response => {
        if (response.status === 204) {
          this.$notify({
            title: '成功',
            message: '保存症状体征成功',
            type: 'success',
            duration: 3000
          })
          this.getSymptomTemp(this.temp.id)
        }
      })
    },
    updateFoodInfoTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          updateFoodInfo(this.foodInfoTemp).then(response => {
            if (response.status === 204) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
              this.foodInfosQuery.patientId = this.temp.id
              this.getList()
            }
          })
        } else {
          return false
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
    saveSymptom () {
      if (this.temp.id === undefined) {
        this.$message({
          message: '请先查询患者信息',
          type: 'warning'
        })
      } else {
        if (this.symptomTemp.id === undefined) {
          this.symptomTemp.patientId = this.temp.id
          this.createSymptomTemp()
        } else {
          this.updateSymptomTemp()
        }
      }
    },
    deleteFoodInfoTemp (id) {
      deleteFoodInfo(id).then(response => {
        if (response.status === 204) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.foodInfosQuery.patientId = this.temp.id
          this.getList()
        }
      })
    },
    search () {
      this.resetTemp()
      this.resetInitialDiagnosesTemp()
      this.resetPastMedicalHistoryTemp()
      this.resetSymptomTemp()
      this.list = null
      this.foodInfosQuery.patientId = undefined
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
    },
    resetSymptomTemp () {
      this.symptomTemp = {
        id: undefined,
        patientId: undefined,
        fever: false,
        feverDegree: '',
        facialFlush: false,
        pale: false,
        hairpin: false,
        dehydration: false,
        thirsty: false,
        puffiness: false,
        weightLoss: false,
        chill: false,
        weak: false,
        anemia: false,
        swollen: false,
        insomnia: false,
        photophobia: false,
        mouthly: false,
        metallic: false,
        soapSalty: false,
        excessiveSaliva: false,
        footWristPendant: false,
        pigmentation: false,
        peeling: false,
        nailBand: false,
        signsOther: false,
        signsOtherInfo: '',
        disgusting: false,
        vomiting: false,
        vomitingCount: '',
        stomachAche: false,
        diarrhea: false,
        diarrheaTraits: '',
        diarrheaCount: '',
        constipation: false,
        heavyAndHeavy: false,
        digestiveOther: false,
        digestiveOtherInfo: '',
        shortnessOfBreath: false,
        hemoptysis: false,
        difficultyBreathing: false,
        respiratoryOther: false,
        respiratoryOtherInfo: '',
        chestTightness: false,
        chestPain: false,
        palpitations: false,
        breathHard: false,
        cardiovascularOther: false,
        cardiovascularOtherInfo: '',
        reducedUrineOutput: false,
        backKidneyPain: false,
        bloodInTheUrine: false,
        kidneyStones: false,
        urinaryOther: false,
        urinaryOtherInfo: '',
        headache: false,
        dizziness: false,
        coma: false,
        convulsion: false,
        horror: false,
        delirium: false,
        paralysis: false,
        difficultiesInSpeech: false,
        hardToSwallow: false,
        feelingAbnormal: false,
        mentalDisorder: false,
        diplopia: false,
        blurredVision: false,
        eyelidDrooping: false,
        limbNumbness: false,
        peripheralSensoryDisorder: false,
        pupilAbnormality: false,
        pupilStatus: '',
        acupuncture: false,
        nerveother: false,
        nerveOtherInfo: '',
        itching: false,
        burningSensation: false,
        rash: false,
        bleedingPoint: false,
        jaundice: false,
        skinOther: false,
        skinOtherInfo: '',
        status: '正常'
      }
    },
    resetFoodInfoTemp () {
      this.foodInfoTemp = {
        id: undefined,
        patientId: undefined,
        foodName: '',
        foodType: '',
        foodPackaging: '',
        foodBrand: '',
        manufacturer: '',
        eatingPlace: '',
        purchasePlace: '',
        eatingBorderland: '境内',
        eatingProvinceCityDistrict: '山东省济宁市鱼台县',
        eatingAddress: '',
        purchaseBorderland: '境内',
        purchaseProvinceCityDistrict: '山东省济宁市鱼台县',
        purchaseAddress: '',
        eatingCounts: '1',
        eatingTime: '',
        isOtherPeople: '否',
        status: '正常'
      }
    },
    handleCreate () {
      if (this.temp.id === undefined) {
        this.$message({
          message: '请先查询患者信息',
          type: 'warning'
        })
      } else {
        this.resetFoodInfoTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      }
    },
    handleEdit (row) {
      this.getFoodInfoTemp(row.id)
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
          this.deleteFoodInfoTemp(row.id)
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

.el-row {
    margin-bottom: 10px;
  }

.content-input {
  width: auto;
  display: inline-block;
}
</style>
