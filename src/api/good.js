import axios from '@/libs/api.request'

const BASE_URL = 'sxwGoods/'
// const BASE_URL = 'http://192.168.9.49:7097/'
export const findGoodsList = (params) => {
  return axios.request({
    url: `${BASE_URL}goodsPD/findGoodsList`,
    params,
    method: 'get'
  })
}

// 点击添加库存 获取内部数据
export const kcList = (params) => {
  return axios.request({
    url: `${BASE_URL}updateGoodsPD/findInventory`,
    params,
    method: 'get'
  })
}
// 添加库存
export const addkcList = (params) => {
  return axios.request({
    url: `${BASE_URL}updateGoodsPD/updateInventory`,
    params,
    method: 'get'
  })
}
// 添加 商品
export const addGoods = (data) => {
  return axios.request({
    url: `${BASE_URL}goodsPD/addGoods`,
    data,
    method: 'post'
  })
}

// /submit/findAudit
// 查看
export const findGoods = (params) => {
  return axios.request({
    url: `${BASE_URL}goodsPD/findGoods`,
    params,
    method: 'get'
  })
}
// 修改
export const updateGoods = (data) => {
  return axios.request({
    url: `${BASE_URL}goodsPD/updateGoods`,
    data,
    method: 'post'
  })
}
// 审核
export const auditGoods = (params) => {
  return axios.request({
    url: `${BASE_URL}goodsPD/auditGoods`,
    params,
    method: 'get'
  })
}
// 商户列表
export const merchants = (params) => {
  return axios.request({
    url: `${BASE_URL}find/merchants`,
    params,
    method: 'get'
  })
}
// 门店列表
export const merchantsStore = (params) => {
  return axios.request({
    url: `${BASE_URL}find/merchantsStore`,
    params,
    method: 'get'
  })
}
// 删除商品
export const deteleGoods = (params) => {
  return axios.request({
    url: `${BASE_URL}goodsPD/deteleGoods`,
    params,
    method: 'get'
  })
}
// 上下架
export const isShelves = (params) => {
  return axios.request({
    url: `${BASE_URL}goodsPD/isShelves`,
    params,
    method: 'get'
  })
}
// 账单
