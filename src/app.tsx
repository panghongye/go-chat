import Reatc from 'react'
export const dva = {
	config: {
		onError(err: ErrorEvent) {
			err.preventDefault()
			console.error(err.message)
		}
	}
}

export function rootContainer(container) {
	return container
}
