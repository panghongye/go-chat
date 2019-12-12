import { withRouter } from 'react-router'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'

export const dva = {
	config: {
		onError(err: ErrorEvent) {
			err.preventDefault()
			console.error(err.message)
		}
	}
}

export function rootContainer(container: JSX.Element) {
	return (
		<Router>
			<Switch>
				<Route path="/login">login</Route>
				<Route path="/" component={require('./components/main').default} />
			</Switch>
		</Router>
	)
}
