
export default function (ctx) {
  let columns = [
    { title: '序号', type: 'index' },
    { title: '会员ID', key: 'mobile' },
    { title: '分公司', key: 'company' },
    { title: '绑定门店', key: 'storeName' },
    // { title: '绑定体验店', key: 'experienceStoreName', width: 100 },
    // { title: '余额', key: 'balance', width: 100 },
    // { title: '积分', key: 'integral', width: 100 },
    { title: '订单数', key: 'orderCount' },
    {
      title: '状态',
      key: 'statusDesc',
      width: 100
      // render: (h, params) => {
      //   return h('div', [
      //     h('span', {
      //       style: {
      //         color: params.row.statusDesc === 1 ? '#ed4014' : '#19be6b'
      //       }
      //     }, params.row.statusDesc === 1 ? '冻结' : '正常')
      //   ])
      // }
    },
    { title: '注册时间', key: 'createTime' },
    {
      title: '操作',
      key: 'operation',
      minWidth: 120,
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.$router.push({
                  path: 'userDetail',
                  query: {
                    id: params.row.userId
                  }
                })
              }
            }
          }, '查看')
          // h('Button', {
          //   props: {
          //     type: params.row.status === 1 ? 'success' : 'error',
          //     size: 'small'
          //   },
          //   style: {
          //     marginRight: '5px'
          //   },
          //   on: {
          //     click: () => {
          //       this.confirmationOperation(params.row)
          //     }
          //   }
          // }, params.row.status === 1 ? '恢复' : '冻结')
        ])
      }
    }
  ]
  return columns
}
