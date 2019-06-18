import fetch from '@/utils/fetch'

export function getOrgUsers (orgId, params) {
  return fetch({
    url: `/Orgs/${orgId}/Users`,
    method: 'get',
    params
  })
}

export function getOrgUsersByType (orgId, userTypeCode) {
  return fetch({
    url: `/Orgs/${orgId}/${userTypeCode}/Users`,
    method: 'get'
  })
}

export function getUser (id) {
  return fetch({
    url: `/Users/${id}`,
    method: 'get'
  })
}

export function createUser (data) {
  return fetch({
    url: '/Users',
    method: 'post',
    data
  })
}

export function updateUser (data) {
  return fetch({
    url: `/Users/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteUser (id) {
  return fetch({
    url: `/Users/${id}`,
    method: 'delete'
  })
}

export function updatePassWord (data) {
  return fetch({
    url: `/Users/PassWord`,
    method: 'put',
    data
  })
}
