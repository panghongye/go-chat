import withRouter from 'umi/withRouter'
import { observer } from 'mobx-react'
import React from 'react'
import store from './models/index'

const Root = observer((props) => {
	return props.children
})

export const rootContainer = (container: JSX.Element) => <Root>{container}</Root>
