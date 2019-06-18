<template>
  <div class="header">
    <div class="logo">食源性疾病监测</div>
    <div class="user-info">
      <el-dropdown trigger="click"
                   @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo"
               src="../../assets/RedCross.png">
          {{userName}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="updatepassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
        <el-form-item label="原密码"
                      prop="oldPassWord">
          <el-input v-model="temp.oldPassWord"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="newPassWord">
          <el-input v-model="temp.newPassWord"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateTemp">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import { updatePassWord } from '@/api/user'

export default {
  data () {
    return {
      name: 'admin',
      temp: {
        oldPassWord: '',
        newPassWord: ''
      },
      rules: {
        oldPassWord: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassWord: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        create: '修改密码'
      }
    }
  },
  computed: {
    userName () {
      let userName = this.$store.getters.name
      if (userName.lenth === null) {
        userName = this.name
      }
      return userName
    }
  },
  methods: {
    resetTemp () {
      this.temp = {
        oldPassWord: '',
        newPassWord: ''
      }
    },
    updateTemp () {
      this.$refs.temp.validate(valid => {
        if (valid) {
          updatePassWord(this.temp).then(response => {
            if (response.status === 204) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
            }
          })
        } else {
          return false
        }
      })
    },
    handleCommand (command) {
      if (command === 'loginout') {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
      if (command === 'updatepassword') {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      }
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 24px;
  line-height: 70px;
  background: #20a0ff;
  color: #fff;
}

.header .logo {
  float: left;
  width: 240px;
  text-align: center;
}

.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}

.user-info .user-logo {
  position: absolute;
  left: -40px;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
