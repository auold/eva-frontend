export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: 'user',
        redirect: '/user/login',
      },
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // TODO: change to login
      {
        path: '/',
        redirect: '/dashboard',
      }, // default page
      {
        path: 'dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './dashboard/workplace',
      }, // dashboard
      {
        path: 'fixup',
        name: 'fixup',
        icon: 'tool',
        routes: [
          {
            path: 'new',
            name: 'fixup-new',
            icon: "form",
            component: './fixup/new',
          },
          {
            path: 'list',
            name: 'fixup-list',
            icon: "search",
            component: './fixup/list',
          },
          {
            path: './details/:id',
            name: 'fixup-details',
            component: './fixup/details',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      }, // fixup
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
