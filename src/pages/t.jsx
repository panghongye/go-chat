import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile'
import React from 'react'

function closest(el, selector) {
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

export default class App extends React.Component {
	state = {
		modal1: false
	}
	showModal = (key) => (e) => {
		e.preventDefault() // 修复 Android 上点击穿透
		this.setState({
			[key]: true
		})
	}
	onClose = (key) => () => {
		this.setState({
			[key]: false
		})
	}
	onWrapTouchStart = (e) => {
		// fix touch to scroll background page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
			return
		}
		const pNode = closest(e.target, '.am-modal-content')
		if (!pNode) {
			e.preventDefault()
		}
	}

	render() {
		return (
			<WingBlank>
				<Button onClick={this.showModal('modal1')}>xxx</Button>

			</WingBlank>
		)
	}
}
