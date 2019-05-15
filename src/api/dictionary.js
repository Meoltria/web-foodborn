import fetch from '@/utils/fetch'

export function getDictionaries(params) {
  return fetch({
    url: '/Dictionary',
    method: 'get',
    params
  })
}

export function getDictonary(id) {
  return fetch({
    url: `/Dictionary/${id}`,
    method: 'get'
  })
}

export function getDictonaryByTypeAndCode(typeCode, code) {
  return fetch({
    url: `/Dictionary/${typeCode}/${code}/Dictionary`,
    method: 'get'
  })
}

export function getDictonarySelect(typeCode) {
  return fetch({
    url: '/Dictionary/WithSelect',
    method: 'get',
    params: {
      'typeCode': typeCode
    }
  })
}

export function createDictonary(data) {
  return fetch({
    url: '/Dictionary',
    method: 'post',
    data
  })
}

export function updateDictonary(data) {
  return fetch({
    url: `/Dictionary/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteDictonary(id) {
  return fetch({
    url: `/Dictionary/${id}`,
    method: 'delete'
  })
}
