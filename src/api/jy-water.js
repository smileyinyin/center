import axios from '@/libs/api.request'

const BASE_URL = 'financial/'

// 分润明细
export const findProfitByRole = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/findProfitByRole`,
    params,
    method: 'get'
  })
}
// pos机分润
export const findPosProfitByRole = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/findPosProfitByRole`,
    params,
    method: 'get'
  })
}
// 提现记录
export const findWithDrawList = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/findWithDrawList`,
    params,
    method: 'get'
  })
}
