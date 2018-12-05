import axios from '@/libs/api.request'

const BASE = 'sxwactivity/'
// 交易列表
export const getTransactionList = (params) => {
  return axios.request({
    url: `${BASE}activity/trans/query`,
    params,
    method: 'post'
  })
}
// 活动对账
export const getTransactionLists = (params) => {
  return axios.request({
    url: `${BASE}activity/trans/check/query`,
    params,
    method: 'post'
  })
}
// 银行管理
export const banklist = (params) => {
  return axios.request({
    url: `${BASE}activity/user/list`,
    params,
    method: 'post'
  })
}
// 新增
export const addbanklist = (data) => {
  return axios.request({
    url: `${BASE}activity/user/add`,
    data,
    method: 'post'
  })
}
// 修改（查找）
export const findbanklist = (params) => {
  return axios.request({
    url: `${BASE}activity/user/query`,
    params,
    method: 'get'
  })
}
// 修改
export const editbanklist = (data) => {
  return axios.request({
    url: `${BASE}activity/user/update`,
    data,
    method: 'put'
  })
}

// 分公司
export const getCompanyList = (params) => {
  return axios.request({
    url: `${BASE}activity/public/list-company`,
    params,
    method: 'get'
  })
}
