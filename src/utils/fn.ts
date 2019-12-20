import { observer, IReactComponent } from 'mobx-react';
import withRouter from 'umi/withRouter';

export function onTouchStart(e: any) {
	// fix touch to scroll background page on iOS
	if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
		return;
	}
	const pNode = closest(e.target, '.am-modal-content');
	if (!pNode) {
		e.preventDefault();
	}
}

export function closest(el: any, selector: any) {
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		}
		el = el.parentElement;
	}
	return null;
}

export function router_observer(component: IReactComponent) {
	return withRouter(observer(component));
}





export function scrollToBottom() {
	try {
		global['chat-msgs-div'].scrollTop = Number.MAX_SAFE_INTEGER

	} catch (error) {
		console.error("scrollToBottom() err")
	}
}



