<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  props: {
    waterBill: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dom: null
    }
  },
  watch: {
    '$store.state.app.collapsed'() {
      setTimeout(() => {
        this.dom.resize()
      }, 200)
    },
    waterBill(v) {
      this.handleChart()
    }
  },
  methods: {
    resize() {
      this.dom.resize()
    },
    handleChart() {
      let arr = this.waterBill
      let xArr = []
      let yArr = []
      arr.filter(v => v).forEach(item => {
        xArr.push(item.transDate)
        yArr.push(item.transactionMoney)
      })
      this.option.xAxis[0].data = xArr
      this.option.series[0].data = yArr
      this.dom && this.dom.setOption(this.option)
      // console.log(this.dom)
    }
  },
  mounted() {
    this.option = {
      title: {
        text: '近一年交易金额与分润',
        x: 'center',
        textStyle: {
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // type: 'cross',
          // label: {
          //   backgroundColor: '#6a7985'
          // }
        }
      },
      color: ['rgb(24, 144, 255)', '#00cc00'],
      legend: {
        orient: 'vertical',
        left: 0,
        data: ['交易金额', '分润金额']
      },
      toolbox: {},
      grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '交易金额',
          type: 'line',
          stack: '总量',
          // data: [100000, 110000, 120000, 120000, 130000, 130000, 130000, 130000, 130000, 130000, 120000, 120000],
          data: [],
          itemStyle: {
            normal: {
              color: 'rgb(24, 144, 255)',
              lineStyle: {
                color: 'rgb(24, 144, 255)'
              }
            }
          }
        },
        {
          name: '分润金额',
          type: 'line',
          stack: '总量',
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'top'
          //   }
          // },
          // data: [400000, 300000, 400000, 350000, 300000, 700000, 500000, 300000, 280000, 300000, 320000, 330000],
          data: [],
          itemStyle: {
            normal: {
              color: '#00cc00',
              lineStyle: {
                color: '#00cc00'
              }
            }
          }
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(this.option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
