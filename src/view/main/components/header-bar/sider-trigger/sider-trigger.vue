<template>
  <a @click="handleChange" type="text" class="sider-trigger-a" :class="[collapsed ? 'collapsed' : '']"><Icon :type="icon" :size="size" /></a>
</template>
<script>
export default {
  name: 'siderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange () {
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>

<style lang="less" scoped>
@size: 64px;
.trans{
  transition: transform .2s ease;
}

.sider-trigger-a {
  padding: 6px;
  width: @size;
  height: @size;
  display: inline-block;
  text-align: center;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #272c33;

  /deep/ i{
    .trans;
    vertical-align: top;
  }
  &.collapsed i{
    transform: rotateZ(90deg);
    .trans;
  }
}
</style>
