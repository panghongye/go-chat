import { observer, IReactComponent } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import withRouter from 'umi/withRouter';

function onTouchStart(e: any) {
	// fix touch to scroll background page on iOS
	if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
		return;
	}
	const pNode = closest(e.target, '.am-modal-content');
	if (!pNode) {
		e.preventDefault();
	}
}

function closest(el: any, selector: any) {
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		}
		el = el.parentElement;
	}
	return null;
}

function router_observer(component: IReactComponent) {
	return withRouter(observer(component));
}

export { onTouchStart, closest, router_observer };
