
/**
 * table 操作列按钮定义
 */
// 查看
const BUTTON_VIEW = 'view'
// 修改
const BUTTON_UPDATE = 'update'
// 删除
const BUTTON_REMOVE = 'remove'

const buttonName = { view: '查看', update: '修改', remove: '删除' }
const buttonType = { view: 'info', update: 'primary', remove: 'error' }

export const TABLE_ACTION_VIEW = BUTTON_VIEW
export const TABLE_ACTION_UPDATE = BUTTON_UPDATE
export const TABLE_ACTION_REMOVE = BUTTON_REMOVE

export const getActionColumn = (actions) => {
  let width = 0
  actions.forEach(a => {
    const name = a.name ? a.name : buttonName[a.button]
    if (name) { width += name.length * 12 + 26 }
  })
  width = width > 40 ? width + 40 : 80
  return {
    title: '操作',
    slot: 'action',
    width: width,
    align: 'center',
    render: (h, params) => {
      const actionRender = []
      actions.forEach(action => {
        actionRender.push(getActionRender(action, h, params))
      })
      return h('div', actionRender)
    }
  }
}

const getActionRender = (action, h, params) => {
  if (action.button === BUTTON_REMOVE) {
    action.poptip = { title: '确定进行删除操作？' }
  }
  action.type = action.type ? action.type : buttonType[action.button]
  action.name = action.name ? action.name : buttonName[action.button]
  action.poptip = action.poptip ? action.poptip : false
  action.disabled = action.checkDisabled ? action.checkDisabled(params) : false
  if (action.poptip) {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '确定进行' + action.name + '操作？',
        transfer: true
      },
      on: {
        'on-ok': () => {
          action.click(params, action.button)
        }
      }
    }, [h('Button', {
      props: {
        type: action.type,
        size: 'small',
        disabled: action.disabled
      },
      style: {
        marginRight: '5px',
        fontSize: '12px'
      }
    }, action.name)])
  } else {
    return h('Button', {
      props: {
        type: action.type,
        size: 'small',
        disabled: action.disabled
      },
      style: {
        marginRight: '5px',
        fontSize: '12px'
      },
      on: {
        click: () => {
          action.click(params, action.button)
        }
      }
    }, action.name)
  }
}
