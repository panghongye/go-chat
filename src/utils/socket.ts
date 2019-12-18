import io from 'socket.io-client';
import { Toast, Modal } from 'antd-mobile';

class Socket {
  socket: SocketIOClient.Socket | undefined;

  get user() {
    return global.g_app._store.getState().user;
  }

  get dispatch() {
    return global.g_app._store.dispatch;
  }

  connect = () => {
    const socket = io('127.0.0.1:3000', {
      query: { token: this.user.token },
    });
    this.socket = socket;
    this.init();
    return socket;
  };

  init = () => {
    const socket = this.socket || this.connect();
    socket.on('reconnect_error', (err: Error) => {
      console.log('reconnect_error', err);
    });

    socket.on('reconnect_attempt', (attempt: number) => {
      console.log('reconnect_attempt', attempt);
      if (attempt >= 4) {
        socket.disconnect();
        return this.dispatch({ type: 'user/logout' });
        Modal.alert('登录过期，请重新登录', '', [
          {
            text: 'OK',
            onPress: () => this.dispatch({ type: 'user/logout' }),
          },
        ]);
      }
    });

    socket.on('error', (...arg: any) => {
      console.error(arg);
    });

    this.emitAsync('init', { token: this.user.token }).then(r => {
      //todo 返回聊天列表
    });
  };

  emitAsync = async (event: string, data: any) => {
    const socket = this.socket || this.connect();
    data.token = this.user.token;
    console.info('【ws ' + event + '】>>', data);
    return new Promise((resolve, reject) => {
      try {
        socket.emit(event, data, (res: any) => {
          resolve(res);
          if (res && res.msg) {
            Toast.info(res.msg);
          }
          console.info('【ws ' + event + '】<<', res);
        });
      } catch (error) {
        Toast.info(error);
        console.info('【ws ' + event + 'err】>>', error);
        reject(error);
      }
    });
  };
}

const socket = new Socket();
export default socket;
export { socket };
