import React from 'react';
import css from './index.scss';
import { SearchBar, WhiteSpace, WingBlank, Icon, List, Modal, InputItem, Toast } from 'antd-mobile';
import UserAvatar from 'react-user-avatar';
import { user } from '../../models';
import InfoList from '../../components/infoList';
import { onTouchStart, router_observer, socket } from '@/utils';

class Index extends React.Component {
  state = {
    modal1: false,
    search: '',
    name: '',
    intro: '',
    searchResults: { users: [], groups: [] },
    searchOpen: false
  };

  render() {
    const { searchResults, search, searchOpen } = this.state;
    const { groups = [], users = [] } = searchResults;
    return (
      <div className="p-index">
        <WhiteSpace size="sm" />
        <WingBlank className={css['header-wrapper']} size="lg">
          <UserAvatar size="36" name={user?.info?.name +'_'} style={{ color: '#FFF' }} />
          <SearchBar
            style={{ width: '70%' }}
            placeholder="用户/群组"
            onSubmit={this.onSearch}
            value={search}
            onChange={e => {
              if (!e) return this.clearSearch();
              this.setState({ search: e });
            }}
            onClear={this.clearSearch}
            onCancel={this.clearSearch}
          />
          <Icon
            type="plus"
            onClick={() => this.setState({ modal1: true })}
            style={{ color: 'rgb(102, 179, 239)' }}
          />
        </WingBlank>
        <WhiteSpace size="md" />
        {searchOpen ? (
          <>
            <InfoList lists={users} title="所有用户" clickType="getUserInfo" />
            <InfoList lists={groups} title="所有群组" clickType="getGroupInfo" />
          </>
        ) : (
            <InfoList lists={user.groups} clickType="chat" />
          )}
        <Modal
          visible={this.state.modal1}
          afterClose={() => this.setState({ name: '', intro: '' })}
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
              }
            },
            {
              text: '确定',
              onPress: this.newGroup
            }
          ]}
          wrapProps={{
            onTouchStart
          }}
        >
          <div style={{ height: 100 }}>
            <InputItem onInput={e => this.setState({ name: e.currentTarget.value })}>名称:</InputItem>
            <InputItem onInput={e => this.setState({ intro: e.currentTarget.value })}>简介:</InputItem>
          </div>
        </Modal>
      </div>
    );
  }

  clearSearch = () => {
    this.setState({ search: '', searchOpen: false });
  };

  onSearch = (search: string) => {
    Toast.loading('', 10);
    socket
      .emitAsync('search', { search })
      .then((r: any) => {
        r.data.users = r?.data?.users.filter((a: any) => {
          return a?.id != user.info.id
        })
        this.setState({ searchResults: r.data, search, searchOpen: true });
        Toast.hide();
      })
      .catch(e => {
        Toast.hide();
      });
  };

  newGroup = () => {
    Toast.loading('', 10);
    socket
      .emitAsync('newGroup', {
        name: this.state.name,
        intro: this.state.intro,
        userID: user.info.id
      })
      .then(group => {
        Toast.hide();
        console.log('创建成功', group);
        //todo
        location.reload()
        this.onClose('modal1')();
      })
      .catch(e => Toast.hide());
  };

  onClose = (key: any) => () => {
    this.setState({
      [key]: false,
      name: '',
      intro: ''
    });
  };
}
export default router_observer(Index);
