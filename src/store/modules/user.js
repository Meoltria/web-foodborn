import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/login'

const user = {
  state: {
    token: getToken(),
    id: '',
    name: '',
    organazitionId: '',
    organazitionCode: '',
    roleId: '',
    roleCode: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ORGANAZITIONID: (state, organazitionId) => {
      state.organazitionId = organazitionId
    },
    SET_ORGANAZITIONCODE: (state, organazitionCode) => {
      state.id = organazitionCode
    },
    SET_ROLEID: (state, roleId) => {
      state.roleId = roleId
    },
    SET_ROLECODE: (state, roleCode) => {
      state.roleCode = roleCode
    }
  },
  actions: {
    // 登录，获取token
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.userName, userInfo.passWord).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获得用户信息
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          commit('SET_ID', data.id)
          commit('SET_NAME', data.name)
          commit('SET_ORGANAZITIONID', data.organazitionId)
          commit('SET_ORGANAZITIONCODE', data.organazitionCode)
          commit('SET_ROLEID', data.roleId)
          commit('SET_ROLECODE', data.roleCode)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出
    LogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
