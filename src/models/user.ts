import { getSnapshot, destroy, onSnapshot, types } from 'mobx-state-tree'

// 外部创建或初始该模型时调用
function InitModelData() {
	try {
		return { info: JSON.parse(localStorage.userInfo) }
	} catch (error) {
		return { info: {} }
	}
}

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

export default { Model, InitModelData }
