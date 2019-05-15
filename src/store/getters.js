const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  org: state => state.user.organazitionCode,
  roleId: state => state.user.roleId,
  role: state => state.user.roleCode,
  permissions: state => state.permission.permissions
}

export default getters
