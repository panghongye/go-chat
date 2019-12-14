import { autorun } from 'mobx'
import { connectReduxDevtools } from 'mst-middlewares'
import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree'
import user from './user'

const Store = types.model({
	user: user.Model
})

const store = Store.create({ user: user.modelGet() })

connectReduxDevtools(require('remotedev').default, store) // 连接 Chrome Redux DevTool

onSnapshot(store, (snapshot) => {
	console.log('onSnapshot', snapshot)
})

export default store
export { store }
