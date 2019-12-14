import React from 'react'
import { Icon } from 'antd'
import css from './tabBar.scss'
import { TabBar } from 'antd-mobile'
import withRouter from 'umi/withRouter';
const c1 = { fontSize: 44 }

const i1 = <Icon type={'message'} style={c1} />
const i2 = <Icon type={'setting'} style={c1} />

export default withRouter(function _TabBar(props) {
	return (
		<div className={css.TabBar}>
			<TabBar barTintColor="white" unselectedTintColor="#949494" tintColor="#33A3F4">
				<TabBar.Item
					onPress={() => {
						props.history.replace('/')
					}}
					icon={i1}
					selectedIcon={i1}
					selected={props.location.pathname == '/'}
				/>
				<TabBar.Item
					onPress={() => {
						props.history.replace('/setting')
					}}
					icon={i2}
					selectedIcon={i2}
					selected={props.location.pathname == '/setting'}
				/>
			</TabBar>
		</div>
	)
})
