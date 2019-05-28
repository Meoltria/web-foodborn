import fetch from '@/utils/fetch'

export function getInitialDiagnosis (id) {
  return fetch({
    url: `/InitialDiagnoses/${id}`,
    method: 'get'
  })
}

export function createInitialDiagnosis (data) {
  return fetch({
    url: '/InitialDiagnoses',
    method: 'post',
    data
  })
}

export function updateInitialDiagnosis (data) {
  return fetch({
    url: `/InitialDiagnoses/${data.id}`,
    method: 'put',
    data
  })
}

export function getInitialDiagnosisByPatientId (patientId) {
  return fetch({
    url: `/InitialDiagnoses/PatientId/${patientId}`,
    method: 'get'
  })
}
