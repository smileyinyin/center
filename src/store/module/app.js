import { getMenuByRouter, getExcludeListByRouter, getIncludeListByRouter } from '@/libs/util'
import routers from '@/router/routers'

export default {
  state: {
    collapsed: false
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    includeList: (state) => getIncludeListByRouter(routers),
    excludeList: (state) => getExcludeListByRouter(routers)
  },
  mutations: {
    setCollapsed (state, collapsed) {
      state.collapsed = collapsed
    }
  }
}
