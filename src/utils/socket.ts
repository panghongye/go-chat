import io from 'socket.io-client';
import { user } from '../models/index';
import { Toast, Modal } from 'antd-mobile';
import { scrollToBottom } from '@/utils'

class Socket {
	socket: SocketIOClient.Socket | undefined;

	init = () => {
		if (!user.info.token || this.socket?.connected) return
		const socket = this.socket = io('127.0.0.1:3000', {
			query: { token: user.info.token }
		});
		socket.on('connect', () => {
			socket.on('reconnect_attempt', (attempt: number) => {
				console.log('reconnect_attempt', attempt);
				return
				if (attempt >= 10) {
					socket?.disconnect();
					user.logout();
					Modal.alert('登录过期，请重新登录', '', [
						{
							text: 'OK',
							onPress: user.logout
						}
					]);
				}
			});

			socket.on('reconnect_error', (err: Error) => {
				console.log('reconnect_error', err);
			});

			socket.on('getGroupMsg', (res: any) => {
				const { data = {} } = res;
				const groups = JSON.parse(JSON.stringify(user.groups))
				for (let i = 0; i < groups.length; i++) {
					const group = groups[i] as any;
					if (group.id == data.groupID) {
						group.msgs.push(data);
						groups[i] = group
						break;
					}
				}
				user.groupsSet(groups);
				setTimeout(scrollToBottom, 1000)
			});

			this.getAll()

		});
		return socket;
	};

	getAll = () => {
		return this.emitAsync('init', { token: user.info.token }).then((r: any) => {
			user.groupsSet(r.data.groups);
		});
	}



	emitAsync = async (event: string, data: any) => {
		const socket = this.socket
		data.token = user.info.token;
		console.info('【ws ' + event + '】>>', data);
		return new Promise((resolve, reject) => {
			try {
				socket?.emit(event, data, (res: any) => {
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
global.so = socket;
export default socket;
export { socket };
