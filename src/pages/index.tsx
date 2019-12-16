import React from 'react';
import css from './index.scss';
import { SearchBar, WhiteSpace, WingBlank, Icon, List, Modal, InputItem, Toast } from 'antd-mobile';
import UserAvatar from 'react-user-avatar';
import withRouter from 'umi/withRouter';
import { observer } from 'mobx-react';
import io from 'socket.io-client';
import { user } from '../models_';
import { socket } from '../utils/socket';

@observer
class Index extends React.Component {
  state = {
    modal1: false,
    search: '',
    name: '',
    groupNotice: '',
  };

  render() {
    return (
      <div>
        <WhiteSpace size="sm" />
        <WingBlank className={css['header-wrapper']} size="lg">
          <UserAvatar size="36" name="aa" style={{ color: '#FFF' }} />
          <SearchBar
            style={{ width: '70%' }}
            placeholder="用户/群组"
            onChange={e => this.setState({ search: e })}
            // onClear={() => {
            //   this.setState({ search: '' });
            //   console.log('xxxxxx');
            // }}
            // value={this.state.search}
          />
          <Icon
            type="plus"
            onClick={() => this.setState({ modal1: true })}
            style={{ color: 'rgb(102, 179, 239)' }}
          />
        </WingBlank>
        <WhiteSpace size="md" />
        {this.state.search ? (
          <>
            <List renderHeader={() => '搜索用户'}></List>
            <List renderHeader={() => '搜索群组'}></List>
          </>
        ) : (
          <List>
            {[0, 1, 2].map(a => {
              const s = a + '';
              return (
                <List.Item
                  key={s}
                  onClick={() => {}}
                  thumb={<UserAvatar size="36" name={s} style={{ color: '#FFF' }} />}
                >
                  {s}
                </List.Item>
              );
            })}
          </List>
        )}
        <Modal
          visible={this.state.modal1}
          afterClose={() => this.setState({ name: '', groupNotice: '' })}
          bodyStyle={{ padding: 0 }}
          transparent={true}
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="新群组"
          footer={[
            {
              text: '取消',
              onPress: () => {
                this.onClose('modal1')();
              },
            },
            {
              text: '确定',
              onPress: this.newGroup,
            },
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 100 }}>
            <InputItem onInput={e => this.setState({ name: e.currentTarget.value })}>
              名称:
            </InputItem>
            <InputItem onInput={e => this.setState({ name: e.currentTarget.value })}>
              公告:
            </InputItem>
          </div>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    socket.connect();
  }

  newGroup = () => {
    Toast.loading('', 0);
    socket
      .emitAsync('newGroup', {
        name: this.state.name,
        groupNotice: this.state.groupNotice,
        userID: user.info.id,
      })
      .then(group => {
        Toast.hide();
        console.log('创建成功', group); //todo
        this.onClose('modal1')();
      })
      .catch(e => Toast.hide());
  };

  onClose = (key: any) => () => {
    this.setState({
      [key]: false,
      name: '',
      groupNotice: '',
    });
  };

  onWrapTouchStart = (e: any) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
}

export default withRouter(Index);

function closest(el: any, selector: any) {
  const matchesSelector =
    el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
