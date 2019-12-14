import withRouter from 'umi/withRouter'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import TabBar from './components/tabBar'

export const dva = {
	config: {
		onError(e: any) {
			e.preventDefault()
			console.error(e)
		}
	},
	plugins: [ require('dva-logger')() ]
}

export function rootContainer(container: JSX.Element) {
	return (
		<>{container}</>
	)
}


