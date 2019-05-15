import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/Token',
    method: 'post',
    data: {
      'userCode': username,
      'passWord': password
    }
  })
}

export function getUserInfo() {
  return fetch({
    url: '/Login',
    method: 'get'
  })
}
