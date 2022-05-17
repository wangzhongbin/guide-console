import { REFRESH_COUNT } from './constants'

export default {
  [REFRESH_COUNT] (state, count) {
    state.leaseTaskCount = count.leaseTaskCount
    state.leaseSignCount = count.leaseSignCount
    state.borrowTaskCount = count.borrowTaskCount
    state.borrowSignCount = count.borrowSignCount
  }
}
