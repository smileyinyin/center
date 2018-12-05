import axios from '@/libs/api.request'

const BASE_URL = 'sxwshop/'

// const TEMP_URL = 'http://localhost:8080/aaaaa/'

// 商户添加、工商、法人、结算信息
export const addMerchantsInfo = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/addMerchantsInfo`,
    data,
    method: 'post'
  })
}
// 查询 商户、工商、法人、结算信息
// export const getMerchants = (id) => {
//   return axios.request({
//     url: `${BASE_URL}shopPD/getMerchants`,
//     params: { id },
//     method: 'get'
//   })
// }

// 商户列表
export const getMerchantsList = (params) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getMerchantsList`,
    params,
    method: 'get'
  })
}

// 经营类型列表
// export const businessTypeList = () => {
//   return axios.request({
//     url: 'data/businessTypeList',
//     method: 'get'
//   })
// }

// 添加商户
export const addMerchants = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/addMerchants`,
    data,
    method: 'post'
  })
}

// 添加账号
export const addAccountInfo = (params) => {
  return axios.request({
    url: '',
    params,
    method: 'post'
  })
}

// 获取门店列表
export const getStoreList = (params) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getStoresList`,
    params,
    method: 'get'
  })
}

// 添加门店
export const addStores = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/addStores`,
    data,
    method: 'post'
  })
}

// 获取商户基本信息
export const getMerchantsInfo = (id) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getMerchantsInfo`,
    params: { id },
    method: 'get'
  })
}

// 获取 工商、法人 信息
export const getIndustryAndLegal = (busId) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getIndustryAndLegal`,
    params: { busId },
    method: 'get'
  })
}

// 提交 工商、法人 信息
export const addIndustryAndLegal = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/addIndustryAndLegal`,
    data,
    method: 'post'
  })
}

// 停用、恢复 商户
export const getMerchantsActive = (params) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getMerchantsActive`,
    params,
    method: 'get'
  })
}

// 审核商户
export const auditMerchants = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/auditMerchants`,
    data,
    method: 'post'
  })
}

// 门店详情
export const getStoresInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getStoresInfo`,
    params,
    method: 'get'
  })
}

// 修改门店
export const updateStore = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/updateStores`,
    data,
    method: 'put'
  })
}

// 修改商户
export const updateMerchants = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/updateMerchantsInfo`,
    data,
    method: 'post'
  })
}

// 修改 工商、法人 信息
export const updateIndustryAndLegal = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/updateIndustryAndLegal`,
    data,
    method: 'put'
  })
}

// 启用、停用 门店
export const getStoresActive = (params) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getStoresActive`,
    params,
    method: 'get'
  })
}

// 会员列表
export const getMemberList = (params) => {
  return axios.request({
    url: `${BASE_URL}shopPD/getMemberList`,
    params,
    method: 'get'
  })
}

// 门店
export const addStoresAndAccount = (data) => {
  return axios.request({
    url: `${BASE_URL}shopPD/addStoresAndAccount`,
    data,
    method: 'post'
  })
}

// 判断是否已有门店进件中
export const jugdeStore = (params) => {
  return axios.request({
    url: `${BASE_URL}shopPD/findMercIdByStoreId`,
    params,
    method: 'get'
  })
}
