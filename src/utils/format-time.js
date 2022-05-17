
import dayjs from 'dayjs'

const isBefore = (val, end) => {
  return dayjs(val).isBefore(dayjs(end))
}

const isSame = (val, end) => {
  return dayjs(val).isSame(dayjs(end))
}
const isSameBefore = (val, end) => {
  return isSame(val, end) || isBefore(val, end)
}

const add = (val, day) => {
  if (day) {
    return dayjs(val).add(day, 'day').format('YYYY/MM/DD')
  }
  return dayjs(val).add(1, 'day').format('YYYY/MM/DD')
}

const yyyyMMdd = (val, rep) => {
  rep = rep || '/'
  const arr = dateArray(val)
  if (arr) {
    return arr.join(rep)
  } else {
    return val
  }
}

const yyyyMMddText = (val) => {
  const arr = dateArray(val)
  if (arr) {
    return arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
  } else {
    return val
  }
}

const yyyyMMText = (val) => {
  const arr = dateArray(val)
  if (arr) {
    return arr[0] + '年' + arr[1] + '月'
  } else {
    return val
  }
}

const yyyyText = (val) => {
  const arr = dateArray(val)
  if (arr) {
    return arr[0] + '年'
  } else {
    return val
  }
}

const timeText = (val) => {
  const arr = timeArray(val)
  if (arr) {
    return arr[0] + '年' + arr[1] + '月' + arr[2] + '日' + ' ' + arr[3] + ':' + arr[4]
  } else {
    return val
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const dateArray = val => {
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/')
  }
  const time = new Date(val)
  if (time.getTime()) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    return [year, month, day].map(formatNumber)
  } else {
    return null
  }
}

const timeArray = val => {
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/')
  }
  const time = new Date(val)
  if (time.getTime()) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const day = time.getDate()
    const hours = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()
    return [year, month, day, hours, minute, second].map(formatNumber)
  } else {
    return null
  }
}

const weekText = val => {
  const weeks = ['日', '一', '二', '三', '四', '五', '六']
  const time = new Date(val)
  if (time.getTime()) {
    const day = time.getDay()
    return weeks[day]
  }
  return time
}

const week = val => {
  const time = new Date(val)
  if (time.getTime()) {
    return time.getDay()
  }
  return time
}

export default {
  yyyyMMdd,
  yyyyMMddText,
  yyyyMMText,
  yyyyText,
  timeText,
  weekText,
  week,
  add,
  isBefore,
  isSame,
  isSameBefore
}
