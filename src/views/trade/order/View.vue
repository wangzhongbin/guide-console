<template>
  <ViewDrawer title="订单详情" @close="close" :value="show" width="900">
    <div class="drawer-body">
      <div class="box">
        <div class="box inline-box">
          <div class="text-line item-box" />
          <div class="item-box">订单信息</div>
        </div>
        <div class="box">
          <table class="view-table">
            <tr>
              <td>订单号</td>
              <td colspan="2" class="view-value">{{order.orderNo}}</td>
              <td>订单状态</td>
              <td colspan="2" class="view-value">{{order.status | orderStatusText}}</td>
            </tr>
            <tr>
              <td>订单金额（元）</td>
              <td colspan="2" class="view-value">{{order.totalAmount | decimal}}</td>
              <td>下单时间</td>
              <td colspan="2" class="view-value">{{order.orderTime | timeText}}</td>
            </tr>
            <tr>
              <td>商品件数</td>
              <td colspan="2" class="view-value">{{order.goodsCount}}</td>
              <td>商品总数</td>
              <td colspan="2" class="view-value">{{order.totalAmount}}</td>
            </tr>
            <tr v-if="order.status === 20 || order.status === 21 || order.status === 80">
              <td>支付单号</td>
              <td colspan="2" class="view-value">{{order.payNo}}</td>
              <td>支付时间</td>
              <td colspan="2" class="view-value">{{order.payTime | timeText}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="box">
        <div class="box inline-box">
          <div class="text-line item-box" />
          <div class="item-box">物流信息</div>
        </div>
        <div class="box">
          <table class="view-table">
            <tr>
              <td>收件人</td>
              <td colspan="2" class="view-value">{{order.userName}}</td>
              <td>手机号码</td>
              <td colspan="2" class="view-value">{{order.phone}}</td>
            </tr>
            <tr>
              <td>收货地址</td>
              <td colspan="5" class="view-value">{{order.provinceName}}{{order.cityName}}{{order.countyName}}{{order.detailInfo}}</td>
            </tr>
            <tr v-if="order.status === 21">
              <td>快递公司</td>
              <td colspan="2" class="view-value">{{order.expressName}}</td>
              <td>快递单号</td>
              <td colspan="2" class="view-value">{{order.expressNumber}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="box">
        <div class="box inline-box">
          <div class="text-line item-box" />
          <div class="item-box">商品信息</div>
        </div>
        <div class="box">
          <table class="view-table">
            <tr>
              <td>收件人</td>
              <td>商品编号</td>
              <td colspan="2">商品名称</td>
              <td>单价（元）</td>
              <td>数量</td>
            </tr>
            <tr class="view-value" v-for="(item, index) in orderItems" :key="index">
              <td>
                <MediaShow :src="item.smallImage" width="100" height="100" />
              </td>
              <td>{{item.goodsCode}}</td>
              <td colspan="2">{{item.goodsName}}</td>
              <td>{{item.goodsPrice | decimal}}</td>
              <td>{{item.amount}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="box" v-if="refunds.length > 0">
        <div class="box inline-box">
          <div class="text-line item-box" />
          <div class="item-box">退款信息</div>
        </div>
        <div class="box">
          <Tabs :animated="false">
            <TabPane v-for="(item, index) in refunds" :key="index" :label="'退款 ' + (index + 1)">
              <table class="view-table">
                <tr>
                  <td>退款订单号</td>
                  <td colspan="2">{{item.refundNo}}</td>
                  <td>退款状态</td>
                  <td colspan="2">{{item.status | refundStatusText}}</td>
                </tr>
                <tr>
                  <td>退款申请时间</td>
                  <td colspan="5">{{item.applyTime | timeText}}</td>
                </tr>
                <tr v-if="item.status === 8 || item.status === 2">
                  <td>退款金额（元）</td>
                  <td colspan="2">{{item.refundPrice | decimal}}</td>
                  <td>退款发起时间</td>
                  <td colspan="2">{{item.refundTime | timeText}}</td>
                </tr>
                <tr v-if="item.status === 8 ">
                  <td>退款流水</td>
                  <td colspan="2">{{item.payRefundNo}}</td>
                  <td>退款成功时间</td>
                  <td colspan="2">{{item.successTime | timeText}}</td>
                </tr>
                <tr>
                  <td>反馈问题</td>
                  <td colspan="5">{{item.message}}</td>
                </tr>
                <tr>
                  <td>反馈图片</td>
                  <td colspan="5">
                    <div class="inline-box">
                      <MediaShow :src="item.images" class="item-box" width="100" height="100" />
                    </div>
                  </td>
                </tr>
                <tr v-if="item.reply">
                  <td>退款回复</td>
                  <td colspan="5">{{item.reply}}</td>
                </tr>
              </table>
            </TabPane>
          </Tabs>
        </div>
      </div>

    </div>
  </ViewDrawer>
</template>
<script>

import { loadOrder } from '@/api/trade/order'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    orderId: Number
  },
  data () {
    return {
      order: {},
      orderItems: [],
      refunds: []
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.loadOrder()
      }
    }
  },
  methods: {
    loadOrder () {
      loadOrder(this.orderId).then(res => {
        const { order, orderItems, refunds } = res
        this.order = order
        this.orderItems = orderItems
        this.refunds = refunds
      })
    },
    close () {
      this.$emit('change', false)
    }
  }
}
</script>
