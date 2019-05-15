import fetch from '@/utils/fetch'

export function getOrgTree(id) {
  return fetch({
    url: `/Orgs/${id}/WithTree/Orgs`,
    method: 'get'
  })
}

export function getOrgTreeByType(parentId, orgTypeCode) {
  return fetch({
    url: `/Orgs/${parentId}/${orgTypeCode}/WithTree/Orgs`,
    method: 'get'
  })
}

export function getOrgs(id, params) {
  return fetch({
    url: `/Orgs/${id}/Orgs`,
    method: 'get',
    params
  })
}

export function getOrg(id) {
  return fetch({
    url: `/Orgs/${id}`,
    method: 'get'
  })
}

export function createOrg(data) {
  return fetch({
    url: '/Orgs',
    method: 'post',
    data
  })
}

export function updateOrg(data) {
  return fetch({
    url: `/Orgs/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteOrg(id) {
  return fetch({
    url: `/Orgs/${id}`,
    method: 'delete'
  })
}
