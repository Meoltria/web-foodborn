import fetch from '@/utils/fetch'

export function getPermissionWithMenu (roleId, permId) {
  return fetch({
    url: `/Roles/${roleId}/ParentPerm/${permId}/WithMenu/Permissions`,
    method: 'get'
  })
}

export function getPermissionTree (id) {
  return fetch({
    url: `/Permissions/${id}/WithTree/Permissions`,
    method: 'get'
  })
}

export function getPermissions (id, params) {
  return fetch({
    url: `/Permissions/${id}/Permissions`,
    method: 'get',
    params
  })
}

export function getPermission (id) {
  return fetch({
    url: `/Permissions/${id}`,
    method: 'get'
  })
}

export function createPermission (data) {
  return fetch({
    url: '/Permissions',
    method: 'post',
    data
  })
}

export function updatePermission (data) {
  return fetch({
    url: `/Permissions/${data.id}`,
    method: 'put',
    data
  })
}

export function deletePermission (id) {
  return fetch({
    url: `/Permissions/${id}`,
    method: 'delete'
  })
}

export function setRolePermissions (data) {
  return fetch({
    url: `/Roles/${data.roleId}/Permissions`,
    method: 'put',
    data: data.permIds
  })
}

export function getRolePermissions (id) {
  return fetch({
    url: `/Roles/${id}/Permissions`,
    method: 'get'
  })
}
