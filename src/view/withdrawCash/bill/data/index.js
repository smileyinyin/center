import { formatDate } from '@/libs/util'
export default function () {
  let columns = [
    { title: '序号', type: 'index' },
    { title: '分公司', key: 'bill_uuid' },
    { title: '账单号', key: 'bill_uuid' },
    { title: '用户名称', key: 'username' },
    { title: '合伙人类型', key: 'partnerstatus' },
    { title: '年月',
      key: 'create_time',
      render: (h, params) => {
        return h(
          'span',
          null,
          formatDate(
            new Date(params.row.create_time),
            'yyyy-MM'
          )
        )
      }
    },
    { title: '可结算金额', key: 'bii_m_sum_money' },
    { title: '到账金额',
      key: '',
      render: (h, params) => {
        return h(
          'span',
          (params.row.bii_m_sum_money * 100 -
                  params.row.service_charge * 100) /
                  100
        )
      }
    },
    { title: '提现状态', key: 'ttstatus' },
    { title: '操作',
      width: 200,
      key: 'control',
      render: (h, params) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              style: {},
              on: {
                click: () => {
                  this.$router.push({
                    path: 'tixian-record',
                    query: {
                      zdId: params.row.id,
                      zdUrl: params.row.bill_address
                    }
                  })
                }
              }
            },
            '账单明细'
          )
        ])
      }
    }
  ]
  return columns
}
