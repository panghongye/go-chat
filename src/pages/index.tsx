import React from 'react';
import css from './index.scss';
import { SearchBar, WhiteSpace, WingBlank, Icon, List, Modal, InputItem, Toast } from 'antd-mobile';
import UserAvatar from 'react-user-avatar';
import withRouter from 'umi/withRouter';
import { observer } from 'mobx-react';
import { user } from '../models_';
import { socket } from '../utils/socket';

const Item = (props: any) => {
  const { data } = props;
  return (
    <List.Item
      onClick={() => {}}
      thumb={<UserAvatar size="36" name={data.name} style={{ color: '#FFF' }} />}
    >
      {data.name}
    </List.Item>
  );
};

@observer
class Index extends React.Component {
  state = {
    modal1: false,
    search: '',
    name: '',
    groupNotice: '',
    searchResults: { users: [], groups: [] },
    searchOpen: false,
  };

  render() {
    const { searchResults, search, searchOpen } = this.state;
    const { groups = [], users = [] } = searchResults;
    const noData = <div>暂无</div>;
    return (
      <div className="p-index">
        <WhiteSpace size="sm" />
        <WingBlank className={css['header-wrapper']} size="lg">
          <UserAvatar size="36" name="aa" style={{ color: '#FFF' }} />
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
            <List renderHeader={'所有用户'}>
              {users.length
                ? users.map((a: any) => {
                    return <Item key={a.id} data={a} />;
                  })
                : noData}
            </List>
            <List renderHeader={'所有群组'}>
              {groups.length
                ? groups.map((a: any) => {
                    return <Item key={a.id} data={a} />;
                  })
                : noData}
            </List>
          </>
        ) : (
          <List>
            {[0, 1, 2].map(a => {
              const s = a + '';
              return <Item key={s} data={{ name: s }} />;
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

  clearSearch = () => {
    this.setState({ search: '', searchOpen: false });
  };

  onSearch = (search: string) => {
    Toast.loading('', 0);
    socket
      .emitAsync('search', { search })
      .then((r: any) => {
        this.setState({ searchResults: r.data, search, searchOpen: true });
        Toast.hide();
      })
      .catch(e => {
        Toast.hide();
      });
  };

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
