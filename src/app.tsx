/* eslint-disable */

import { user } from './models';
import { socket } from './utils';
import router from 'umi/router';

// export function rootContainer(container) {
//   return container;
// }

// 修改路由执行一次
// export function patchRoutes(routes) {
// console.info(':patchRoutes', routes);
// }

export function onRouteChange(rou: any) {
  // console.info(':onRouteChange', rou);
  const { location, routes, action } = rou;
  const { pathname } = location;
  if (!user.info.token) {
    socket.socket?.close()
    if (pathname != '/login') {
      router.replace('/login');
      return;
    }
  }


  if (!socket.socket || !socket.socket.connected) socket.init();
}

// 修改路由props
// export function modifyRouteProps(props, { route }) {
// 	return props;
// }
