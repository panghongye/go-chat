import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree'

let model: any //实例对象
const Model = types
	.model({
		info: types.frozen({})
	})
	.actions((self) => ({
		login(user: any) {
			self.info = { ...self.info, ...user }
			localStorage.userInfo = JSON.stringify(self.info)
		},
		logout() {
			self.info = {}
			localStorage.clear()
		}
	}))

// 单例
function modelGet() {
	if (model) return model
	let info = {}
	try {
		info = Object.assign(info, JSON.parse(localStorage.userInfo))
	} catch (error) {}
	model = Model.create({ info })
	return model
}

export default { Model, modelGet }
