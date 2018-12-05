import { formatDate } from '@/libs/util'

// 商户拥有的状态
const statusMap = [
  { desc: '草稿', key: 1 },
  { desc: '待审核', key: 2 },
  { desc: '正常', key: 3 },
  { desc: '审核失败', key: 4 },
  { desc: '停业', key: 5 }
]

// 状态对应的操作
// const status2Operation = {
//   1: ['look', 'edit'],
//   2: ['look', 'check'],
//   3: ['look', 'edit'],
//   4: ['look', 'checkReason'],
//   5: ['look', 'edit']
// }

// 操作集合
// const operationsMap = {
//   'look': (ctx, h, params) => h('Button', {
//     props: { size: 'small', type: 'primary' },
//     style: { marginRight: '5px' },
//     on: {
//       click: () => {
//         ctx.$router.push({ name: 'checkMerchant', query: { merchantId: params.row.id } })
//       }
//     }
//   }, '查看'),

//  'edit': (ctx, h, params) => h('Button', {
//    props: { size: 'small', type: 'ghost' },
//    on: {
//      click: () => {
//        ctx.$router.push({ name: 'merchantAdd', params: params.row })
//     }
//    }
//  }, '修改'),

//  'check': (ctx, h, params) => h('Button', {
//    props: { size: 'small', type: 'success' },
//    on: {
//      click: () => {
//        ctx.$router.push({ name: 'checkInfo' })
//      }
//    }
//  }, '审核'),

//   'shutdown': (ctx, h, params) => h('Button', {
//     props: { size: 'small', type: 'error' },
//     on: {
//       click: () => {
//         // TODO
//         ctx.$Notice.info({
//           title: '暂不支持',
//           desc: '<p>暂不支持此功能，敬请期待:)</p><br/>'
//         })
//         // TODO
//         // ctx.$Modal.confirm({
//         //   title: '确认停业',
//         //   content: '<p>确定要停业吗？</p><br/>',
//         //   onOk: () => {
//         //     getMerchantsActive({ shopId: params.row.id, shopStatus: 5 }).then(res => {
//         //       ctx.getMerchantList()
//         //     })
//         //   }
//         // })
//       }
//     }
//   }, '停业'),

//   'checkReason': (ctx, h, params) => h('Button', {
//     props: { size: 'small', type: 'warning' },
//     on: {
//       click: () => {
//         ctx.setMerchant(params.row)
//         ctx.$router.push({ name: 'checkInfo' })
//       }
//     }
//   }, '审核结果'),

//   'renew': (ctx, h, params) => h('Button', {
//     props: { size: 'small', type: 'success' },
//     on: {
//       click: () => {
//         // TODO
//         ctx.$Notice.info({
//           title: '暂不支持',
//           desc: '<p>暂不支持此功能，敬请期待:)</p><br/>'
//         })
//         // TODO
//         // ctx.$Modal.confirm({
//         //   title: '确认恢复',
//         //   content: '<p>确定要恢复吗？</p><br/>',
//         //   onOk: () => {
//         //     getMerchantsActive({ shopId: params.row.id, shopStatus: 3 }).then(res => {
//         //       ctx.getMerchantList()
//         //     })
//         //   }
//         // })
//       }
//     }
//   }, '恢复')
// }

// 各字段渲染
const renderMap = {

  name: function(h, params) {
    return h('Tooltip', { props: { placement: 'top' } }, [
      params.row.name,
      h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.name)
    ])
  },

  accountStatus: function(h, params) {
    return h('span', {
      class: 'link',
      on: {
        click: () => this.goAccountInfo(params.row)
      }
    },
    params.row.accountStatus === 1 ? '已添加' : '未添加')
  },

  storesNumber: function(h, params) {
    let canNotAdd = params.row.mold === 1 && params.row.accountStatus !== 1
    return h(
      'span',
      !canNotAdd ? {
        class: 'link',
        on: {
          click: () => this.goStoreList(params.row)
        }
      } : { style: { 'padding': '5px' } },
      params.row.storesNumber || 0
    )
  },

  memberNumber: function(h, params) {
    return h(
      'span',
      {
        class: 'link',
        on: {
          click: () => this.goMemberList(params.row)
        }
      },
      params.row.memberNumber || 0
    )
  },

  createTime: function(h, params) {
    return h('span', formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm'))
  },

  modifyTime: function(h, params) {
    return h('span', formatDate(new Date(params.row.modifyTime), 'yyyy-MM-dd hh:mm'))
  },

  status: function(h, params) {
    var status = statusMap.find(item => params.row.status === item.key)
    return h('span', status ? status.desc : '')
  }
}

export default function () {
  const columns = [
    { title: 'ID', key: 'id', minWidth: 60 },
    { title: '城市', key: 'city', minWidth: 80 },
    { title: '分公司', key: 'branchCompany', minWidth: 80 },
    { title: '合伙人', key: 'partnerName', minWidth: 100 },
    { title: '商户名称', key: 'name', width: 150, ellipsis: true, render: (h, params) => renderMap.name.call(this, h, params) },
    { title: '法人', key: 'legalName', width: 120 },
    { title: '经营类型', key: 'categoryName', width: 120 },
    {
      title: '账号信息',
      key: 'accountStatus', // 现在改成账号信息自动生成，这里只给查看
      minWidth: 100,
      render: (h, params) => renderMap.accountStatus.call(this, h, params)
    },
    // { title: '认证信息', key: 'legalStatus', minWidth: 100, render: (h, params) => renderMap.legalStatus.call(this, h, params) },
    { title: '门店数', key: 'storesNumber', minWidth: 80, render: (h, params) => renderMap.storesNumber.call(this, h, params) },
    // { title: '在售商品数', key: 'goodsNumber', minWidth: 80 },
    { title: '会员数', key: 'memberNumber', minWidth: 80 },
    { title: '创建时间', key: 'createTime', minWidth: 140, render: (h, params) => renderMap.createTime.call(this, h, params) },
    { title: '更新时间', key: 'modifyTime', minWidth: 140, render: (h, params) => renderMap.modifyTime.call(this, h, params) },
    { title: '状态', key: 'status', minWidth: 90, render: (h, params) => renderMap.status.call(this, h, params) },
    {
      title: '操作',
      key: 'action',
      minWidth: 150,
      render: (h, params) => {
        return h('div', [
          h(
            'Button',
            {
              props: { size: 'small', type: 'primary' },
              style: { marginRight: '5px' },
              on: {
                click: () => {
                  this.$router.push({ name: 'checkMerchant', query: { merchantId: params.row.id } })
                }
              }
            }, '查看'
          )
        ])
        // let { status = 1 } = params.row
        // let operationArr = []

        // operationArr = status2Operation[status]
        //   .map(oper => operationsMap[oper](this, h, params))

        // return h('div', operationArr)
      }
    }
  ]

  return columns
}
