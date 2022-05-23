export const menuData = [
  {
    id: 1,
    parentId: 0,
    sort: 1,
    icon: 'system',
    name: '系统管理',
    spread: false,
    path: 'system',
    component: null,
    authority: null,
    redirect: null,
    keepAlive: '0',
    code: null,
    type: 'M',
    label: '系统管理',
    permission: '',
    children: [
      {
        id: 100,
        parentId: 1,
        sort: 1,
        children: null,
        icon: 'user',
        name: '用户管理',
        spread: false,
        path: '/ststem/account',
        component: 'system/account/Index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: 'user',
        type: 'C',
        label: '用户管理',
        permission: 'system:user:list'
      },
      {
        id: 101,
        parentId: 1,
        sort: 2,
        children: null,
        icon: 'peoples',
        name: '角色管理',
        spread: false,
        path: 'role',
        component: 'system/role/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '角色管理',
        permission: 'system:role:list'
      },
      {
        id: 102,
        parentId: 1,
        sort: 3,
        children: null,
        icon: 'tree-table',
        name: '菜单管理',
        spread: false,
        path: 'menu',
        component: 'system/menu/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '菜单管理',
        permission: 'system:menu:list'
      },
      {
        id: 103,
        parentId: 1,
        sort: 4,
        children: null,
        icon: 'tree',
        name: '部门管理',
        spread: false,
        path: 'dept',
        component: 'system/dept/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '部门管理',
        permission: 'system:dept:list'
      },
      {
        id: 104,
        parentId: 1,
        sort: 5,
        children: null,
        icon: 'post',
        name: '岗位管理',
        spread: false,
        path: 'post',
        component: 'system/post/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '岗位管理',
        permission: 'system:post:list'
      },
      {
        id: 105,
        parentId: 1,
        sort: 6,
        children: null,
        icon: 'dict',
        name: '字典管理',
        spread: false,
        path: 'dict',
        component: 'system/dict/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '字典管理',
        permission: 'system:dict:list'
      },
      {
        id: 106,
        parentId: 1,
        sort: 7,
        children: null,
        icon: 'edit',
        name: '参数设置',
        spread: false,
        path: 'config',
        component: 'system/config/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '参数设置',
        permission: 'system:config:list'
      },
      {
        id: 107,
        parentId: 1,
        sort: 9,
        children: null,
        icon: 'message',
        name: '通知公告',
        spread: false,
        path: 'notice',
        component: 'system/notice/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '通知公告',
        permission: 'system:notice:list'
      },
      {
        id: 108,
        parentId: 1,
        sort: 10,
        children: [
          {
            id: 500,
            parentId: 108,
            sort: 1,
            children: null,
            icon: 'form',
            name: '操作日志',
            spread: false,
            path: 'operlog',
            component: 'system/operlog/index',
            authority: null,
            redirect: null,
            keepAlive: '0',
            code: null,
            type: 'C',
            label: '操作日志',
            permission: 'system:operlog:list'
          },
          {
            id: 501,
            parentId: 108,
            sort: 2,
            children: null,
            icon: 'logininfor',
            name: '登录日志',
            spread: false,
            path: 'logininfor',
            component: 'system/logininfor/index',
            authority: null,
            redirect: null,
            keepAlive: '0',
            code: null,
            type: 'C',
            label: '登录日志',
            permission: 'system:logininfor:list'
          }
        ],
        icon: 'log',
        name: '日志管理',
        spread: false,
        path: 'log',
        component: '',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'M',
        label: '日志管理',
        permission: ''
      }
    ]
  },
  {
    id: 2,
    parentId: 0,
    sort: 2,
    children: [
      {
        id: 109,
        parentId: 2,
        sort: 1,
        children: null,
        icon: 'online',
        name: '在线用户',
        spread: false,
        path: 'online',
        component: 'monitor/online/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '在线用户',
        permission: 'monitor:online:list'
      },
      {
        id: 110,
        parentId: 2,
        sort: 2,
        children: null,
        icon: 'job',
        name: '定时任务',
        spread: false,
        path: 'job',
        component: 'monitor/job/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '定时任务',
        permission: 'monitor:job:list'
      },
      {
        id: 111,
        parentId: 2,
        sort: 3,
        children: null,
        icon: 'sentinel',
        name: 'Sentinel控制台',
        spread: false,
        path: 'http://localhost:8718',
        component: '',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: 'Sentinel控制台',
        permission: 'monitor:sentinel:list'
      },
      {
        id: 112,
        parentId: 2,
        sort: 4,
        children: null,
        icon: 'nacos',
        name: 'Nacos控制台',
        spread: false,
        path: 'http://localhost:8848/nacos',
        component: '',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: 'Nacos控制台',
        permission: 'monitor:nacos:list'
      },
      {
        id: 113,
        parentId: 2,
        sort: 5,
        children: null,
        icon: 'server',
        name: 'Admin控制台',
        spread: false,
        path: 'http://localhost:9100/login',
        component: '',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: 'Admin控制台',
        permission: 'monitor:server:list'
      }
    ],
    icon: 'monitor',
    name: '系统监控',
    spread: false,
    path: 'monitor',
    component: null,
    authority: null,
    redirect: null,
    keepAlive: '0',
    code: null,
    type: 'M',
    label: '系统监控',
    permission: ''
  },
  {
    id: 3,
    parentId: 0,
    sort: 3,
    children: [
      {
        id: 114,
        parentId: 3,
        sort: 1,
        children: null,
        icon: 'build',
        name: '表单构建',
        spread: false,
        path: 'build',
        component: 'tool/build/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '表单构建',
        permission: 'tool:build:list'
      },
      {
        id: 115,
        parentId: 3,
        sort: 2,
        children: null,
        icon: 'code',
        name: '代码生成',
        spread: false,
        path: 'gen',
        component: 'tool/gen/index',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '代码生成',
        permission: 'tool:gen:list'
      },
      {
        id: 116,
        parentId: 3,
        sort: 3,
        children: null,
        icon: 'swagger',
        name: '系统接口',
        spread: false,
        path: 'http://localhost:8080/swagger-ui.html',
        component: '',
        authority: null,
        redirect: null,
        keepAlive: '0',
        code: null,
        type: 'C',
        label: '系统接口',
        permission: 'tool:swagger:list'
      }
    ],
    icon: 'tool',
    name: '系统工具',
    spread: false,
    path: 'tool',
    component: null,
    authority: null,
    redirect: null,
    keepAlive: '0',
    code: null,
    type: 'M',
    label: '系统工具',
    permission: ''
  }
]
