<template>
  <Layout class="main" :class="{'mobile': isMobile, 'opened': isOpened}">
    <Header class="header-con">
      <header-bar :collapsed="collapsed">
        <user :user-avator="userAvator"/>
        <span style="margin-right: 20px;">HELLO, {{ userName }}! </span>
        <sider-trigger :collapsed="collapsed" icon="navicon-round" @on-change="handleCollapsedChange"></sider-trigger>
      </header-bar>
    </Header>
    <div class="layer" @click="closeLayer"></div>
    <Layout style="overflow:hidden;">
      <Sider hide-trigger collapsible :width="220" :collapsed-width="64" v-model="collapsed" class="sider">
        <div class="left-side" :class="{'collapsed': collapsed }" :style="{transition: !collapsed ? undefined : 'width .4s' }">
          <side-menu
            accordion
            :active-name="$route.name"
            :collapsed="collapsed"
            :menu-list="menuList"
            @on-select="turnToPage"
          >
          </side-menu>
        </div>
      </Sider>
      <Content class="content-wrapper" style="background-color: #f7f7f7;">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="includeList" :exclude="excludeList">
            <router-view/>
          </keep-alive>
        </transition>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import siderTrigger from './components/header-bar/sider-trigger'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import User from './components/user'

const WIDTH = 1024
const RATIO = 3

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    siderTrigger,
    User
  },
  data () {
    return {
      isMobile: false,
      isOpened: false
    }
  },
  computed: {
    collapsed() {
      return this.$store.state.app.collapsed
    },
    userName () {
      return this.$store.state.user.userName
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    menuList () {
      return this.$store.getters.menuList
    },
    includeList() {
      return this.$store.getters.includeList
    },
    excludeList() {
      return this.$store.getters.excludeList
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isNowMobile()
    this.isMobile = isMobile
  },
  methods: {
    isNowMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isNowMobile()
        this.isMobile = isMobile
        if (isMobile) {
          this.$store.commit('setCollapsed', false)
        }
      }
    },
    turnToPage (name) {
      this.isOpened = false
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({ name })
    },
    handleCollapsedChange (state) {
      if (!this.isMobile) {
        this.$store.commit('setCollapsed', state)
      } else {
        this.isOpened = !this.isOpened
      }
    },
    closeLayer() {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="less">
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.main{
  .logo-con {
    display: flex;
    align-items: center;
    height: 64px;
    // padding: 10px;
    p {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #272c33;
      font-size: 14px;
      font-weight: bold;
      background-color: #fff;
      border-bottom: 1px solid #e8eaec;
    }
  }
  .header-con{
    background: #272c33;
    color: #fff;
    padding: 0;
    z-index: 101;
  }
  .tag-nav-wrapper{
    padding: 0;
    height:40px;
    background:#F0F0F0;
    overflow: hidden;
  }
  .content-wrapper{
    padding: 24px;
  }
}
.ivu-menu-item > i, .ivu-menu-submenu-title > i{
  margin-right: 12px !important;
}
.ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
  margin-right: 8px !important;
}
</style>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;

  .sider {
    box-shadow: 0 2px 10px 0 rgba(7, 17, 27, 0.1);
  }

  .logo-con .ivu-dropdown {
    text-align: center;
    overflow: hidden;
  }

  .left-side {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 240px;

    &.collapsed {
      width: 84px;
    }
  }
  .ivu-layout-sider {
    align-self: stretch;
  }
  .ivu-layout-sider /deep/ .ivu-layout-sider-children {
    overflow-x: hidden;
  }

  &.mobile {
    /deep/ .header-bar {
      padding: 0;
      p {
        display: none;
      }
    }

    .sider {
      position: fixed;
      top: 64px;
      bottom: 0px;
      left: -240px;
      z-index: 9;

      &.collapsed {
        left: 0px;
      }
    }

    &.opened {
      .layer {
        background: #000;
        height: 100%;
        opacity: .3;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 8;
      }
      .sider {
        left: 0px;
      }
    }
  }
}
</style>
