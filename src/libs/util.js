import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, hasOneOf } from '@/libs/tools'

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}

export const removeToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 0 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

// 从路由获取缓存的页面
export const getIncludeListByRouter = (routers) => {
  let res = []
  routers.forEach(route => {
    if (!route.meta) return
    let { name, meta: { cache } = {}, children } = route

    if (cache) {
      res = res.concat(name).concat(flatten(children).map(v => v.name))
    } else if (children) {
      res = res.concat(getIncludeListByRouter(children))
    }
  })
  return res
}

// 从路由获取不许缓存的界面
export const getExcludeListByRouter = (routers) => {
  let res = []
  routers.forEach(route => {
    if (!route.meta) return
    let { name, meta: { notCache } = {}, children } = route

    if (notCache) {
      res = res.concat(name).concat(flatten(children).map(v => v.name))
    } else if (children) {
      res = res.concat(getExcludeListByRouter(children))
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{
    name: 'home',
    to: '/home'
  }, ...res]
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) return res
    } else {
      if (item.name === 'home') homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const getHasAccessRouteNames = (list) => {
    let res = []
    list.forEach(item => {
      if (item.children && item.children.length) {
        res = [].concat(res, getHasAccessRouteNames(item.children))
      } else {
        if (item.meta && item.meta.access) {
          if (hasAccess(access, item)) res.push(item.name)
        } else {
          res.push(item.name)
        }
      }
    })
    return res
  }
  const canTurnToNames = getHasAccessRouteNames(routes)
  return canTurnToNames.indexOf(name) > -1
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextName = (list, name) => {
  let res = ''
  if (list.length === 2) {
    res = 'home'
  } else {
    if (list.findIndex(item => item.name === name) === list.length - 1) res = list[list.length - 2].name
    else res = list[list.findIndex(item => item.name === name) + 1].name
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback()
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

export const formatThousandth = (str) => {
  var arr = String(str).split('.')
  arr[0] = arr[0].replace(/(\B)(?=(\d{3})+$)/g, ',')
  return arr.join('.')
}

export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!date || String(date) === 'Invalid Date') return ''
  if (!(date instanceof Date)) {
    date = new Date(date)
    if (date.toString() === 'Invalid Date') return ''
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).slice(str.length))
    }
  }
  return fmt
}

export function debounce(func, wait, immediate) {
  var timeout, result

  var debounced = function () {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

export function flatten(arr) {
  if (!arr || !arr.length) return []
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}

export function _pickUseful(obj) {
  return Object.keys(obj).reduce((prev, curr) => {
    let value = obj[curr]
    if (value !== null && value !== undefined && value !== '') {
      prev[curr] = value
    }
    return prev
  }, {})
}

export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime())
  temp.setDate(1)
  return temp.getDay()
}

export const getDayCountOfMonth = function(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export const typeOf = function(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

// deepCopy
export const deepCopy = function(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

export const siblingMonth = function(src, diff) {
  const temp = new Date(src) // lets copy it so we don't change the original
  const newMonth = temp.getMonth() + diff
  const newMonthDayCount = getDayCountOfMonth(temp.getFullYear(), newMonth)
  if (newMonthDayCount < temp.getDate()) {
    temp.setDate(newMonthDayCount)
  }
  temp.setMonth(newMonth)

  return temp
}

export const prevMonth = function(src) {
  return siblingMonth(src, -1)
}

export const nextMonth = function(src) {
  return siblingMonth(src, 1)
}

export const initTimeDate = function() {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}

export const createValid = function(...props) {
  return (value, rule, callback) => {
    let valid = props.every((prop) => !!prop.split('.').reduce((prev, next) => prev[next], this))
    if (!valid) {
      callback(new Error())
    } else {
      callback()
    }
  }
}

export const timeAgo = function(time) {
  var between = Date.now() / 1000 - Number(time)
  if (between < 60) {
    return ~~between + ' 秒前'
  } else if (between < 3600) {
    return ~~(between / 60) + ' 分钟前'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' 小时前'
  } else {
    return ~~(between / 86400) + ' 天前'
  }
}
