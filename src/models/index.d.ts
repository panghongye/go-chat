import { AnyAction } from 'redux';
import { RouterTypes } from 'umi';
import { TypeUserModel } from './user';
export * from './user';

export declare interface ConnectState {
  user: TypeUserModel;
}
