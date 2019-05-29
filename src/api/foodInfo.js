import fetch from '@/utils/fetch'

export function getFoodInfos (params) {
  return fetch({
    url: '/FoodInfos',
    method: 'get',
    params
  })
}

export function getFoodInfo (id) {
  return fetch({
    url: `/FoodInfos/${id}`,
    method: 'get'
  })
}

export function createFoodInfo (data) {
  return fetch({
    url: '/FoodInfos',
    method: 'post',
    data
  })
}

export function updateFoodInfo (data) {
  return fetch({
    url: `/FoodInfos/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteFoodInfo (id) {
  return fetch({
    url: `/FoodInfos/${id}`,
    method: 'delete'
  })
}
