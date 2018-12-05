import axios from '@/libs/api.request'

const BASE = 'loginregister/'

// 业务员列表
export const getSalesManList = (params) => {
  return axios.request({
    url: `${BASE}parent/getSaleList`,
    params,
    method: 'get'
  })
}

// 新增业务员
export const addSalesMan = (params) => {
  return axios.request({
    url: `${BASE}parent/addSale`,
    params,
    method: 'get'
  })
}

// 获取详情
export const getSalesManInfo = (params) => {
  return axios.request({
    url: `${BASE}parent/getDetail`,
    params,
    method: 'get'
  })
}

// 更新业务员
export const updateSalesMan = (params) => {
  return axios.request({
    url: `${BASE}parent/updateSale`,
    params,
    method: 'get'
  })
}

// 激活、禁用业务员
export const activeSalesMan = (params) => {
  return axios.request({
    url: `${BASE}parent/qiyongSale`,
    params,
    method: 'get'
  })
}

// 删除业务员
export const deleteSalesMan = (params) => {
  return axios.request({
    url: 'shop/deleteSalesMan',
    params,
    method: 'delete'
  })
}
