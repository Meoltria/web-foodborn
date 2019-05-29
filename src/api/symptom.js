import fetch from '@/utils/fetch'

export function getSymptom (id) {
  return fetch({
    url: `/Symptoms/${id}`,
    method: 'get'
  })
}

export function createSymptom (data) {
  return fetch({
    url: '/Symptoms',
    method: 'post',
    data
  })
}

export function updateSymptom (data) {
  return fetch({
    url: `/Symptoms/${data.id}`,
    method: 'put',
    data
  })
}

export function getSymptomByPatientId (patientId) {
  return fetch({
    url: `/Symptoms/PatientId/${patientId}`,
    method: 'get'
  })
}
