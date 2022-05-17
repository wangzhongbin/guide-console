<template>
  <ViewDrawer title="退款详情" @close="close" :value="show" width="900">
    <div class="drawer-body">
      <table class="view-table">
        <tr>
          <td>退款订单号</td>
          <td colspan="5">{{refund.refundNo}}</td>
        </tr>
        <tr>
          <td>退款状态</td>
          <td colspan="5">{{refund.status | refundStatusText}}</td>
        </tr>
        <tr>
          <td>退款申请时间</td>
          <td colspan="5">{{refund.applyTime | timeText}}</td>
        </tr>
        <tr>
          <td>订单号</td>
          <td colspan="5">{{refund.orderNo}}</td>
        </tr>
        <tr>
          <td>支付流水</td>
          <td colspan="5">{{refund.payNo}}</td>
        </tr>
        <tr>
          <td>总金额（元）</td>
          <td colspan="5">{{refund.totalPrice | decimal}}</td>
        </tr>
        <tr>
          <td>支付金额（元）</td>
          <td colspan="5">{{refund.payPrice | decimal}}</td>
        </tr>
        <tr v-if="refund.refundPrice">
          <td>退款金额（元）</td>
          <td colspan="5">{{refund.refundPrice | decimal}}</td>
        </tr>
        <tr v-if="refund.refundTime">
          <td>退款发起时间</td>
          <td colspan="5">{{refund.refundTime | timeText}}</td>
        </tr>
        <tr v-if="refund.successTime">
          <td>退款成功时间</td>
          <td colspan="5">{{refund.successTime | timeText}}</td>
        </tr>
        <tr v-if="refund.payRefundNo">
          <td>退款流水</td>
          <td colspan="5">{{refund.payRefundNo}}</td>
        </tr>
        <tr v-if="refund.state">
          <td>微信退款结果</td>
          <td colspan="5">{{refund.state}}</td>
        </tr>
        <tr>
          <td>反馈问题</td>
          <td colspan="5">{{refund.message}}</td>
        </tr>
        <tr>
          <td>反馈图片</td>
          <td colspan="5">
            <div class="inline-box">
              <MediaShow :src="refund.images" class="item-box" width="100" height="100" />
            </div>
          </td>
        </tr>
        <tr v-if="refund.reply">
          <td>退款回复</td>
          <td colspan="5">{{refund.reply}}</td>
        </tr>
      </table>
    </div>
  </ViewDrawer>
</template>
<script>

import { loadRefund } from '@/api/trade/refund'

export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: Boolean,
    refundId: Number
  },
  data () {
    return {
      refund: {}
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
      loadRefund(this.refundId).then(res => {
        const { refund } = res
        this.refund = refund
      })
    },
    close () {
      this.$emit('change', false)
    }
  }
}
</script>
