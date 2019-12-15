import React from 'react'
import css from './index.scss'
import { formatMessage } from 'umi-plugin-locale'
import { SearchBar, WhiteSpace, WingBlank, Icon, List, Modal, InputItem } from 'antd-mobile'
import UserAvatar from 'react-user-avatar'
import withRouter from 'umi/withRouter'
import { observer } from 'mobx-react'
import io from 'socket.io-client'
import { user } from '../models_'

@observer
class Index extends React.Component {
	state = {
		modal1: true,
		name: '',
		group_notice: ''
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<WhiteSpace size="sm" />
				<WingBlank className={css['header-wrapper']} size="lg">
					<UserAvatar size="36" name="aa" style={{ color: '#FFF' }} />
					<SearchBar style={{ width: '70%' }} placeholder="用户/群组" />
					<Icon
						type="plus"
						onClick={() => this.setState({ modal1: true })}
						style={{ color: 'rgb(102, 179, 239)' }}
					/>
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
				<Modal
					visible={this.state.modal1}
					bodyStyle={{ padding: 0 }}
					transparent={true}
					maskClosable={false}
					onClose={this.onClose('modal1')}
					title="新群组"
					footer={[
						{
							text: '取消',
							onPress: () => {
								this.onClose('modal1')()
							}
						},
						{
							text: '确定',
							onPress: () => {
								console.log('ok')
								this.onClose('modal1')()
							}
						}
					]}
					wrapProps={{ onTouchStart: this.onWrapTouchStart }}
				>
					<div style={{ height: 100 }}>
						<InputItem onInput={(e) => this.setState({ name: e.currentTarget.value })}>
							名称:
						</InputItem>
						<InputItem onInput={(e) => this.setState({ name: e.currentTarget.value })}>
							公告:
						</InputItem>
					</div>
				</Modal>
			</div>
		)
	}

	componentDidMount() {
		const socket = (global.socket = io(`127.0.0.1:3000?token=${user.info.token}`))
		socket.emit('initSocket', user.info.id, (...arg: any) => {
			console.log(arg) //todo 返回聊天列表
		})
	}
	onClose = (key: any) => () => {
		this.setState({
			[key]: false,
			name: '',
			group_notice: ''
		})
	}
	onWrapTouchStart = (e: any) => {
		// fix touch to scroll background page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
			return
		}
		const pNode = closest(e.target, '.am-modal-content')
		if (!pNode) {
			e.preventDefault()
		}
	}
}

export default withRouter(Index)

function closest(el: any, selector: any) {
	const matchesSelector =
		el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el
		}
		el = el.parentElement
	}
	return null
}
