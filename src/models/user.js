import { autorun } from 'mobx'
import { connectReduxDevtools } from 'mst-middlewares'
import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree'

const User = types
	.model({
		info: types.frozen({ name: types.string, token: types.string })
	})
	.actions((self) => ({
		set(user) {
			self.info = { ...self.info, ...user }
		}
	}))

export default User
export { User }
