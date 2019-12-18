import { Reducer } from 'redux';

export interface TypeUserState {
  name?: string;
  token?: string;
  id?: number;
}

export interface TypeUserModel {
  namespace: string;
  state: TypeUserState;
  effects: {};
  reducers: {
    [x: string]: Reducer<TypeUserState>;
  };
}

function initState(): TypeUserState {
  let d = { name: '', token: '', id: 0 };
  try {
    d = { ...d, ...JSON.parse(localStorage.userInfo) };
  } catch (error) {}
  return d;
}

const Mode: TypeUserModel = {
  namespace: 'user',
  state: initState(),
  effects: {},
  reducers: {
    login(state, { payload }) {
      const d = { ...state, ...payload };
      localStorage.userInfo = JSON.stringify(d);
      return d;
    },
    logout(state) {
      localStorage.clear();
      return initState();
    },
  },
};

export default Mode;
