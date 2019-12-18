import React from 'react';
import TabBar from '../components/tabBar';
import router from 'umi/router';
import { connect } from '@/utils';

const BaseLayout = (props: any) => {
  console.warn(props, 22);
  const { user } = props;
  const pathname = props.location.pathname;
  if (!user.token && pathname != '/login') {
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

export default connect(({ user }) => {
  return { user };
})(BaseLayout);
