// http://formal.zuul.sxwhome.com/ 正式服务地址!!
// http://dev.zuul.sxwhome.com/ 测试服务地址

const DEV_URL = 'http://dev.zuul.sxwhome.com/'

// 正式！！
const PRO_URL = 'http://formal.zuul.sxwhome.com/'

// 测试
const TEST_URL = 'http://dev.zuul.sxwhome.com/'

const BASE_URL = process.env.NODE_ENV === 'development'
  ? DEV_URL
  : process.env.VUE_APP_MODE === 'test'
    ? TEST_URL
    : PRO_URL

export default BASE_URL
