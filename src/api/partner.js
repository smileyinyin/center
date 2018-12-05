import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

// 合伙人列表
export const getPartnerList = (params) => {
  return axios.request({
    url: `${BASE_URL}PartnerDetails/findPartnerList`,
    params,
    method: 'get'
  })
}

// 启用、禁用合伙人状态
export const activePartner = (params) => {
  return axios.request({
    url: `${BASE_URL}PartnerDetails/updatePartnerStatus`,
    params,
    method: 'get'
  })
}

// 新增合伙人
export const addPartner = (data) => {
  return axios.request({
    url: `${BASE_URL}PartnerDetails/savePartner`,
    data,
    method: 'post'
  })
}

// 更新合伙人
export const updatePartner = (data) => {
  return axios.request({
    url: `${BASE_URL}PartnerDetails/updatePartnerInfo`,
    data,
    method: 'put'
  })
}

// 获取合伙人详情
export const getPartnerInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}PartnerDetails/findPartnerDetails`,
    params,
    method: 'get'
  })
}

// 获取所属合伙人列表
export const getParentPartnerList = (params) => {
  return axios.request({
    url: `${BASE_URL}PartnerDetails/findUserIdAndPartnerName`,
    params,
    method: 'get'
  })
}
