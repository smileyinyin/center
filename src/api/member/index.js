import axios from '@/libs/api.request'

const BASE_URL = 'sxwUser/'
// 会员列表
export const getMemberList = (params) => {
  return axios.request({
    url: `${BASE_URL}user/list`,
    params,
    method: 'get'
  })
}
export const findUser = (params) => {
  return axios.request({
    url: `${BASE_URL}user/query`,
    params,
    method: 'get'
  })
}
