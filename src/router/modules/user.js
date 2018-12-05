import Main from '@/view/main/index'

// 用户管理
export default [
  {
    path: '/usersManagement',
    name: 'usersManagement',
    meta: { title: '用户管理', icon: 'person-stalker' },
    component: Main,
    children: [

      // 分公司 列表/新增/查看
      {
        path: '/branchCompanyList',
        name: 'branchCompanyList',
        meta: { title: '分公司', icon: 'person-stalker', hideInMenu: true },
        component: () => import('@/view/user/branchCompany/index')
      },
      {
        path: '/addBranchCompany',
        name: 'addBranchCompany',
        meta: { hideInMenu: true },
        component: () => import('@/view/user/branchCompany/addBranchCompany')
      },

      // 城市合伙人 列表/查看
      {
        path: '/cityPartnerList',
        name: 'cityPartnerList',
        meta: { title: '城市合伙人', icon: 'person-stalker', cache: true },
        component: () => import('@/view/user/cityPartner/cityPartnerList')
      },
      {
        path: '/cityPartnerCheck',
        name: 'cityPartnerCheck',
        meta: { hideInMenu: true, notCache: true },
        component: () => import('@/view/user/cityPartner/cityPartnerCheck')
      },

      // 渠道合伙人 列表/查看
      {
        path: '/channelPartnerList',
        name: 'channelPartnerList',
        meta: { title: '渠道合伙人', icon: 'person-stalker', cache: true },
        component: () => import('@/view/user/channelPartnerList/channelPartnerList')
      },
      {
        path: '/channelPartnerCheck',
        name: 'channelPartnerCheck',
        meta: { hideInMenu: true },
        component: () => import('@/view/user/channelPartnerList/channelPartnerCheck')
      },

      // 业务员 列表/查看
      {
        path: '/salesList',
        name: 'salesList',
        meta: { title: '业务员', icon: '_user-tie', cache: true },
        component: () => import('@/view/user/salesList/index')
      },
      {
        path: '/salesCheck',
        name: 'salesCheck',
        meta: { hideInMenu: true },
        component: () => import('@/view/user/salesList/salesCheck')
      }
    ]
  }
]
