const routes = [
  {
    path: '/home',
    component:resolve => require(['../pages/home.vue'], resolve),
    children: [
      {
        path: '/map_index',
        name: 'map_index',
        component: resolve => require(['../view/map/index.vue'], resolve)
      },
    ]
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: resolve => require(['../view/monitor/index.vue'], resolve)
  },
  {
    path: '/',
    name: 'login',
    component: resolve => require(['../pages/login.vue'], resolve)
  }
]
export default routes
