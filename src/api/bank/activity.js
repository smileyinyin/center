import axios from '@/libs/api.request'

const BASE = 'sxwactivity/'

// 活動管理 列表
export const banklist = (params) => {
  return axios.request({
    url: `${BASE}activity/act/query`,
    params,
    method: 'get'
  })
}

// export const getCardBinListOnActivitySelectedBank = (activityId) => {
//   return axios.request({
//     url: `${BASE}activity/v1/public/list-card`,
//     params: { id: activityId },
//     method: 'get'
//   })
// }

// 获取活动 基本信息
export const getActivityBaseInformation = activityId => {
  return axios.request({
    url: `${BASE}activity/act/select-act`,
    params: { id: activityId },
    method: 'get'
  })
}

export const getActivityLimitRule = (activityId) => {
  return axios.request({
    url: `${BASE}activity/act/list-rule-limit`,
    params: { id: activityId },
    method: 'get'
  })
}

// 获取门店设置的列表
export const getListActStore = (activityId, storeId, storeName, page, size) => {
  return axios.request({
    url: `${BASE}activity/act/list-act-store`,
    params: { activityId, storeId, storeName, page, size },
    method: 'get'
  })
}

// 获取门店佣金列表
export const getCmsn = (id, page, size) => {
  return axios.request({
    url: `${BASE}activity/act/set-cmsn`,
    params: { id, page, size },
    method: 'get'
  })
}

// 获取门店佣金列表
export const setCmsn = (data) => {
  return axios.request({
    url: `${BASE}activity/act/save-cmsn`,
    data,
    method: 'post'
  })
}

// 获取门店/商户/银行关系列表
export const getBankStoreList = (params) => {
  return axios.request({
    url: `${BASE}bankStore/findBankStore`,
    params,
    method: 'get'
  })
}

// 新增门店/商户/银行关系列表
export const addBankStore = (data) => {
  return axios.request({
    url: `${BASE}bankStore/insert`,
    data,
    method: 'post'
  })
}

// 删除门店/商户/银行关系列表
export const deleteStore = (id) => {
  return axios.request({
    url: `${BASE}bankStore/deleteStore`,
    params: { id },
    method: 'put'
  })
}
