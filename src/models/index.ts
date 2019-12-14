import { autorun } from 'mobx'
import { connectReduxDevtools } from 'mst-middlewares'
import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree'
import user from './user'

// 外部创建或初始该模型时调用
function InitModelData() {
	return { user: u1() }
}

const Store = types.model({
	user: user.Model
})

const store = Store.create({ user: user.InitModelData() })
connectReduxDevtools(require('remotedev').default, store) // 连接 Chrome Redux DevTool

onSnapshot(store, (snapshot) => {
	console.log('onSnapshot', snapshot)
})

export default store
export { store }
