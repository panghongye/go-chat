import withRouter from 'umi/withRouter';
import { observer } from "mobx-react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import TabBar from './components/tabBar'
import store from './models/index'


export function rootContainer(container: JSX.Element) {
	console.log(store)
	return (
		<Router>
			{/* <Root /> */}
			{container}
		</Router>
	)
}

const Root = withRouter((props) => {
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
