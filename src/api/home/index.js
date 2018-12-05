import axios from '@/libs/api.request'

const BASE_URL = 'sxwUser/'

// 获取分公司首页汇总信息
export const getCollection = (params) => {
  return axios.request({
    url: `${BASE_URL}company/home/collection`,
    params,
    method: 'get'
  })
}

// 获取分公司POS消费实时推送
export const getPos = (params) => {
  return axios.request({
    url: `${BASE_URL}company/home/pos`,
    params,
    method: 'get'
  })
}

// 获取分公司城市合伙人排行榜
export const getCityPartnerRank = (params) => {
  return axios.request({
    url: `${BASE_URL}company/home/cityPartnerRank`,
    params,
    method: 'get'
  })
}

// 获取分公司渠道合伙人排行榜
export const getChannelPartnerRank = (params) => {
  return axios.request({
    url: `${BASE_URL}company/home/channelPartnerRank`,
    params,
    method: 'get'
  })
}

// 获取分公司生态圈商家排行榜
export const getMerchantsRank = (params) => {
  return axios.request({
    url: `${BASE_URL}company/home/merchantsRank`,
    params,
    method: 'get'
  })
}

// 获取分公司折线图月交易金额
export const getMonthTransaction = (params) => {
  return axios.request({
    url: `${BASE_URL}company/home/monthTransaction`,
    params,
    method: 'get'
  })
}

// 获取分公司折线图月营销金额
export const getMonthMarketing = (params) => {
  return axios.request({
    url: `${BASE_URL}company/home/monthMarketing`,
    params,
    method: 'get'
  })
}
