import axios from '@/libs/api.request'

const BASE_URL = 'sxwPos/'
// const BASE_URL = 'http://47.97.175.225:9008/'

export const addPosApply = (data) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/addPosApply`,
    data,
    method: 'post'
  })
}

export const aduitPosApply = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingp/aduitPosApply`,
    params,
    method: 'get'
  })
}
