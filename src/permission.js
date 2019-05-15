import router from './router'
import store from './store'
import {
  getToken
} from '@/utils/auth'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next('/home')
    } else {
      if (store.getters.name.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const params = {
            roleId: store.getters.roleId,
            permId: 1
          }
          store.dispatch('GetPermissionWithMenu', params).then(() => {
            next()
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
