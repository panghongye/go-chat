import Axios, { Method, AxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';

interface AxiosOption extends AxiosRequestConfig {
  loadingText?: string;
}

async function axios(url: string, method?: Method, data?: any, option?: AxiosOption) {
  url = '//127.0.0.1:3000/api/v1' + url;
  const loadingText = option && option.loadingText;
  if (loadingText) Toast.loading(loadingText, 10);
  return Axios({ url, method: method || 'POST', data })
    .then((res: any) => {
      if (loadingText) Toast.hide();
      const { data = {} } = res;
      let msg = '';
      if (!data) {
        console.error(res);
        msg = '请求失败';
      }
      msg = data.msg || data.message;
      if (msg) Toast.info(msg);
      return data;
    })
    .catch((err: any) => {
      if (loadingText) Toast.hide();
      console.error(err);
      Toast.offline('连接超时,请稍后重试', 2);
      setTimeout(Toast.hide, 8000);
      return err;
    });
}

export default axios;
export { axios };
