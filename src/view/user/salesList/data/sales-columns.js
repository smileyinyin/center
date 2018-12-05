import { formatDate } from '@/libs/util'
import { statusList } from '../../data'

export default function () {
  const columns = [
    { title: '序号', width: 60, type: 'index' },
    {
      title: '业务员名称',
      width: 150,
      key: 'partnerName',
      ellipsis: true,
      render: (h, params) => {
        return h('Tooltip', {
          props: { placement: 'top' }
        }, [
          params.row.partnerName,
          h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.partnerName)
        ])
      }
    },
    {
      title: '所属分公司',
      width: 100,
      key: 'controlledCompanyName',
      ellipsis: true,
      render: (h, params) => {
        return h('Tooltip', {
          props: { placement: 'top' }
        }, [
          params.row.controlledCompanyName,
          h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.controlledCompanyName)
        ])
      }
    },
    {
      title: '隶属合伙人',
      width: 130,
      key: 'parentName',
      ellipsis: true,
      render: (h, params) => {
        return h('Tooltip', {
          props: { placement: 'top' }
        }, [
          params.row.parentName,
          h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.parentName)
        ])
      }
    },
    {
      title: 'pos分润比例',
      key: 'posProfitRate',
      width: 120,
      render: (h, paranms) => {
        return h('span', null, paranms.row.posProfitRate ? (paranms.row.posProfitRate * 100).toFixed(0) + '%' : 0)
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 150,
      render: (h, params) => {
        return h('span', null, formatDate(params.row.createTime, 'yyyy-MM-dd hh:mm'))
      }
    },
    {
      title: '状态',
      width: 80,
      key: 'status',
      render: (h, params) => {
        var { color, name } = statusList.find(item => params.row.status === item.code)
        return h('span', { style: { color } }, name)
      }
    },
    {
      title: '商户数',
      key: 'merchantsNumber',
      width: 80,
      render: (h, params) => {
        let canAdd = params.row.accountStatus === 1 //  添加账号信息后才能给添加门店
        return h(
          'span',
          canAdd ? {
            class: 'link',
            on: {
              click: () => this.goStoreList(params.row)
            }
          } : { style: { 'padding': '5px' } },
          params.row.merchantsNumber || 0
        )
      }
    },
    {
      title: 'POS数',
      width: 80,
      key: 'totalPosNumber',
      render: (h, params) => {
        return h(
          'span',
          {
            // class: 'link',
            on: {
              click: () => this.goPosList(params.row)
            }
          },
          params.row.totalPosNumber
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      // width: 80,
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: { size: 'small', type: 'primary' },
            style: { marginRight: '5px' },
            on: {
              click: () => {
                this.$router.push({ name: 'salesCheck', query: { id: params.row.userId } })
              }
            }
          }, '查看')
        ])
      }
    }
  ]

  return columns
}
