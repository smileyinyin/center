<template>
  <div class="activity-rules">
    <!-- <p>活动模板</p> -->

    <div class="template-rule mt20 bbe pb30">
      <!-- 提前下线编辑模式 -->
      <!-- <div class="edit_mode" v-show="activityStatus === 'early_offline'"> </div> -->

      <h4>活动规则</h4>

      <div class="template-rule-wrap">
        <!-- 连环折扣 -->
        <combo-discount v-if="activityTemplateType === 'SerialDiscount'" v-model="templateRule.SerialDiscount" :disabled="disabled"> </combo-discount>

        <!-- 几号几折 -->
        <day-discount v-if="activityTemplateType === 'DateDiscount'" v-model="templateRule.DateDiscount" :disabled="disabled"> </day-discount>

        <!-- 周几几折 -->
        <week-discount v-if="activityTemplateType === 'WeekdayDiscount'" v-model="templateRule.WeekdayDiscount" :disabled="disabled"> </week-discount>

        <!-- 没满多少减多少 -->
        <every-meet-minus v-if="activityTemplateType === 'EveryMeetMinus'" v-model="templateRule.EveryMeetMinus" :disabled="disabled"> </every-meet-minus>

        <!-- 随机立折 -->
        <random-discount v-if="activityTemplateType === 'RandomDiscount'" v-model="templateRule.RandomDiscount" :disabled="disabled"> </random-discount>

        <!-- 随机立减 -->
        <random-minus v-if="activityTemplateType === 'RandomMinus'" v-model="templateRule.RandomMinus" :disabled="disabled"> </random-minus>

        <!-- 满多少打几折 -->
        <meet-discount v-if="activityTemplateType === 'MeetDiscount'" v-model="templateRule.MeetDiscount" :disabled="disabled"> </meet-discount>

        <!-- 满多少减多少 -->
        <meet-minus v-if="activityTemplateType === 'MeetMinus'" v-model="templateRule.MeetMinus" :disabled="disabled"> </meet-minus>

        <!-- 立折 -->
        <immediately-discount v-if="activityTemplateType === 'ImmediatelyDiscount'" v-model="templateRule.ImmediatelyDiscount" :disabled="disabled"> </immediately-discount>

        <!-- 立减 -->
        <immediately-minus v-if="activityTemplateType === 'ImmediatelyMinus'" v-model="templateRule.ImmediatelyMinus" :disabled="disabled"> </immediately-minus>

        <!-- 票务 -->
        <ticket v-if="activityTemplateType === 'Ticket'" v-model="templateRule.Ticket" :disabled="disabled"> </ticket>
      </div>
    </div>

    <div class="template-limit mt20 mb20">
      <h4 class="mb20">限制条件</h4>

      <!-- 限制条件 -->
      <activity-limit-rule :activityTemplateType="activityTemplateType" :selected-limit.sync="selectedLimit" :card-bins.sync="limitRuleForm.cardBins" :moneys.sync="limitRuleForm.moneys" :quantities.sync="limitRuleForm.quantities" :disabled="disabled"> </activity-limit-rule>
    </div>

  </div>
</template>

<script>
import mixinActivityTemplateRule from './mixins/activity-template-rule'
import ActivityLimitRule from './components/activity-limit-rule'
import RandomDiscount from './activity-templates/random-discount'
import RandomMinus from './activity-templates/random-minus'
import MeetDiscount from './activity-templates/meet-discount'
import MeetMinus from './activity-templates/meet-minus'
import ImmediatelyDiscount from './activity-templates/immediately-discount'
import ImmediatelyMinus from './activity-templates/immediately-minus'
import EveryMeetMinus from './activity-templates/every-meet-minus'
import WeekDiscount from './activity-templates/week-discount'
import DayDiscount from './activity-templates/day-discount'
import ComboDiscount from './activity-templates/combo-discount'
import Ticket from './activity-templates/ticket'

// import iNotice from 'iview/src/components/notice';
// import * as ApiCreateActivity from '@/api/create-activity'
import _cloneDeep from 'lodash/cloneDeep'
import _keys from 'lodash/keys'
import _pick from 'lodash/pick'
import _intersection from 'lodash/intersection'
import activityRuleLimitAlias from '../../data/activity-rule-limit-alias'
import activityTemplates from '../../data/activity-templates'
import activityTemplateInfos from '../../data/activity-template-infos'
import { getActivityLimitRule } from '@/api/bank/activity'

export default {
  mixins: [mixinActivityTemplateRule],

  data () {
    return {
      activityStatus: 'draft',
      activityTemplateType: 'MeetDiscount',
      activityId: '',
      selectedLimit: [],

      limitRuleForm: {
        cardBins: [],
        quantities: [],
        moneys: []
      }
    }
  },

  props: {
    disabled: { type: Boolean, default: false }
  },

  methods: {
    /**
       * @desc get activity limit rules information.
       * @param activityId {string} activity id.
       * @return {Promise<void>}
       */
    async getActivityLimitRuleInformation (activityId) {
      let { data } = await getActivityLimitRule(activityId)
      let ruleType = data.ruleType
      let ownLimitRule = []
      let { status = 'draft' } = data

      // if not ruleType attribute, represent is new create activity.
      if (!ruleType) return

      // 恢复限制规则显示
      // 处理 卡BIN 限制
      if (data.cardBins.length) {
        ownLimitRule.push('cardBinLimit')
      }
      // 处理 quantities
      for (let quantity of data.quantities) {
        ownLimitRule.push(activityRuleLimitAlias[quantity.type].full)
      }
      // 处理 moneys
      for (let money of data.moneys) {
        ownLimitRule.push(activityRuleLimitAlias[money.type].full)
      }

      // TODO: 保留 card bins 限制, 否则会有 bug
      this.selectedLimit = ['cardBinLimit']
      this.activityStatus = status
      this.activityTemplateType = ruleType
      this.limitRuleForm = _cloneDeep(_pick(data, _keys(this.limitRuleForm)))
      this.$nextTick(() => {
        this.selectedLimit = _intersection(activityTemplateInfos[ruleType].limit, ownLimitRule)
        this.templateRule[ruleType] = data[activityTemplates[ruleType]['memberName']]
      })
      this.$emit('status', status)
    },

    /**
       * @desc mounted lifecycle after need process things.
       */
    mounted () {
      if (this.activityId) {
        this.getActivityLimitRuleInformation(this.activityId)
      }
    }
  },
  created () {
    this.activityId = String(this.$route.query.activityId)
  },

  mounted () {
    this.$nextTick(this.mounted)
  },

  components: {
    RandomDiscount,
    RandomMinus,
    MeetDiscount,
    MeetMinus,
    ImmediatelyDiscount,
    Ticket,
    ActivityLimitRule,
    EveryMeetMinus,
    ImmediatelyMinus,
    WeekDiscount,
    DayDiscount,
    ComboDiscount
  }
}
</script>
