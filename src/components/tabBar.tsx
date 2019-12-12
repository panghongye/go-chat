import React from 'react'
import { Icon } from 'antd'
import css from './tabBar.scss'
import { TabBar } from 'antd-mobile'
const c1 = { fontSize: 44 }

const i1 = <Icon type={'setting'} style={c1} />
const i2 = <Icon type={'message'} style={c1} />

export default function() {
	return (
		<div className={css.TabBar}>
			<TabBar barTintColor="white" unselectedTintColor="#949494" tintColor="#33A3F4">
				<TabBar.Item icon={i1} selectedIcon={i1} selected />
				<TabBar.Item icon={i2} selectedIcon={i2} />
			</TabBar>
		</div>
	)
}
