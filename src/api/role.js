import fetch from '@/utils/fetch'

export function getRoles (params) {
  return fetch({
    url: '/Roles',
    method: 'get',
    params
  })
}

export function getRole (id) {
  return fetch({
    url: `/Roles/${id}`,
    method: 'get'
  })
}

export function createRole (data) {
  return fetch({
    url: '/Roles',
    method: 'post',
    data
  })
}

export function updateRole (data) {
  return fetch({
    url: `/Roles/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteRole (id) {
  return fetch({
    url: `/Roles/${id}`,
    method: 'delete'
  })
}
