import axios from '@/libs/api.request'

const BASE = 'activity/'
// 交易列表
export const banklist = (params) => {
  return axios.request({
    url: `${BASE}act/list`,
    params,
    method: 'post'
  })
}
