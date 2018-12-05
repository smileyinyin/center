import axios from '@/libs/api.request'

const BASE_URL = 'sxwPos/'

// const BASE_URL = 'http://47.97.175.225:7092/sxwPos/'

// 获取商户进件列表
export const findPosApplyList = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/findPosApplyList`,
    params,
    method: 'get'
  })
}

// 获取商户加机
export const addPosApplyNum = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/addPosApplyNum`,
    params,
    method: 'post'
  })
}

// 删除商户进件的一条信息
export const delPosApply = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/delPosApply`,
    params,
    method: 'delete'
  })
}

// 查看一条商户进件信息
export const findPosApplyDetail = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/findPosApplyDetail`,
    params,
    method: 'get'
  })
}

// 修改pos进件信息
export const updatePosApply = (data) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/updatePosApply`,
    data,
    method: 'put'
  })
}

// pos机审核
export const aduitPosApply = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/aduitPosApply`,
    params,
    method: 'get'
  })
}

// pos机审核详情列表
export const getAuditInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/getAuditInfo`,
    params,
    method: 'get'
  })
}

// pos换机
export const changeStoresPos = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/changeStoresPos`,
    params,
    method: 'get'
  })
}

// 机具库存列表
export const findPosInputInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}posInputp/findPosInputInfo`,
    params,
    method: 'get'
  })
}

// 回拨记录列表
export const findPosBackList = (params) => {
  return axios.request({
    url: `${BASE_URL}posInputp/findPosBackList`,
    params,
    method: 'get'
  })
}

// 进件记录列表
export const findStorePosRecordList = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/findStorePosRecordList`,
    params,
    method: 'get'
  })
}

// pos机终端列表
export const findStorePosList = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/findStorePosList`,
    params,
    method: 'get'
  })
}
// 解绑
export const removeStoresPos = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/removeStoresPos`,
    params,
    method: 'get'
  })
}
