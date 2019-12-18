import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree';

type Info = { name?: string; token?: string; id?: number };

const User = types
  .model({
    info: types.frozen({} as Info),
  })
  .actions(self => ({
    login(user: Info) {
      self.info = { ...self.info, ...user };
      localStorage.userInfo = JSON.stringify(self.info);
    },
    logout() {
      self.info = {};
      localStorage.clear();
    },
  }));

let info = { name: '' };
try {
  info = Object.assign(info, JSON.parse(localStorage.userInfo));
} catch (error) {}

const user = User.create({ info });
export default user;
export { User, user };
