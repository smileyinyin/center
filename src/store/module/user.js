import { login } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    password: '',
    mobile: '',
    userId: '',
    roleId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    accessList: [],
    userInfo: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setRoleId (state, roleId) {
      state.roleId = roleId
    },
    setUserName (state, name) {
      state.userName = name
    },
    setPassword (state, password) {
      state.password = password
    },
    setMobile (state, mobile) {
      state.mobile = mobile
    },
    setAccess (state, access) {
      state.access = access
    },
    setAccessList (state, accessList) {
      state.accessList = accessList
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      let mobile = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          mobile,
          password
        }).then(res => {
          const data = res.data
          commit('setUserInfo', data)
          commit('setToken', data.id)
          commit('setAvator', data.avatar)
          commit('setUserName', data.username)
          commit('setPassword', data.password)
          commit('setMobile', data.mobile)
          commit('setUserId', data.id)
          // commit('setAccess', data.businessRole.map(v => v.code).slice(0, 1))
          // commit('setAccessList', data.businessRole.map(v => ({ name: v.name, code: v.code })))
          // commit('setRoleId', data.businessRole[0].id)

          localStorage.setItem('cp_userInfo', JSON.stringify(data))
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
      commit('setToken', '')
      commit('setAccess', [])
      localStorage.removeItem('cp_userInfo')
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('setToken', '')
      //     commit('setAccess', [])
      //     resolve()
      //   }).catch(err => {
      //     reject(err)
      //   })
      // })
    }
    // 获取用户相关信息
    // getUserInfo ({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(res => {
    //       const data = res.data
    //       resolve(data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
  }
}
