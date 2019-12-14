export default {
	namespace: 'user',
	state: { name: 'xx' },
	reducers: {
		login(state, user) {
			console.log('login', state, user)
			return { ...state, ...user }
		}
	}
}
