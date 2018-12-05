<template>
  <div class="home">
    <Row :gutter="20" class-name="infor-card">
      <i-col :md="6" :xs="12" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px; margin-bottom: 20px">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style" :decimals="infor.decimals"><span v-if="infor.prefix" slot="prefix" class="count-style">￥</span></count-to>
          <p class="title">{{ infor.title }}</p>
          <span v-if="infor.tip" slot="tip">{{ infor.tip }}</span>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" class-name="center-number">
      <i-col :md="16" :xs="24">
        <Card>
          <Row :gutter="10">
            <i-col :md="6" :xs="12" v-for="(record, i) in records" :key="i" class-name="center-content">
              <div class="left">
                <count-to :end="record.count" count-class="number-style" />
                <p class="title">{{ record.title }}</p>
              </div>
              <div class="right">
                <commonIcon :type="i % 2 === 0 ? 'connection-bars' : 'arrow-graph-up-right'"
                  :color="i % 2 === 0 ? '#2d8cf0' : '#f39182'"
                ></commonIcon>
              </div>
            </i-col>
          </Row>
        </Card>
        <Card style="height: 560px; margin: 20px 0">
          <h4 slot="title" >本月流水额</h4>
          <RadioGroup v-model="transLabel" type="button" @on-change="radioLabelChange" value="本月交易金额">
            <Radio label="本月交易金额"></Radio>
            <Radio label="本月营销金额"></Radio>
          </RadioGroup>
          <example :waterBill="waterBill" style="height: 380px;margin-top: 40px;"/>
        </Card>
      </i-col>
      <i-col :md="8" :xs="24">
        <Card class="posList">
          <h4 slot="title" >POS消费实时推送</h4>
          <ul>
            <li v-for="(item, i) in posRecord" :key="i" class="pos-item">
              <span class="info">
                <span>{{ item.storeName }}</span>
                <span>{{ item.payMode }}</span>
                <span>{{ item.transactionMoney }}</span>元
              </span>
              <span class="timestamp">{{ item.transDateTime }}</span>
            </li>
          </ul>
        </Card>
        <Card class="bussinessList mt20">
          <h4 slot="title">业绩排行榜</h4>
          <RadioGroup value="城市合伙人" type="button" @on-change='radioChange'>
            <Radio label="城市合伙人"></Radio>
            <Radio label="渠道合伙人"></Radio>
            <Radio label="生态圈商家"></Radio>
          </RadioGroup>
          <rank-list :data="rankList" :property='rankProperty'></rank-list>
        </Card>
      </i-col>
    </Row>
    <!-- <Row :gutter="20" class-name="bottom-card">
      <i-col span="12">
        <Card style="height: 420px;">
          <example style="height: 320px;margin-top: 20px;"/>
        </Card>
      </i-col>
      <i-col span="12">
        <Card style="height: 420px;">
          <rank-chart style="height: 320px;margin-top: 20px;"></rank-chart>
        </Card>
      </i-col>
    </Row> -->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import commonIcon from '_c/common-icon'
import CountTo from '_c/count-to'
import Example from './example.vue'
import rankChart from './rankChart.vue'
import rankList from './rankList'
import { getCollection, getPos, getCityPartnerRank, getChannelPartnerRank, getMerchantsRank, getMonthTransaction, getMonthMarketing } from '@/api/home/index'

