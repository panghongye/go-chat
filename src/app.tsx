import withRouter from 'umi/withRouter'
import { observer, Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React from 'react'
import store from './models/index'

const App = withRouter((props) => {
	return <>{props.children}</>
})

export function rootContainer(container: JSX.Element) {
	return (
		<Provider store={store}>
			<Router>
				<App>{container}</App>
			</Router>
		</Provider>
	)
}
