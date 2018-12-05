import Main from '@/view/main/index'

// POS管理
export default [
  {
    path: '/merchantEntry',
    name: 'merchantEntry',
    meta: { title: '机具管理', icon: '_jinhuo' },
    component: Main,
    children: [
      // {
      //   path: '/equipmentInventory',
      //   name: 'equipmentInventory',
      //   meta: {
      //     title: '机具库存',
      //     icon: '_jinhuo'
      //   },
      //   component: () => import('@/view/posManager/equipmentInventory')
      // },
      {
        path: '/posTerminalList',
        name: 'posTerminalList',
        meta: {
          title: 'POS终端列表',
          icon: '_jinhuo'
        },
        component: () => import('@/view/merchantEntry/posTerminalList')
      }
    ]
  }
]
