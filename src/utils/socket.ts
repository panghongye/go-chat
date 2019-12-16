import io from 'socket.io-client';
import { user } from '../models_/index';
import { Toast, Modal } from 'antd-mobile';

class Socket {
  socket: SocketIOClient.Socket | undefined;

  connect = () => {
    const socket = io('127.0.0.1:3000', {
      query: { token: user.info.token },
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
        return user.logout();
        Modal.alert('登录过期，请重新登录', '', [
          {
            text: 'OK',
            onPress: user.logout,
          },
        ]);
      }
    });

    socket.on('error', (...arg: any) => {
      console.error(arg);
    });

    this.emitAsync('init', { token: user.info.token }, (...arg: any) => {
      //todo 返回聊天列表
    });
  };

  emitAsync = async (event: string, data: any, ...args: any[]) => {
    const socket = this.socket || this.connect();
    data.token = user.info.token;
    console.info('【ws ' + event + '】>>', data);
    return new Promise((resolve, reject) => {
      try {
        socket.emit(event, data, (res: any) => {
          resolve(res);
          if (res.msg) {
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
