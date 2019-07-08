import fetch from '@/utils/fetch'

export function getPatients (params) {
  return fetch({
    url: '/Patients',
    method: 'get',
    params
  })
}

export function getUploadPatients (params) {
  return fetch({
    url: '/Patients/PendingUpload',
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

export function getPatientByOutpatientNo (outpatientNo) {
  return fetch({
    url: `/Patients/OutpatientNo/${outpatientNo}`,
    method: 'get'
  })
}

export function uploadMedicalRecord (data) {
  return fetch({
    url: '/Patients/UploadMedicalRecord',
    method: 'post',
    data
  })
}
