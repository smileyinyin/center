import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

// 获取验证码
export const validateCode = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/validateCode`,
    params,
    method: 'get'
  })
}

// 修改密码
export const updatePassword = (params) => {
  return axios.request({
    url: `${BASE_URL}login/updatePassword`,
    params,
    method: 'get'
  })
}

// 修改手机号
export const updateMobile = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/updateMobile`,
    params,
    method: 'get'
  })
}
