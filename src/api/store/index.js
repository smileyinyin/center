import axios from '@/libs/api.request'

const BASE_URL = 'sxwshop/'

// 商户列表
export const getMerchantsList = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/findMerchantsList`,
    params,
    method: 'get'
  })
}
// 商户详情
export const getMerchantsInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getMerchantsInfo`,
    params,
    method: 'get'
  })
}
// 获取门店列表
export const getStoreList = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getStoresList`,
    params,
    method: 'get'
  })
}
// 门店详情
export const getStoresInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getStoresInfo`,
    params,
    method: 'get'
  })
}
// 绑定信息
export const BsinessFind = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/BsinessFind`,
    params,
    method: 'get'
  })
}
