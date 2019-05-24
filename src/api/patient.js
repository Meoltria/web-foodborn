import fetch from '@/utils/fetch'

export function getPatients (params) {
  return fetch({
    url: '/Patients',
    method: 'get',
    params
  })
}

export function getPatient (id) {
  return fetch({
    url: `/Patients/${id}`,
    method: 'get'
  })
}

export function createPatient (data) {
  return fetch({
    url: '/Patients',
    method: 'post',
    data
  })
}

export function updatePatient (data) {
  return fetch({
    url: `/Patients/${data.id}`,
    method: 'put',
    data
  })
}

export function deletePatient (id) {
  return fetch({
    url: `/Patients/${id}`,
    method: 'delete'
  })
}