import { getPermissionWithMenu } from '@/api/permission'

const permission = {
  state: {
    permissions: []
  },
  mutations: {
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    GetPermissionWithMenu ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getPermissionWithMenu(params.roleId, params.permId).then(response => {
          const data = response.data
          commit('SET_PERMISSIONS', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
