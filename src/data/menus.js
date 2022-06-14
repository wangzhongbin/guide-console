
export const menuData = {
  data: [
    {
      menuId: 1,
      menuName: '系统管理',
      orderNum: 1,
      icon: 'system',
      menuType: 'M',
      children: [
        {
          menuId: 100,
          menuName: '用户管理',
          orderNum: 1,
          path: '/sys/account',
          component: 'sys/account/Index',
          icon: 'user',
          menuType: 'C',
          children: []
        },
        {
          menuId: 2001,
          menuName: '租户管理',
          orderNum: 1,
          path: '/sys/tenant',
          component: 'sys/tenant/Index',
          icon: 'people',
          menuType: 'C',
          children: []
        },
        {
          menuId: 101,
          menuName: '角色管理',
          orderNum: 2,
          path: '/sys/role',
          component: 'sys/role/Index',
          icon: 'peoples',
          menuType: 'C',
          children: []
        }
      ]
    },
    {
      menuId: 2000,
      menuName: '导览业务',
      orderNum: 1,
      icon: 'clipboard',
      menuType: 'M',
      children: [
        {
          menuId: 2007,
          menuName: ' 导览分类管理',
          orderNum: 1,
          path: '/trade/classify',
          component: 'trade/classify/Index',
          menuType: 'C',
          children: []
        },
        {
          menuId: 2013,
          menuName: '导览标签管理',
          orderNum: 2,
          path: '/trade/label',
          component: 'trade/label/Index',
          icon: 'guide',
          menuType: 'C',
          children: []
        },
        {
          menuId: 2018,
          menuName: '项目管理',
          orderNum: 3,
          menuType: 'M',
          children: [
            {
              menuId: 2019,
              menuName: '项目列表',
              orderNum: 1,
              path: '/trade/project',
              component: 'trade/project/Index',
              icon: 'number',
              menuType: 'C',
              children: []
            },
            {
              menuId: 2026,
              menuName: '目标点位',
              orderNum: 2,
              path: '/trade/point',
              component: 'trade/point/Index',
              icon: 'icon',
              menuType: 'C',
              children: []
            }
          ]
        },
        {
          menuId: 2032,
          menuName: '游览线路',
          orderNum: 4,
          path: '/trade/line',
          component: 'trade/line/Index',
          icon: 'druid',
          menuType: 'C',
          children: []
        }
      ]
    }
  ]
}
