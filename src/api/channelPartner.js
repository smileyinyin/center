import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

export const getQuDaoList = (params) => {
  return axios.request({
    url: `${BASE_URL}parent/getQuDaoList`,
    params,
    method: 'get'
  })
}
