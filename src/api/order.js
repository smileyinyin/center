import axios from '@/libs/api.request'

const BASE_URL = 'sxwOrder/'

export const orderList = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/findOrdersnew`,
    params,
    method: 'get'
  })
}

export const findOrderDetailsnew = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/findOrderDetailsnew`,
    params,
    method: 'get'
  })
}

export const orderhexiao = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/orderhexiao`,
    params,
    method: 'get'
  })
}

export const ordersntuikuan = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/ordersntuikuan`,
    params,
    method: 'get'
  })
}

export const insetlogistics = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/insetlogistics`,
    params,
    method: 'get'
  })
}
