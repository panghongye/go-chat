import { user } from './models';
import { socket } from './utils';

export function rootContainer(container: JSX.Element) {
  if (user.info.token) {
    if (!socket.socket || !socket.socket.connected) socket.connect();
  }
  return container
}
