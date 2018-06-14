import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
); // 创建redux-helpers中间件
const addListener = createReduxBoundAddListener("root"); // 创建路由action的监听,主要解决以前的快速点击多次跳转问题

export {
  middleware,
  addListener,
};
