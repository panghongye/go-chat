import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree';
import { socket } from '../utils';
type Info = { name?: string; token?: string; id?: number };

const User = types
	.model({
		info: types.frozen({} as Info),
		groups: types.array(
			types.frozen({
				id: types.string,
				name: types.string,
				intro: types.string,
				fromUser: types.number,
				createTime: types.Date,
				msgs: types.array(
					types.frozen({
						id: types.number,
						fromUser: types.number,
						groupID: types.string,
						msg: types.string,
						time: types.Date,
						attachments: types.array
					})
				),
				members: types.array
			})
		)
	})
	.actions((self) => ({
		login(user: Info) {
			self.info = { ...self.info, ...user };
			localStorage.userInfo = JSON.stringify(self.info);
		},
		logout() {
			self.info = {};
			localStorage.clear();
			socket.socket?.close()
		},
		groupsSet(groups: any) {
			self.groups = groups;
		}
	}));

let info = { name: '' };
try {
	info = Object.assign(info, JSON.parse(localStorage.userInfo));
} catch (error) { }


const user = User.create({ info, groups: [] });
export default user;
export { User, user };


global.u = user
