import React, { useState } from 'react';
import { Toast, List, Modal, Button } from 'antd-mobile';
import { onTouchStart, router_observer, socket } from '@/utils';
import UserAvatar from 'react-user-avatar';
import { user } from '@/models';

type Info = { name: string; intro: string; id: number | string };

export default router_observer(function InfoList(props: {
  lists: any[];
  title?: any;
  clickType: 'getUserInfo' | 'getGroupInfo' | 'chat'
  [x: string]: any;
}) {
  const { lists = [], title, clickType } = props;
  const [visible, visibleSet] = useState(false);
  const [info, infoSet] = useState({ name: '', intro: '', id: '' } as Info);
  const noData = <div style={{ padding: '4px 15px', background: '#f5f5f9' }}>暂无</div>;

  function onListClick(info: Info) {
    infoSet(info);
    if (clickType === 'chat') {
      return chat(info);
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

  // 开始聊天
  function startChat(info: Info) {
    props.history.push({
      pathname: '/chat',
      query: { id: info.id },
    });
  }

  function chat(info: Info) {
    if (clickType === 'getGroupInfo') {
      socket
        .emitAsync('joinGroup', { groupID: info.id, userName: user.info.name })
        .then(r => { startChat(info) })
        .catch(e => {
          Toast.info('加入聊天失败，请重试');
        });
    }
    if (clickType === 'getUserInfo') {
      socket
        .emitAsync('newFriend', { toUserID: info.id })
        .then(r => { startChat(info) })
        .catch(e => {
          Toast.info('加入聊天失败，请重试');
        });
    }

    startChat(info);

  }

  return (
    <>
      <List renderHeader={title}>
        {lists.length
          ? lists.map((a: any) => {
            return (
              <List.Item
                key={JSON.stringify(a)}
                onClick={() => onListClick(a)}
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
        transparent={true}
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
        <p>{info.intro}</p>
        <Button
          style={{ width: '80%', margin: 'auto' }}
          size="small"
          type="primary"
          onClick={() => {
            startChat(info);
          }}
        >
          开始聊天
        </Button>
      </Modal>
    </>
  );
});
