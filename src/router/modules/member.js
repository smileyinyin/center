import Main from '@/view/main/index'

// 会员管理
export default [
  {
    path: '/user',
    name: 'user',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/userManger',
        name: 'userManger',
        meta: {
          icon: 'person',
          title: '会员管理',
          notCache: true
        },
        component: () => import('@/view/single-page/userManger')
      },
      // {
      //   path: 'integralDetail',
      //   name: 'integralDetail',
      //   meta: {
      //     hideInMenu: true
      //   },
      //   component: () => import('@/view/single-page/userManger/integralDetail') // 积分明细
      // },

      {
        path: '/userDetail',
        name: 'userDetail',
        meta: {
          hideInMenu: true
        },
        component: () => import('@/view/single-page/userDetail') // 用户详情
      }
    ]
  }
]
