
<template>
  <Form :label-width="100" class="base-information dib">
    <!-- 活动名称 -->
    <FormItem label="活动名称" prop="name">{{ baseInfoForm.name }}</FormItem>
    <!-- 所在地区 -->
    <FormItem label="所在地区">
      {{ baseInfoForm.provinceName }}
      -
      {{ baseInfoForm.cityName }}
    </FormItem>
    <!-- 活动主办方 -->
    <FormItem label="活动主办方" prop="bankId">{{ baseInfoForm.bankName }}</FormItem>
    <!-- 活动协办方 -->
    <FormItem label="活动协办方" prop="companyId">{{ baseInfoForm.companyName }}</FormItem>
    <!-- 活动预算 -->
    <FormItem label="活动预算" prop="budget">{{ baseInfoForm.budget || '无' }}</FormItem>
    <!-- 活动形式 -->
    <FormItem label="活动形式" prop="actProperty">{{ baseInfoForm.actProperty === 'offline' ? '线下活动' : '线上活动' }}</FormItem>
    <!-- 活动时间 -->
    <FormItem label="活动时间">
      {{ formatDate(baseInfoForm.startTime) }}
      -
      {{ formatDate(baseInfoForm.endTime) }}
    </FormItem>
    <!-- 可选时间段 -->
    <FormItem label="可选时间段" prop="weeksList">
      <Card class="tl">
        <CheckboxGroup v-model="baseInfoForm.weeksList" class="mt10 mb10">
          <Checkbox v-for="(day, i) in weekDay" :label="day.value" :key="i" :disabled="disabled">{{day.des}}</Checkbox>
        </CheckboxGroup>
      </Card>
    </FormItem>
    <div class="cl"></div>
    <!-- 删选时间 -->
    <FormItem class="tl zx1 date-panel-wrap" label="筛选时间" style="margin-bottom: 10px;">
      <date-range-panel v-model="baseInfoForm.includeTimesList"
                      :can-selected-day="baseInfoForm.weeksList"
                      :start-time="baseInfoForm.startTime"
                      :end-time="baseInfoForm.endTime"
                      :exclude-times-list="baseInfoForm.excludeTimesList"
                      :disabled="disabled"
      >
      </date-range-panel>
    </FormItem>
    <!-- 活动内容 -->
    <FormItem label="活动内容" prop="detail">{{ baseInfoForm.detail }}</FormItem>
  </Form>
</template>

<script>
// import _keys from 'lodash/keys'
// import _pick from 'lodash/pick'
import weekDay from '../../data/week-day'
import DateRangePanel from './components/date-range-panel'
import { getActivityBaseInformation } from '@/api/bank/activity'
import { formatDate } from '@/libs/util'

export default {
  data() {
    return {
      weekDay,
      formatDate,
      baseInfoForm: {
        id: null,
        name: '',
        city: '',
        province: '',
        bankId: '',
        companyId: '',
        budget: '',
        parentId: '',
        actProperty: 'offline',
        actType: 'common_act',
        startTime: null,
        endTime: null,
        weeksList: [0, 1, 2, 3, 4, 5, 6],
        detail: '',
        smsContent: '',
        includeTimesList: [],
        excludeTimesList: []
      }
    }
  },

  props: {
    activityId: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },

  methods: {
    async getActivityBaseInformation(activityId) {
      let res = await getActivityBaseInformation(activityId)
      let {
        data: {
          bankId = null,
          budget = '',
          companyId = null,
          weeksList = [],
          startTime = null,
          endTime = null
        },
        data
      } = res

      this.baseInfoForm = data // _pick(data, _keys(this.baseInfoForm))

      this.baseInfoForm.startTime = new Date(startTime)
      this.baseInfoForm.endTime = new Date(endTime)
      this.baseInfoForm.weeksList = weeksList.map(e => Number(e))
      this.baseInfoForm.bankId = bankId
      this.baseInfoForm.budget = budget
      this.baseInfoForm.companyId = companyId
    }
  },
  created() {
    let activityId = this.$route.query.activityId

    this.baseInfoForm.id = activityId

    this.getActivityBaseInformation(activityId)
  },
  components: { DateRangePanel }
}
</script>

<style lang="less" scoped>
.base-information {
  width: 100%;
  min-width: 1045px;

  > .ivu-form-item {
    float: left;
    width: 50%;
  }

  /deep/ .ivu-input.ivu-input-default {
    text-align: center;
  }
}
</style>
