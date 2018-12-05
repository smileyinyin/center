import Main from '@/view/main/index'
import parentView from '@/components/parent-view'

import bank from './modules/bank'
import member from './modules/member'
import merchant from './modules/merchant'
import user from './modules/user'
import posManager from './modules/posManager'
// import pos from './modules/pos'
import financial from './modules/financial'
import personalCenter from './modules/personalCenter'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *        若使用 svg icon 需要在 icon 名前加 'svg_' 前缀
 *  hide: 设为 true 则不会在 面包屑导航中 出现路径
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // {
  //   path: '/',
  //   redirect: { name: 'home' },
  //   component: Main,
  //   meta: {
  //     notCache: true,
  //   },
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       meta: {
  //         icon: 'ios-home',
  //         title: '首页'
  //       },
  //       component: () => import('@/view/home/home')
  //     }
  //   ]
  // },
  /************* ↑ 上面显示 home ↑ **************/
  // TODO 隐藏/显示home
  /************* ↓ 下面隐藏 home ↓ **************/
  {
    path: '/',
    redirect: { name: 'userManger' },
    component: Main,
    meta: {
      notCache: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/home',
        redirect: { name: 'userManger' },
        name: 'home',
        meta: {
          icon: 'ios-home',
          title: '首页'
        },
        component: () => import('@/view/home/home')
      }
    ]
  },

  ...member,              // 会员管理
  ...merchant,            // 商户管理
  ...user,                // 用户管理
  ...posManager,          // 机具管理
  ...financial,           // 财务管理
  ...bank,                // 银行基础数据
  ...personalCenter,      // 个人中心

  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }


]
