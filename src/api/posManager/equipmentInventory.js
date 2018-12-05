/** *********** pos 管理 / 机具库存 api *************/
import axios from '@/libs/api.request'

const BASE_URL = 'sxwPos/'

export const getEquipmentInventoryList = (params) => {
  return axios.request({
    url: `${BASE_URL}parent/getEquipmentInventoryList`,
    params,
    method: 'get'
  })
}
