
<template>
    <div class="settle height-100">
       <bread-crumb :data="[
      { title: '商品管理'},
      {title: '查看商品'}
    ]"></bread-crumb>
        <Card >

                   <div style="width:100%; display: flex;
    justify-content: space-around">
                 <div class="contont" style="width:50%;margin-left:20px">
                   <div >商户名称: <span>{{params.merchantsname}}</span></div>
                   <div  style="margin-top:40px">门店名称: <span>{{params.storename}}</span></div>
              <div  style="margin-top:40px">商品名称: <span>{{params.name}}</span></div>
              <div style="margin-top:40px">一级分类:
                <span>{{params.category}}</span>
                </div>
                     <div  style="margin-top:40px">商家认证:
                       <span>{{params.certification_body}}</span>
                     </div>
              <div  style="margin-top:40px">商品描述:
                <span>{{params.describe}}</span>
               </div>
            </div>
              <div style="width:50%">
                      <div >
                    商品封面图:
                    <div>
                      <span v-for="(item, index) in goods_imgList" :key="index"><img :src="item" alt="" width="200" height="150" @click="imgShow(goods_imgList)"> </span>
                    </div>
                 </div>
                 <br>
                  <div >
                   商品相册图:
                        <div>
                  <span v-for="(item, index) in goods_thumb_xiang_ceList" :key="index"><img :src="item" alt="" width="200" height="150" @click="imgShow(goods_thumb_xiang_ceList)"> </span>
                    </div>
                 </div>
                 <br>
                  <div >
                    商品详情图:
                       <div>
                  <span v-for="(item, index) in goods_thumb_xiang_qingList" :key="index"><img :src="item" alt="" width="200" height="150" @click="imgShow(goods_thumb_xiang_qingList)"> </span>
                    </div>
                 </div>
              </div>
            </div>
              <divide-line>商品基础信息</divide-line>
                <Form :label-width="80" v-for="(item, index) in params.submitSkuAudits" :key="index" style="display: inline-block;">
                  <FormItem label="规格:">
                    {{ item.name }}
                  </FormItem>
                  <FormItem label="供应价:">
                    {{ item.supply_price }}
                  </FormItem>
                  <FormItem label="规格图:">
                    <img :src="item.goods_sku_img" alt="" width="200" height="150" @click="imgShow(item.goods_sku_img)">
                  </FormItem>
                  <FormItem label="库存:">
                    {{ item.store_number }}
                  </FormItem>
                  <!-- <FormItem label="是否启用:">
                    {{ getStatus(item.status) }}
                  </FormItem> -->
                </Form>
               <br>
                <!-- <div class="flex">
                    <Button type="success"  style="width:120px;margin:0 auto;margin-top:20px;" @click="modal=true">审核通过</Button>
                    <Button type="success"  style="width:120px;margin:0 auto;margin-top:20px;margin-left:50px" @click="modal1=true">审核不通过</Button>
                </div> -->

                  <Modal
                   v-model="modal"
                   title="确认提示"
                   @on-ok="ok"
                   @on-cancel="cancel">
                  <p >确认通过审核?</p>
               </Modal>
               <Modal
                   v-model="modal1"
                   title="确认提示"
                   @on-ok="ok1"
                   @on-cancel="cancel1">
                  <p >审核不通过的原因</p>
                  <Input  style="width: 200px" v-model="reason" />
               </Modal>
            </Card>
            <Modal title="图片预览" v-model="isShowBigImg">
                <img :src="bigImg" style="width: 100%">
            </Modal>
             <div style="width:100%" >
                    <Button type="primary"  style="margin-top:20px" @click="modal=true">审核通过</Button>
                    <Button type="primary"  style="float:right;margin-top:20px" @click="modal1=true">审核不通过</Button>
                </div>

    </div>
</template>
<script>
import breadCrumb from '_c/breadCrumb/breadCrumb'
import divideLine from '_c/divideLine/divide-line'
import { findGoods, auditGoods } from '@/api/good'
// findAudit
export default {
  name: 'settle',
  components: {
    breadCrumb,
    divideLine
  },
  data() {
    return {
      id: null,
      modal: false,
      modal1: false,
      bigImg: '',
      isShow: false,
      isShowBigImg: false,
      reason: '',
      params: {},
      goods_imgList: [], // 封面图列表
      goods_thumb_xiang_ceList: [], // 相册图列表
      goods_thumb_xiang_qingList: [] // 详情图列表
    }
  },
  created() {
    this.id = this.$route.query.id
    findGoods({ id: this.id }).then(res => {
      let data = res.data
      this.params = data

      // 封面图
      this.goods_imgList = data.goods_img.split(',').filter(v => v)
      if (data.submitAlbumAudit.img) { // 相册 和 详情在 img 字段，由 & 分割
        let imgArr = data.submitAlbumAudit.img.split('&')
        // 相册
        this.goods_thumb_xiang_ceList = imgArr[0].split(',').filter(v => v)
        // 详情
        this.goods_thumb_xiang_qingList = imgArr[1].split(',').filter(v => v)
      }
    })
  },

  methods: {
    getStatus(status) {
      if (status === 0) {
        return '待审核'
      } else if (status === 1) {
        return '审核中'
      } else if (status === 2) {
        return '审核不通过'
      } else if (status === 3) {
        return '上架'
      } else if (status === 4) {
        return '下架'
      }
    },
    ok() {
      auditGoods(
        {
          id: this.id,
          status: 3
        }
      ).then(res => {
        this.$Message.info('审核已通过')
        this.$router.push({
          name: 'goods'
        })
      })
    },
    cancel() {

    },
    ok1() {
      auditGoods(
        {
          id: this.id,
          status: 2,
          reason: this.reason
        }
      ).then(res => {
        this.$Message.info('审核不通过')
        this.$router.push({
          name: 'goods'
        })
      })
    },
    cancel1() {

    },
    imgShow(img) {
      this.isShowBigImg = true
      this.bigImg = img
    }
  }
}
</script>
