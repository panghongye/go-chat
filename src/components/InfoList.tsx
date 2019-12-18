import React, { useState } from 'react';
import { Toast, List, Modal } from 'antd-mobile';
import { onTouchStart } from '@/utils';
import UserAvatar from 'react-user-avatar';

export default function InfoList(props: {
  lists: any[];
  title?: any;
  clickType: 'getUserInfo' | 'getGroupInfo' | 'chat';
}) {
  const { lists = [], title, clickType } = props;
  const [visible, visibleSet] = useState(false);
  const [info, infoSet] = useState({ name: '', intro: '' });
  const noData = <div style={{ padding: '4px 15px', background: '#f5f5f9' }}>暂无</div>;

  function onClickType(info: any) {
    infoSet(info);
    if (clickType === 'chat') {
      return;
    }
    visibleSet(true);
    // socket
    //   .emitAsync(clickType, { id: info.id })
    //   .then(r => {

    //   })
    //   .catch(e => {
    //     Toast.info('获取信息失败，请重试');
    //   });
  }
  return (
    <>
      <List renderHeader={title}>
        {lists.length
          ? lists.map((a: any) => {
              return (
                <List.Item
                  key={JSON.stringify(a)}
                  onClick={() => onClickType(a)}
                  thumb={<UserAvatar size="36" name={a.name + ''} style={{ color: '#FFF' }} />}
                >
                  {a.name}
                </List.Item>
              );
            })
          : noData}
      </List>
      <Modal
        visible={visible}
        transparent
        onClose={() => visibleSet(false)}
        // bodyStyle={{ padding: 0 }}
        title=""
        wrapProps={{
          onTouchStart,
        }}
      >
        <UserAvatar
          size="50"
          name={info.name}
          style={{ color: '#FFF', display: 'flex', justifyContent: 'center' }}
        />
        {info.name}
        {info.intro}
      </Modal>
    </>
  );
}
