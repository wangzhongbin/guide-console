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
import SelectPlace from '@/components/ui/SelectPlace'
import SelectClassify from '@/components/ui/SelectClassify'
import SelectLabel from '@/components/ui/SelectLabel'
import SelectPoint from '@/components/ui/SelectPoint'
import SelectProject from '@/components/ui/SelectProject'
import ViewItem from '@/components/ui/ViewItem'
import MapView from '@/components/ui/MapView'

import * as echarts from 'echarts'

Vue.use(ViewUI)

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
Vue.component('SelectPlace', SelectPlace)
Vue.component('SelectClassify', SelectClassify)
Vue.component('SelectLabel', SelectLabel)
Vue.component('SelectPoint', SelectPoint)
Vue.component('SelectProject', SelectProject)
Vue.component('ViewItem', ViewItem)
Vue.component('MapView', MapView)

Vue.config.productionTip = false

Vue.prototype.$TableColumns = getColumn
Vue.prototype.$FormatTime = FormatTime
Vue.prototype.$ShowImage = (uri) => {
  if (uri) {
    const domain = 'https://oss.test.langyuyun.com/'
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

const languageOptions = [
  { value: 1, label: '中文' },
  { value: 2, label: '英文' },
  { value: 3, label: '俄文' },
  { value: 4, label: '日文' },
  { value: 5, label: '韩文' }]

Vue.prototype.$LanguageOptions = languageOptions

Vue.prototype.$ColumnLanguageText = (h, val) => {
  const dict = languageOptions.find(e => e.value === val)
  return h('span', dict ? dict.label : '')
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

Vue.filter('showImage', (uri) => {
  if (uri) {
    const domain = 'https://oss.test.langyuyun.com/'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
