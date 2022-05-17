<template>
  <div>
    <ViewPage ref="view-page" :group="group" :query-forms="queryForms" :columns="columns" :actions="actions" />
    <EditModal width="550" :title="'正在为 ' + shipData.orderNo + ' 发货'" :forms="shipForms" :edit-data="shipData" @ok="shipOk" v-model="showShip" />
    <OrderView v-model="showView" :order-id="orderId" />
  </div>
</template>
<script>

import { expresses } from '@/api/info/express'
import { queryOrder, shipOrder } from '@/api/trade/order'

import OrderView from './View'

export default {
  components: { OrderView },
  data () {
    const actions = [
      { type: 'success', name: '支付查询', click: (params) => this.query(params), checkDisabled: (params) => params.row.status !== 11 },
      { type: 'primary', name: '发货', click: (params) => this.ship(params), checkDisabled: (params) => params.row.status !== 20 },
      { type: 'info', name: '订单详情', click: (params) => this.view(params) }]
    const columns = [
      { title: '订单号', width: 150, key: 'orderNo' },
      { title: '收件人', width: 100, key: 'userName' },
      { title: '手机号码', key: 'phone' },
      { title: '数量', width: 80, key: 'totalAmount' },
      { title: '订单金额', width: 100, render: (h, params) => this.$ColumnDecimal(h, params.row.totalPrice) },
      { title: '下单时间', render: (h, params) => this.$ColumnTimeText(h, params.row.orderTime) },
      { title: '支付时间', render: (h, params) => this.$ColumnTimeText(h, params.row.payTime) },
      { title: '状态', width: 80, render: (h, params) => this.$ColumnOrderStatusText(h, params.row.status) }]
    return {
      group: 'ORDER',
      showShip: false,
      showView: false,
      orderId: null,
      shipData: {},
      queryForms: [{ title: '订单号', key: 'orderNo' }, { title: '手机号码', key: 'phone' }, { title: '订单状态', key: 'status', type: 'select', options: this.$OrderStatusDict }],
      shipForms: [],
      actions,
      columns
    }
  },
  created () {
    expresses().then(res => {
      const expressOptions = res.list.map(e => { return { value: e.id, label: e.name } })
      this.shipForms.push({ title: '快递公司', key: 'expressId', span: 2, type: 'select', options: expressOptions, required: true })
      this.shipForms.push({ title: '快递单号', key: 'expressNumber', span: 2, required: true })
    })
  },
  methods: {
    query (params) {
      queryOrder(params.row.id).then(() => {
        this.$Message.success('查询成功')
        this.$refs['view-page'].loadData()
      })
    },
    view (params) {
      this.orderId = params.row.id
      this.showView = true
    },
    ship (params) {
      this.shipData = {
        id: params.row.id,
        orderNo: params.row.orderNo
      }
      this.showShip = true
    },
    shipOk (fromData, callback, closeLoading) {
      const data = Object.assign({}, fromData)
      shipOrder(data).then(res => {
        callback()
        this.$Message.success('发货成功')
        this.$refs['view-page'].loadData()
      }).catch(() => { closeLoading() })
    }
  }
}
</script>
