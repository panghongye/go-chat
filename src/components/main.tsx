import React from 'react'
import css from './main.scss'
import { formatMessage } from 'umi-plugin-locale'
import { SearchBar, Button, WhiteSpace, WingBlank, Icon, List } from 'antd-mobile'
import UserAvatar from 'react-user-avatar'
import TabBar from './tabBar'

export default function Main(props: any) {
	console.log(props)
	return (
		<div>
			<WhiteSpace size="sm" />
			<WingBlank className={css['header-wrapper']} size="lg">
				<UserAvatar size="36" name="aa" style={{ color: '#FFF' }} />
				<SearchBar style={{ width: '70%' }} placeholder="用户/群组" />
				<Icon type="plus" style={{ color: 'rgb(102, 179, 239)' }} />
			</WingBlank>
			<WhiteSpace size="md" />
			<List>
				{[ 0, 1, 2 ].map((a) => {
					const s = a + ''
					return (
						<List.Item
							key={s}
							onClick={() => {}}
							thumb={<UserAvatar size="36" name={s} style={{ color: '#FFF' }} />}
						>
							{s}
						</List.Item>
					)
				})}
			</List>
			<TabBar />
		</div>
	)
}
