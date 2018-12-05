/** *********** 城市合伙人api *************/
import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

// 获取 城市合伙人/渠道合伙人/业务员 列表
export const getPartnerList = (params) => {
  return axios.request({
    url: `${BASE_URL}partner/findPartnerList`,
    params,
    method: 'get'
  })
}

// 查看 城市合伙人/渠道合伙人/业务员 详情
export const getParterInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}/partner/findPartnerDetails`,
    params,
    method: 'get'
  })
}

// 分公司 下拉Option
// export const getCompanyList = (params) => {
//   return axios.request({
//     url: `${BASE_URL}partner/findControlledCompanyList`,
//     params,
//     method: 'get'
//   })
// }

// 渠道合伙人列表所属城市合伙人下拉查询
export const getCityPartnerList = (params) => {
  return axios.request({
    url: `${BASE_URL}partner/findCityPartnerList`,
    params,
    method: 'get'
  })
}
