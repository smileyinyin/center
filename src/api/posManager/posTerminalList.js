/** *********** pos 管理 / 终端列表 api *************/
import axios from '@/libs/api.request'

const BASE_URL = 'sxwPos/'

export const getPosTerminalList = (params) => {
  return axios.request({
    url: `${BASE_URL}posBindingC/findStorePosList`,
    params,
    method: 'get'
  })
}
