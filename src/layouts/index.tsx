import React from 'react';
import TabBar from '../components/tabBar';
import router from 'umi/router';
import { user } from '../models/index';
import { router_observer } from '@/utils';

const BaseLayout = (props: any) => {
	const pathname = props.location.pathname;
	if (!user.info.token && pathname != '/login') {
		router.replace('/login');
		return null;
	}

	return (
		<>
			{props.children}
			{(pathname === '/' || pathname === '/setting') && <TabBar />}
		</>
	);
};

export default router_observer(BaseLayout);