export default {
  name: 'home1', // '城市合伙人、渠道合伙人看到'
  components: {
    InforCard,
    CountTo,
    Example,
    commonIcon,
    rankChart,
    rankList
  },
  data() {
    return {
      // rankLabel: '渠道合伙人',
      transLabel: '本月交易金额',
      rankProperty: ['rank', 'cityPartnerName', 'cityAmount', 'transInfo'],
      inforCardData: [
        {
          prop: 'historyAmount',
          title: '历史交易金额（元）',
          icon: '_jinbitixian',
          count: 0,
          color: '#ef7bad',
          decimals: 2,
          // lastTime: '2018-07-30 12:32:20',
          // tip: '最近一次提现：',
          prefix: true
        },
        {
          prop: 'todayAmount',
          title: '今日交易金额（元）',
          icon: '_jinrigaikuang',
          count: 0,
          color: '#f29485',
          decimals: 2,
          // tip: '最近一笔分润：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        },
        {
          prop: 'historyProfit',
          title: '历史利润总额（元）',
          icon: '_zuorigaikuang',
          count: 0,
          color: '#53a69c',
          decimals: 2,
          // tip: '最近新增商户：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        },
        {
          prop: 'activityProfit',
          title: '今日利润总额（元）',
          icon: '_ai204',
          count: 0,
          color: '#52c8e6',
          // tip: '最近激活终端：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        },
        {
          prop: 'activityAmount',
          title: '活动交易总额(元)',
          icon: '_jinbitixian',
          count: 0,
          color: '#ef7bad',
          decimals: 2,
          // lastTime: '2018-07-30 12:32:20',
          // tip: '最近一次提现：',
          prefix: true
        },
        {
          prop: 'transactionCount',
          title: '交易总笔数',
          icon: '_jinrigaikuang',
          count: 0,
          color: '#f29485',
          decimals: 2,
          // tip: '最近一笔分润：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        },
        {
          prop: 'activityProfit',
          title: '活动收益',
          icon: '_zuorigaikuang',
          count: 0,
          color: '#53a69c',
          decimals: 2,
          // tip: '最近新增商户：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        },
        {
          prop: 'activityCount',
          title: '活动数',
          icon: '_ai204',
          count: 0,
          color: '#52c8e6',
          // tip: '最近激活终端：',
          // lastTime: '2018-07-30 12:32:20',
          prefix: true
        }
      ],
      records: [
        { prop: 'merchantsCount', title: '商户数（家）', count: 0 },
        { prop: 'storeCount', title: '门店数（家）', count: 0 },
        { prop: 'memberCount', title: '会员数（位）', count: 0 },
        { prop: 'posCount', title: 'POS数（台）', count: 0 }
      ],
      posRecord: [
        { storeName: '十足连锁，十足华盛达店', payChannel: '微信支付', money: 1000, timeStamp: '10:47:42' },
        { storeName: '十足连锁，十足华盛达店', payChannel: '微信支付', money: 1000, timeStamp: '10:49:15' },
        { storeName: '十足连锁，十足华盛达店', payChannel: '微信支付', money: 1000, timeStamp: '10:49:17' },
        { storeName: '十足连锁，十足华盛达店', payChannel: '微信支付', money: 1000, timeStamp: '10:49:18' },
        { storeName: '十足连锁，十足华盛达店', payChannel: '微信支付', money: 1000, timeStamp: '10:49:20' }
      ],
      rankList: [
        { rank: 1, name: '杭州城市代理001', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理002', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理003', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理004', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理005', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理006', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理007', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理008', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理009', transactionCount: '3731234.34', rate: '10.1' },
        { rank: 1, name: '杭州城市代理010', transactionCount: '3731234.34', rate: '10.1' }
      ],
      waterBill: []
    }
  },
  created() {
    this.getInfos()
  },
  methods: {
    getInfos() {
      this._getCollection()
      this._getPos()
      this._getCityPartnerRank()
      this._getMonthTransaction()
    },

    // 处理卡片上的数据
    handleCollection(data) {
      this.inforCardData.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
      this.records.forEach(item => {
        if (data[item.prop] || data[item.prop] === 0) {
          item.count = data[item.prop]
        }
      })
    },
    // 排行榜切换
    radioChange(row) {
      if (row === '城市合伙人') {
        this._getCityPartnerRank()
        this.rankProperty = ['rank', 'cityPartnerName', 'cityAmount', 'transInfo']
      } else if (row === '渠道合伙人') {
        this._getChannelPartnerRank()
        this.rankProperty = ['rank', 'channelPartnerName', 'channelAmount', 'transInfo']
      } else if (row === '生态圈商家') {
        this._getMerchantsRank()
        this.rankProperty = ['rank', 'merchantsName', 'merchantsAmount', 'transInfo']
      }
    },

    // 折线图切换
    radioLabelChange(row) {
      if (row === '本月交易金额') {
        this._getMonthTransaction()
      } else if (row === '本月营销金额') {
        this._getMonthMarketing()
      }
    },

    // 获取分公司首页汇总信息
    _getCollection() {
      getCollection({}).then(res => {
        this.handleCollection(res.data)
      })
    },

    // 获取分公司POS消费实时推送
    _getPos() {
      getPos({}).then(res => {
        this.posRecord = res.data
      })
    },

    // 获取分公司城市合伙人排行榜
    _getCityPartnerRank() {
      getCityPartnerRank({}).then(res => {
        this.rankList = res.data
      })
    },

    // 获取分公司渠道合伙人排行榜
    _getChannelPartnerRank() {
      getChannelPartnerRank({}).then(res => {
        this.rankList = res.data
      })
    },

    // 获取分公司生态圈商家排行榜
    _getMerchantsRank() {
      getMerchantsRank({}).then(res => {
        this.rankList = res.data
      })
    },

    // 获取折线图月交易金额
    _getMonthTransaction() {
      getMonthTransaction({}).then(res => {
        let newArray = res.data.map((item) => {
          return {
            transactionMoney: item.transactionMoney.toFixed(2),
            transDate: item.transDate
          }
        })
        this.waterBill = newArray
      })
    },

    // 获取折线图月营销金额
    _getMonthMarketing() {
      getMonthMarketing({}).then(res => {
        let newArray = res.data.map((item) => {
          return {
            transactionMoney: item.transactionMoney.toFixed(2),
            transDate: item.transDate
          }
        })
        this.waterBill = newArray
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .ivu-card {
    box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
    &:hover {
      box-shadow: 0 14px 30px 0 rgba(0, 0, 0, 0.1) !important;
    }
  }
  .infor-card {
    .title {
      color: #fff;
      font-size: 12px;
    }
    .count-style {
      color: #fff;
      font-size: 20px;
    }
  }
  .center-number {
    margin-top: 20px;
    .number-style {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .pos-item {
    margin: 0 10px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 24px;
    border-bottom: 1px solid #f3f3f3;

    &:last-of-type {
      border: none;
    }

    .info {
      flex: 1;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span:nth-child(1) {
        color: #FF9900;
      }
      span:nth-child(3) {
        color: #FF0000;
      }
    }
  }
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26px 26px;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    .right {
      font-size: 30px;
      color: #2d8cf0;
    }
  }

  .bottom-card {
    margin-top: 20px;
    .card-title {
      padding: 20px 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
