import { formatDate } from '@/libs/util'
export default function () {
  let columns = [
    { title: '序号', type: 'index', width: 60, align: 'center' },
    { title: '商户名称', key: 'bill_uuid' },
    { title: '门店名称', key: 'bill_uuid' },
    { title: 'pos机终端号', key: 'bill_uuid' },
    { title: '手续费', key: 'bill_uuid' },
    { title: '卡活动', key: 'bill_uuid' },
    { title: '商户小票名称（扫描小票名称)', key: 'bill_uuid' },
    { title: '支付类型', key: 'bill_uuid' },
    { title: '应付金额', key: 'bill_uuid' },
    { title: '交易金额', key: 'bill_uuid' },
    { title: '利润', key: 'bill_uuid' },
    { title: '交易时间',
      key: 'create_time',
      render: (h, params) => {
        return h(
          'span',
          null,
          formatDate(
            new Date(params.row.create_time),
            'yyyy-MM-dd hh:mm:ss'
          )
        )
      }
    }
  ]
  return columns
}
