import { autorun } from 'mobx'
import { connectReduxDevtools } from 'mst-middlewares'
import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree'
import User from './user'

const Store = types
	.model({
		user: User
	})
	.actions((self) => ({}))

const store = Store.create(User.create({}))
connectReduxDevtools(require('remotedev').default, store)

autorun(() => {
	localStorage.setItem('user', JSON.stringify(store.user))
	console.log(store.user, 'auto')
})

onSnapshot(store, (snapshot) => {
	console.log('onSnapshot', snapshot)
})

export default store
export { store }
