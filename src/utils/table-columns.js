/**
 * 返回一个table的columns
 */

import { getActionColumn } from './table-action'

export const getColumn = (columns = [], actions = []) => {
  columns.unshift({
    type: 'index',
    width: 55,
    align: 'center'
  })
  columns = columns.map(e => {
    e.align = e.align ? e.align : 'center'
    return e
  })
  const actionColumn = getActionColumn(actions)
  if (actions.length > 0) {
    columns.push(actionColumn)
  }
  return columns
}
