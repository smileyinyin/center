
// 状态对应的操作
const status2opers = {
  1: ['check', 'freeze'],
  2: ['check', 'unfreeze', 'update']
}

// 所有操作
const operationsMap = {
  // 查看
  check: function(h, params) {
    return h('Button', {
      props: { size: 'small', type: 'primary' },
      style: { marginRight: '5px' },
      on: {
        click: () => this.$router.push({ name: 'checkBranchCompany', params: params.row })
      }
    }, '查看')
  },
  // 冻结
  freeze: function(h, params) {
    return h('Button', {
      props: { size: 'small', type: 'error' },
      style: { marginRight: '5px' },
      on: {
        click: () => this.freezeBranchCompany(params.row)
      }
    }, '冻结')
  },
  // 恢复
  unfreeze: function(h, params) {
    return h('Button', {
      props: { size: 'small', type: 'success' },
      style: { marginRight: '5px' },
      on: {
        click: () => this.unfreezeBranchCompany(params.row)
      }
    }, '恢复')
  },
  // 修改
  update: function(h, params) {
    return h('Button', {
      props: { size: 'small', type: 'warning' },
      style: { marginRight: '5px' },
      on: {
        click: () => this.$router.push({ name: 'addBranchCompany', params: params.row })
      }
    }, '修改')
  }
}

export default function(ctx) {
  let columns = [
    { title: 'ID', key: 'id', minWidth: 60 },
    { title: '登录账号', key: 'account', minWidth: 100 },
    { title: '分公司', key: 'name', minWidth: 100 },
    { title: '所在区域', key: 'area', minWidth: 100 },
    { title: '法人', key: 'chargeMan', minWidth: 100 },
    { title: '地址', key: 'adress', minWidth: 120, ellipsis: true },
    { title: '城市合伙人数', key: 'cityPartnerNum', minWidth: 110 },
    { title: '渠道合伙人数', key: 'channelPartnerNum', minWidth: 110 },
    { title: '商户数', key: 'merchantNum', minWidth: 100 },
    { title: 'POS台数', key: 'posNum', minWidth: 100 },
    { title: '创建时间', key: 'createTime', minWidth: 100 },
    { title: '状态', key: 'status', minWidth: 100 },
    {
      title: '操作',
      key: 'action',
      minWidth: 80,
      render: (h, params) => {
        let { status = 1 } = params.row
        let opers = []

        opers = status2opers[status]
          .map(oper => operationsMap[oper].call(ctx, h, params))

        return h('div', opers)
      }
    }
  ]

  return columns
}
