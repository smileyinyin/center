import axios from '@/libs/api.request'

const BASE_URL = 'sxwUser/'
// const BASE_URL = 'http://47.97.175.225:7092/sxwUser/'

// 用户列表
export const findMembers = (params) => {
  return axios.request({
    url: `${BASE_URL}members/findMembers`,
    params,
    method: 'get'
  })
}

// 用户详情
export const findUser = (params) => {
  return axios.request({
    url: `${BASE_URL}find/findUser`,
    params,
    method: 'get'
  })
}

// 冻结恢复操作
export const updataStatus = (params) => {
  return axios.request({
    url: `${BASE_URL}status/updataStatus`,
    params,
    method: 'get'
  })
}

// 积分明细
export const findIntegralSubsidiary = (params) => {
  return axios.request({
    url: `${BASE_URL}find/findIntegralSubidiary`,
    params,
    method: 'get'
  })
}

// 解绑银行卡
export const deteleUntieBankCard = (params) => {
  return axios.request({
    url: `${BASE_URL}detele/deteleUntieBankCard`,
    params,
    method: 'get'
  })
}
