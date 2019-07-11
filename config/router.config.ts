export default [
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      {
        path: "user",
        redirect: "/user/login"
      },
      {
        name: "login",
        path: "/user/login",
        component: "./user/login"
      },
      {
        component: "404"
      }
    ]
  },
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    authority: ["admin", "user"],
    routes: [
      // TODO: change to login
      {
        path: "/",
        redirect: "/dashboard/workplace",
        // redirect: '/user',
        authority: ["admin", "user"]
      }, // default page
      {
        path: "/dashboard",
        name: "dashboard",
        icon: "dashboard",
        routes: [
          {
            path: "/dashboard/workplace",
            name: "workplace",
            component: "./dashboard/workplace"
          }
        ]
      }, // dashboard
      {
        path: "/form",
        name: "form",
        icon: "form",
        routes: [
          {
            path: "/form/fixup",
            name: "fixup-form",
            component: "./form/fixup"
          }
        ]
      }, // form
      {
        path: "/query",
        name: "query",
        icon: "search",
        routes: [
          {
            path: "/query/fixup",
            name: "fixup-query",
            component: "./query/fixup"
          }
        ]
      }, //query
      {
        path: "/details",
        hideInMenu: true,
        name: "details",
        icon: "profile",
        routes: [
          {
            path: "/details/fixup/:id",
            name: "fixup-details",
            component: "./details/fixup"
          },
          {
            component: "./404"
          }
        ]
      }, // details
      {
        component: "./404"
      }
    ]
  },
  {
    component: "./404"
  }
];
