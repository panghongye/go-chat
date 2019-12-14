import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree'

type Info = { name?: string; token?: string; id?: number }

const Model = types
	.model({
		info: types.frozen({} as Info)
	})
	.actions((self) => ({
		login(user: Info) {
			self.info = { ...self.info, ...user }
			localStorage.userInfo = JSON.stringify(self.info)
		},
		logout() {
			self.info = {}
			localStorage.clear()
		}
	}))

let info = { name: '11' }
try {
	info = Object.assign(info, JSON.parse(localStorage.userInfo))
} catch (error) {}
const user = Model.create({ info })

export default user
export { Model as User, user }
