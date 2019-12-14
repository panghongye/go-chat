import * as React from 'react'
import withRouter from 'umi/withRouter';
import TabBar from '../components/tabBar'

export default withRouter(function BaseLayout(props) {
	const pathname=props.location.pathname
	return (
		<>
			{props.children}
			{(pathname == '/' || pathname == '/setting') && <TabBar />}
		</>
	)
})
