import { router_observer, socket, scrollToBottom } from '@/utils';
import { user } from '@/models';
import { NavBar, Icon, InputItem, Toast } from 'antd-mobile';
import UserAvatar from 'react-user-avatar';
import css from './index.scss';
import { Button } from 'antd';
import React, { } from 'react';

class Chat extends React.Component<any> {
  state = { msg: '' };
  id = this.props.location.query.id

  render() {
    const { props } = this;
    const group = user.groups.find((group) => {
      return this.id == group.id;
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
          {group?.name}
        </NavBar>
        <div id='chat-msgs-div' className={css.msgs} >{
          msgs.map((msg: any) => {
            return <div key={msg.id} style={{display:'flex',marginBottom:10}}>
              <UserAvatar size="36" name={msg.userName+'_'} style={{ color: '#FFF'}} />
              <div className={css.d1} >{msg.msg}</div>
            </div>
          })
        }</div>
        <InputItem
          placeholder="随便聊点啥吧"
          value={this.state.msg}
          onChange={(msg) => this.setState({ msg })}
          onSubmit={this.send}
          extra={<Button type="primary" onClick={this.send}>发送</Button>}
        />
      </div>
    );
  }

  send = () => {
    const { msg } = this.state
    if (!msg) return
    socket.emitAsync('sendGroupMsg', { msg, userName: user.info.name, groupID: this.id + '' }).then(
      r => {
        this.setState({ msg: '' })
      }
    ).catch(r => {
      Toast.info('发送失败')
    })
  }

  componentDidMount() {
    setTimeout(scrollToBottom, 1)
  }
}

export default router_observer(Chat);
