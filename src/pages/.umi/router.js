import React from "react";
import { Router as DefaultRouter, Route, Switch } from "react-router-dom";
import dynamic from "umi/dynamic";
import renderRoutes from "umi/lib/renderRoutes";
import history from "@tmp/history";
import RendererWrapper0 from "/Users/lanc/Temp/antdtest/test/src/pages/.umi/LocaleWrapper.jsx";
import _dvaDynamic from "dva/dynamic";

const Router = require("dva/router").routerRedux.ConnectedRouter;

const routes = [
  {
    path: "/user",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__UserLayout" */ "../../layouts/UserLayout"
            ),
          LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/UserLayout").default,
    routes: [
      {
        path: "/user/user",
        redirect: "/user/login",
        exact: true
      },
      {
        name: "login",
        path: "/user/login",
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require("@tmp/dva").getApp(),
              models: () => [
                import(
                  /* webpackChunkName: 'p__user__login__model.ts' */ "/Users/lanc/Temp/antdtest/test/src/pages/user/login/model.ts"
                ).then(m => {
                  return { namespace: "model", ...m.default };
                })
              ],
              component: () =>
                import(
                  /* webpackChunkName: "p__user__login" */ "../user/login"
                ),
              LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
                .default
            })
          : require("../user/login").default,
        exact: true
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ "../404"),
              LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
                .default
            })
          : require("../404").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/lanc/Temp/antdtest/test/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    path: "/",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__BasicLayout" */ "../../layouts/BasicLayout"
            ),
          LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/BasicLayout").default,
    Routes: [require("../Authorized").default],
    authority: ["admin", "user"],
    routes: [
      {
        path: "/",
        redirect: "/dashboard/workplace",
        authority: ["admin", "user"],
        exact: true
      },
      {
        path: "/dashboard",
        name: "dashboard",
        icon: "dashboard",
        routes: [
          {
            path: "/dashboard/workplace",
            name: "workplace",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require("@tmp/dva").getApp(),
                  models: () => [
                    import(
                      /* webpackChunkName: 'p__dashboard__workplace__model.ts' */ "/Users/lanc/Temp/antdtest/test/src/pages/dashboard/workplace/model.ts"
                    ).then(m => {
                      return { namespace: "model", ...m.default };
                    })
                  ],
                  component: () =>
                    import(
                      /* webpackChunkName: "p__dashboard__workplace" */ "../dashboard/workplace"
                    ),
                  LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
                    .default
                })
              : require("../dashboard/workplace").default,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/lanc/Temp/antdtest/test/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        icon: "form",
        routes: [
          {
            path: "/form/fixup",
            name: "fixup-form",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require("@tmp/dva").getApp(),
                  models: () => [
                    import(
                      /* webpackChunkName: 'p__form__fixup__model.ts' */ "/Users/lanc/Temp/antdtest/test/src/pages/form/fixup/model.ts"
                    ).then(m => {
                      return { namespace: "model", ...m.default };
                    })
                  ],
                  component: () =>
                    import(
                      /* webpackChunkName: "p__form__fixup" */ "../form/fixup"
                    ),
                  LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
                    .default
                })
              : require("../form/fixup").default,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/lanc/Temp/antdtest/test/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        path: "/query",
        name: "query",
        icon: "search",
        routes: [
          {
            path: "/query/fixup",
            name: "fixup-query",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require("@tmp/dva").getApp(),
                  models: () => [
                    import(
                      /* webpackChunkName: 'p__query__fixup__model.ts' */ "/Users/lanc/Temp/antdtest/test/src/pages/query/fixup/model.ts"
                    ).then(m => {
                      return { namespace: "model", ...m.default };
                    })
                  ],
                  component: () =>
                    import(
                      /* webpackChunkName: "p__query__fixup" */ "../query/fixup"
                    ),
                  LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
                    .default
                })
              : require("../query/fixup").default,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/lanc/Temp/antdtest/test/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        path: "/details",
        hideInMenu: true,
        name: "details",
        icon: "profile",
        routes: [
          {
            path: "/details/fixup/:id",
            name: "fixup-details",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require("@tmp/dva").getApp(),
                  models: () => [
                    import(
                      /* webpackChunkName: 'p__details__fixup__model.ts' */ "/Users/lanc/Temp/antdtest/test/src/pages/details/fixup/model.ts"
                    ).then(m => {
                      return { namespace: "model", ...m.default };
                    })
                  ],
                  component: () =>
                    import(
                      /* webpackChunkName: "p__details__fixup" */ "../details/fixup"
                    ),
                  LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
                    .default
                })
              : require("../details/fixup").default,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/lanc/Temp/antdtest/test/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ "../404"),
              LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
                .default
            })
          : require("../404").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/lanc/Temp/antdtest/test/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ "../404"),
          LoadingComponent: require("/Users/lanc/Temp/antdtest/test/src/components/PageLoading/index")
            .default
        })
      : require("../404").default,
    exact: true
  },
  {
    component: () =>
      React.createElement(
        require("/Users/lanc/Temp/antdtest/test/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
          .default,
        { pagesPath: "src/pages", hasRoutesInConfig: true }
      )
  }
];
window.g_routes = routes;
const plugins = require("umi/_runtimePlugin");
plugins.applyForEach("patchRoutes", { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach("onRouteChange", {
    initialValue: {
      routes,
      location,
      action
    }
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
    <RendererWrapper0>
      <Router history={history}>{renderRoutes(routes, props)}</Router>
    </RendererWrapper0>
  );
}
