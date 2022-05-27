import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/router/permission'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import { getColumn } from './utils/table-columns'

import FormatTime from '@/utils/format-time'

import ViewDrawer from '@/components/ui/ViewDrawer'
import EditModal from '@/components/ui/EditModal'
import MediaUpload from '@/components/ui/MediaUpload'
import MediaShow from '@/components/ui/MediaShow'
import QueryForm from '@/components/ui/QueryForm'
import EditForm from '@/components/ui/EditForm'
import EditFormItem from '@/components/ui/EditFormItem'
import EditFormDivider from '@/components/ui/EditFormDivider'
import ViewPage from '@/components/ui/ViewPage'
import SelectTree from '@/components/ui/SelectTree'
import PlaceSelect from '@/components/ui/PlaceSelect'
import ViewItem from '@/components/ui/ViewItem'

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.component('ViewDrawer', ViewDrawer)
Vue.component('EditModal', EditModal)
Vue.component('MediaUpload', MediaUpload)
Vue.component('MediaShow', MediaShow)
Vue.component('QueryForm', QueryForm)
Vue.component('EditFrom', EditForm)
Vue.component('EditFormItem', EditFormItem)
Vue.component('EditFormDivider', EditFormDivider)
Vue.component('ViewPage', ViewPage)
Vue.component('SelectTree', SelectTree)
Vue.component('PlaceSelect', PlaceSelect)
Vue.component('ViewItem', ViewItem)

Vue.config.productionTip = false

Vue.prototype.$TableColumns = getColumn
Vue.prototype.$FormatTime = FormatTime
Vue.prototype.$ShowImage = (uri) => {
  if (uri) {
    const domain = 'https://oss.iqqqqq.com/'
    return domain + uri
  } else {
    return ''
  }
}

Vue.prototype.$Decimal = (val) => {
  let text = ''
  if (~~val >= 1) {
    const str = val.toString()
    const length = str.length
    if (length === 1) {
      text = '0.0' + str
    } else if (length === 2) {
      text = '0.' + str
    } else {
      text = str.substring(0, length - 2) + '.' + str.substring(length - 2)
    }
  } else {
    text = '0.00'
  }
  return text
}

Vue.prototype.$ColumnTimeText = (h, time) => {
  return h('span', FormatTime.timeText(time))
}

Vue.prototype.$ColumnDateText = (h, date) => {
  return h('span', FormatTime.yyyyMMddText(date))
}

Vue.prototype.$ColumnDaterangeText = (h, startDate, endDate) => {
  return h('span', FormatTime.yyyyMMddText(startDate) + '-' + FormatTime.yyyyMMddText(endDate))
}

Vue.prototype.$ColumnDictText = (h, val, dict) => {
  const data = dict.find(e => e.value === val)
  return h('span', data ? data.label : '')
}

Vue.prototype.$TimeText = (h, time) => {
  return FormatTime.timeText(time)
}

const orderStatusDict = [
  { value: 11, label: '待支付' },
  { value: 12, label: '已关闭' },
  { value: 20, label: '待发货' },
  { value: 21, label: '待收货' },
  { value: 80, label: '已完成' }]

const refundStatusDict = [
  { value: 1, label: '退款申请' },
  { value: 2, label: '退款发起' },
  { value: 9, label: '退款取消' },
  { value: 8, label: '已退款' }]

Vue.prototype.$OrderStatusDict = orderStatusDict
Vue.prototype.$RefundStatusDict = refundStatusDict

Vue.prototype.$ColumnOrderStatusText = (h, val) => {
  const dict = orderStatusDict.find(e => e.value === val)
  return h('span', dict.label)
}

Vue.prototype.$ColumnRefundStatusText = (h, val) => {
  const dict = refundStatusDict.find(e => e.value === val)
  return h('span', dict.label)
}

Vue.prototype.$ColumnDecimal = (h, val) => {
  let text = ''
  if (~~val >= 1) {
    const str = val.toString()
    const length = str.length
    if (length === 1) {
      text = '0.0' + str
    } else if (length === 2) {
      text = '0.' + str
    } else {
      text = str.substring(0, length - 2) + '.' + str.substring(length - 2)
    }
  } else {
    text = '0.00'
  }
  return h('span', text)
}

Vue.use(ViewUI)

Vue.filter('showImage', (uri) => {
  if (uri) {
    const domain = 'https://oss.iqqqqq.com/'
    return domain + uri
  } else {
    return ''
  }
})

Vue.filter('dictText', (val, dict) => {
  if (dict) {
    const data = dict.find(e => e.value === val)
    return data ? data.label : ''
  } else {
    return ''
  }
})

Vue.filter('timeText', (val) => {
  if (val) {
    return FormatTime.timeText(val)
  } else {
    return ''
  }
})

Vue.filter('decimal', (val) => {
  let text = ''
  if (~~val >= 1) {
    const str = val.toString()
    const length = str.length
    if (length === 1) {
      text = '0.0' + str
    } else if (length === 2) {
      text = '0.' + str
    } else {
      text = str.substring(0, length - 2) + '.' + str.substring(length - 2)
    }
  } else {
    text = '0.00'
  }
  return text
})

Vue.filter('orderStatusText', (val) => {
  if (val) {
    const dict = orderStatusDict.find(e => e.value === val)
    return dict ? dict.label : ''
  } else {
    return ''
  }
})

Vue.filter('refundStatusText', (val) => {
  if (val) {
    const dict = refundStatusDict.find(e => e.value === val)
    return dict ? dict.label : ''
  } else {
    return ''
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
