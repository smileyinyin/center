import axios from '@/libs/api.request'

const BASE_URL = 'financial/'
// 账单生成
export const monthBillList = (params) => {
  return axios.request({
    url: `${BASE_URL}billPD/monthBillList`,
    params,
    method: 'get'
  })
}
// 可提现信息
export const findWithdraw = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/findWithdraw`,
    params,
    method: 'get'
  })
}

// 交易流水
export const posFlowList = (params) => {
  return axios.request({
    url: `${BASE_URL}Detail/posDetail`,
    params,
    method: 'get'
  })
}
export const detailExport = (params) => {
  return axios.request({
    url: `${BASE_URL}Detail/detailExport`,
    params,
    method: 'get'
  })
}
