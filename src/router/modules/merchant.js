import Main from '@/view/main/index'

// 商户管理
export default [
  {
    path: '/merchantManagement',
    name: 'merchantManagement',
    component: Main,
    children: [
      {
        path: '/merchantList',
        name: 'merchantList',
        meta: {
          title: '商户管理',
          icon: '_gongwenbao'
        },
        component: () => import('@/view/merchant/index')
      },
      {
        path: '/checkMerchant',
        name: 'checkMerchant',
        meta: {
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/merchant/checkMerchant')
      },
      {
        path: '/merchantAdd',
        name: 'merchantAdd',
        meta: {
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/merchant/merchantAdd')
      },
      {
        path: '/legalInfo',
        name: 'legalInfo',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/legalInfo')
      },
      {
        path: '/accountInfo',
        name: 'accountInfo',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/accountInfo')
      },
      {
        path: '/storeList',
        name: 'storeList',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/storeList')
      },
      {
        path: '/storeAdd',
        name: 'storeAdd',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/storeAdd')
      },
      {
        path: '/checkInfo',
        name: 'checkInfo',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/merchant/components/checkInfo')
      },
      {
        path: '/memberList',
        name: 'memberList',
        meta: { hideInMenu: true },
        component: () => import('@/view/merchant/memberList')
      },
      {
        path: '/storeInfo',
        name: 'storeInfo',
        meta: {
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/merchant/storeInfo')
      }
    ]
  }
]
