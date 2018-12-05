/** *********** 分公司api *************/
import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

export const getCompanyList = (params) => {
  return axios.request({
    url: `${BASE_URL}parent/getCompanyList`,
    params,
    method: 'get'
  })
}
