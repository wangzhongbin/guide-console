<template>
  <div>
    <ViewPage ref="view-page" :group="group" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" :title="'订单号：' + startData.orderNo + ' 退款处理'" :forms="startForms" :edit-data="startData" @ok="startOk" v-model="showStart" />
    <refundView v-model="showView" :refund-id="refundId" />
  </div>
</template>
<script>

import { startRefund, queryRefund } from '@/api/trade/refund'

import refundView from './View'

export default {
  components: { refundView },
  data () {
    const actions = [
      { type: 'primary', name: '退款处理', click: (params) => this.start(params), checkDisabled: (params) => params.row.status !== 1 },
      { type: 'success', name: '退款查询', click: (params) => this.query(params), checkDisabled: (params) => params.row.status !== 2 },
      { type: 'info', name: '订单详情', click: (params) => this.view(params) }]
    const columns = [
      { title: '退款订单号', key: 'refundNo' },
      { title: '订单号', key: 'orderNo' },
      { title: '订单金额', width: 100, render: (h, params) => this.$ColumnDecimal(h, params.row.totalPrice) },
      { title: '支付金额', width: 100, render: (h, params) => this.$ColumnDecimal(h, params.row.payPrice) },
      { title: '退款金额', width: 100, render: (h, params) => this.$ColumnDecimal(h, params.row.refundPrice) },
      { title: '申请时间', render: (h, params) => this.$ColumnTimeText(h, params.row.applyTime) },
      { title: '状态', width: 100, render: (h, params) => this.$ColumnRefundStatusText(h, params.row.status) }]
    return {
      group: 'REFUND',
      showStart: false,
      showView: false,
      refundId: null,
      startData: {},
      startForms: [],
      queryForms: [{ title: '退款订单号', key: 'refundNo' }, { title: '订单号', key: 'orderNo' }, { title: '退款状态', key: 'status', type: 'select', options: this.$RefundStatusDict }],
      actions,
      columns
    }
  },
  created () {
    const showPrice = (data) => data.opType === 1
    const priceRule = { requiredFun: (data) => data.opType === 1, message: '' }
    const showReply = (data) => data.opType === 2
    const replyRule = { requiredFun: (data) => data.opType === 2, message: '' }
    this.startForms = [
      { title: '反馈问题', key: 'message', span: 2, type: 'read' },
      { title: '反馈图片', key: 'images', span: 2, type: 'image' },
      { title: '操作类型', key: 'opType', span: 2, type: 'radio', options: [{ value: 1, label: '退款' }, { value: 2, label: '驳回' }], required: true },
      { title: '退款金额', key: 'price', span: 2, show: showPrice, rule: priceRule },
      { title: '驳回说明', key: 'reply', type: 'textarea', span: 2, show: showReply, rule: replyRule }]
  },
  methods: {
    query (params) {
      queryRefund(params.row.id).then(() => {
        this.$Message.success('查询成功')
        this.$refs['view-page'].loadData()
      })
    },
    start (params) {
      this.startData = {
        id: params.row.id,
        opType: 1,
        orderId: params.row.orderId,
        orderNo: params.row.orderNo,
        message: params.row.message,
        images: params.row.images
      }
      this.showStart = true
    },
    view (params) {
      this.refundId = params.row.id
      this.showView = true
    },
    startOk (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      if (data.price) {
        data.price = Math.round(data.price * 100)
      }
      startRefund(data).then(res => {
        callback()
        this.$Message.success('退款发起成功')
        this.$refs['view-page'].loadData()
      }).catch(() => { closeLoading() })
    }
  }
}
</script>
