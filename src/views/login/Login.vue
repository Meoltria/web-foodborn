<template>
  <div class="login-wrap">
    <div class="ms-title">益康食源性疾病监测平台</div>
    <div class="ms-login">
      <el-form :model="loginForm"
               :rules="rules"
               ref="loginForm"
               label-position="left"
               label-width="0px">
        <el-form-item prop="userName">
          <el-input name="userName"
                    v-model="loginForm.userName"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input name="passWord"
                    type="password"
                    v-model="loginForm.passWord"
                    placeholder="密码"></el-input>
          <div class="login-btn">
            <el-button type="primary"
                       @click="submitForm()">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push('/home')
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #204d74;
}

.ms-title {
  position: absolute;
  top: 20%;
  width: 100%;
  font-size: 30px;
  color: #fff;
  text-align: center;
}

.ms-login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
  margin-top: 20px;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
