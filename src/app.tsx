import withRouter from 'umi/withRouter';
import { observer } from "mobx-react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import user from './models/user'
import TabBar from './components/tabBar'
export const dva = {
	config: {
		onError(err: ErrorEvent) {
			err.preventDefault()
			console.error(err.message)
		}
	},
	 plugins: [
    require('dva-logger')(),
  ],
}

export function rootContainer(container: JSX.Element) {
	return (
		<Router>
			<Root/>
		</Router>
	)
}

const Root =  withRouter((props) => {
	const pathname = props.location.pathname
	return (
		<>
			<Switch>
				<Route path="/login" component={require('./pages/login').default}></Route>
				<Route path="/setting">setting</Route>
				<Route path="/" component={require('./pages/index').default} />
			</Switch>
			{(pathname == '/' || pathname == '/setting') && <TabBar />}
		</>
	)
})
