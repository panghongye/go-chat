import { router_observer, socket } from '@/utils';
import { user } from '@/models';
import { NavBar, Icon, InputItem, Toast } from 'antd-mobile';
import css from './index.scss';
import { Button } from 'antd';
import React from 'react';

class Chat extends React.Component<any> {
  state = { text: '' };

  render() {
    const { props } = this;
    const info = props.location.query;
    const group = user.groups.find((group) => {
      return group.id == info.id;
    });
    const msgs = group?.msgs || [] as any
    return (
      <div className={css['p-chat']}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={props.history.goBack}
          rightContent={[<Icon key="1" type="ellipsis" />]}
        >
          {info.name}
        </NavBar>
        <div style={{ flex: 1 }}>{
          msgs.map((msg: any) => {
            return <div key={msg.id}>{msg.msg}</div>
          })
        }</div>
        <InputItem
          placeholder="随便聊点啥吧"
          onChange={(text) => this.setState({ text })}
          extra={<Button type="primary" onClick={this.send}>发送</Button>}
        />
      </div>
    );
  }

  send = () => {
    socket.emitAsync('sendGroupMsg', { msg: this.state.text }).then(
      r => {
        this.setState({ text: '' })
      }
    ).catch(r => {
      Toast.info('发送失败')
    })
  }
}

export default router_observer(Chat);
