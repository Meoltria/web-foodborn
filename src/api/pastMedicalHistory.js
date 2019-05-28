import fetch from '@/utils/fetch'

export function getPastMedicalHistory (id) {
  return fetch({
    url: `/PastMedicalHistories/${id}`,
    method: 'get'
  })
}

export function createPastMedicalHistory (data) {
  return fetch({
    url: '/PastMedicalHistories',
    method: 'post',
    data
  })
}

export function updatePastMedicalHistory (data) {
  return fetch({
    url: `/PastMedicalHistories/${data.id}`,
    method: 'put',
    data
  })
}

export function getPastMedicalHistoryByPatientId (patientId) {
  return fetch({
    url: `/PastMedicalHistories/PatientId/${patientId}`,
    method: 'get'
  })
}
