import React from 'react'
import css from './index.scss'
import { formatMessage } from 'umi-plugin-locale'
import { SearchBar, Button, WhiteSpace, WingBlank, Icon, List } from 'antd-mobile'
import UserAvatar from 'react-user-avatar'
import { Brief } from 'antd-mobile/lib/list/ListItem'
export default function() {
	return (
		<div>
			<WhiteSpace size="sm" />
			<WingBlank className={css['header-wrapper']} size="lg">
				<UserAvatar size="36" name="name" />
				<SearchBar style={{ width: '70%' }} placeholder="用户/群组" />
				<Icon type="plus" style={{ color: 'rgb(102, 179, 239)' }} />
			</WingBlank>
			<WhiteSpace size="md" />
			<List>
				<List.Item thumb={<UserAvatar size="36" name="1" />}>1</List.Item>
				<List.Item thumb={<UserAvatar size="36" name="2" />}>2</List.Item>
			</List>
			{/* tab 导航 */}
			<div className="tabs-wrapper" />
		</div>
	)
}
