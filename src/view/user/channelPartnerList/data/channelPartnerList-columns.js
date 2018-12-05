import { formatDate } from '@/libs/util'
import { statusList } from '../../data'

export default function() {
  let columns = [
    { title: '序号', width: 60, type: 'index' },
    {
      title: '合伙人名称',
      width: 100,
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
      title: '地址',
      width: 100,
      key: '',
      ellipsis: true,
      render: (h, params) => {
        return h('Tooltip', {
          props: { placement: 'top' }
        }, [
          params.row.province + params.row.city + params.row.district,
          h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.province + params.row.city + params.row.district)
        ])
      }
    },
    { title: '法人', key: 'legalPersonName', ellipsis: true, width: 100 },
    {
      title: '基础费率',
      width: 70,
      key: 'posProfitRate',
      render: (h, paranms) => {
        return h('spsan', null, paranms.row.posProfitRate ? (paranms.row.posProfitRate * 100).toFixed(0) + '%' : 0)
      }
    },
    { title: '账号', key: 'mobile', width: 120 },
    {
      title: '状态',
      key: 'status',
      width: 65,
      render: (h, params) => {
        let { color, name } = statusList.find(item => item.code === params.row.status) || {}
        return h('span', { style: { color } }, name)
      }
    },
    {
      title: '商户数',
      key: 'merchantsNumber',
      width: 60,
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
      key: 'totalPosNumber',
      width: 50,
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
      title: '创建时间',
      key: 'createTime',
      width: 140,
      render: (h, params) => {
        return h('span', formatDate(params.row.createTime, 'yyyy-MM-dd hh:mm'))
      }
    },
    {
      title: '操作',
      key: 'time',
      Width: 20,
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: { size: 'small', type: 'primary' },
            style: { marginRight: '5px' },
            on: {
              click: () => {
                this.$router.push({ name: 'channelPartnerCheck', query: { id: params.row.userId } })
              }
            }
          }, '查看')
        ])
      }
    }
  ]

  return columns
}
