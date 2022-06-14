export const menuData = [{
  id: 1,
  parentId: 0,
  sort: 1,
  icon: 'sys',
  name: '系统管理',
  children: [{
    id: 100,
    parentId: 1,
    sort: 1,
    icon: 'user',
    name: '用户管理',
    path: '/sys/account',
    component: 'sys/account/Index',
    code: 'sysUser',
    label: '用户管理'
  }, {
    id: 101,
    parentId: 1,
    sort: 2,
    icon: 'peoples',
    name: '角色管理',
    path: '/sys/role',
    component: 'sys/role/Index',
    code: 'sysRole',
    label: '角色管理'
  }, {
    id: 102,
    parentId: 1,
    sort: 3,
    children: null,
    icon: 'tree-table',
    name: '菜单管理',
    path: '/sys/menu',
    component: 'sys/menu/Index',
    code: 'sysMenu',
    label: '菜单管理'
  }]
}, {
  id: 2,
  parentId: 0,
  sort: 2,
  icon: 'trade',
  name: '业务管理',
  children: [{
    id: 200,
    parentId: 2,
    sort: 1,
    icon: 'user',
    name: '租户管理',
    path: '/sys/tenant',
    component: 'sys/tenant/Index',
    code: 'sysTenant',
    label: '租户管理'
  }, {
    id: 201,
    parentId: 2,
    sort: 2,
    icon: 'user',
    name: '项目管理',
    path: '/trade/project',
    component: 'trade/project/Index',
    code: 'tradeProject',
    label: '项目管理'
  }, {
    id: 202,
    parentId: 2,
    sort: 3,
    icon: 'user',
    name: '点位管理',
    path: '/trade/point',
    component: 'trade/point/Index',
    code: 'tradePoint',
    label: '点位管理'
  }, {
    id: 203,
    parentId: 2,
    sort: 4,
    icon: 'user',
    name: '线路管理',
    path: '/trade/line',
    component: 'trade/line/Index',
    code: 'tradeLine',
    label: '线路管理'
  }, {
    id: 204,
    parentId: 2,
    sort: 5,
    icon: 'user',
    name: '分类管理',
    path: '/trade/classify',
    component: 'trade/classify/Index',
    code: 'tradeClassify',
    label: '分类管理'
  }, {
    id: 205,
    parentId: 2,
    sort: 6,
    icon: 'user',
    name: '标签管理',
    path: '/trade/label',
    component: 'trade/label/Index',
    code: 'tradeLabel',
    label: '标签管理'
  }]
}]

// export const menuData = [{
//   menuId: 1,
//   menuName: '系统管理',
//   orderNum: 1,
//   icon: 'system',
//   menuType: 'M',
//   children: [
//     {
//       menuId: 100,
//       menuName: '用户管理',
//       orderNum: 1,
//       path: 'user',
//       component: 'system/user/index',
//       icon: 'user',
//       menuType: 'C',
//       children: []
//     },
//     {
//       menuId: 101,
//       menuName: '角色管理',
//       orderNum: 2,
//       path: 'role',
//       component: 'system/role/index',
//       icon: 'peoples',
//       menuType: 'C',
//       children: []
//     },
//     {
//       menuId: 2001,
//       menuName: '租户管理',
//       orderNum: 1,
//       path: '/zuhu',
//       component: '/zuhu',
//       icon: 'people',
//       menuType: 'C',
//       children: []
//     }
//   ]
// },
// {
//   menuId: 2000,
//   menuName: '导览业务',
//   orderNum: 1,
//   icon: 'clipboard',
//   menuType: 'M',
//   children: [
//     {
//       menuId: 2007,
//       menuName: ' 导览分类管理',
//       orderNum: 1,
//       path: '/list',
//       icon: 'nested',
//       menuType: 'C',
//       children: []
//     },
//     {
//       menuId: 2013,
//       menuName: '导览标签管理',
//       orderNum: 2,
//       path: '/biaoq',
//       icon: 'guide',
//       menuType: 'C',
//       children: []
//     },
//     {
//       menuId: 2018,
//       menuName: '项目管理',
//       orderNum: 3,
//       path: '/peoject',
//       icon: 'table',
//       menuType: 'M',
//       children: [
//         {
//           menuId: 2019,
//           menuName: '项目列表',
//           orderNum: 1,
//           path: '/list',
//           icon: 'number',
//           menuType: 'C',
//           children: []
//         },
//         {
//           menuId: 2026,
//           menuName: '目标点位',
//           orderNum: 2,
//           path: '/target',
//           icon: 'icon',
//           menuType: 'C',
//           children: []
//         }
//       ]
//     },
//     {
//       menuId: 2032,
//       menuName: '游览线路',
//       orderNum: 4,
//       path: '/11111',
//       icon: 'druid',
//       menuType: 'C',
//       children: []
//     }
//   ]
// }]
