import { autorun } from "mobx";
import { connectReduxDevtools } from "mst-middlewares";
import { getSnapshot, destroy, onSnapshot, types } from "mobx-state-tree";
import { User, user } from "./user";

const Store = types.model({
  // user: types.maybe(user.Model)
  user: User
});

// const store = Store.create({ user: { ...user.modelGet() } })
const store = Store.create({ user });

connectReduxDevtools(require("remotedev").default, store); // 连接 Chrome Redux DevTool
onSnapshot(store, snapshot => {
  console.log("onSnapshot", snapshot);
});

export default store;
export { store, user };
