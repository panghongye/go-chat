import withRouter from 'umi/withRouter'
import { Provider, observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React from 'react'
// import store from './models/index'

const App = (props) => {
	return (
		<div>
			{props.children}
			{/* {store.user.info.name} */}
		</div>
	)
}

export function rootContainer(container: JSX.Element) {
	return (
		// <Provider store={store}>
		// <Router>
		<App>{container}</App>
		// </Router>
		// </Provider>
	)
}
