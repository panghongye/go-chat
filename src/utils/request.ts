import { Toast } from 'antd-mobile'
import Axios, { Method, AxiosRequestConfig } from 'axios'

interface Option extends AxiosRequestConfig {
	loadingText?: string
}

function axios(url: string, method?: Method, data?: any, option?: Option) {
	url = '//127.0.0.1:3000/api/v1' + url
	const loadingText = option && option.loadingText
	if (loadingText) Toast.loading(loadingText, 0)
	return Axios({ url, method: method || 'POST', data })
		.then((res: any) => {
			if (loadingText) Toast.hide()
			const { data = {} } = res
			let msg = ''
			if (!data) {
				console.error(res)
				msg = '请求失败'
			}
			msg = data.msg || data.message
			if (msg) Toast.info(msg)
			return data
		})
		.catch((err: any) => {
			if (loadingText) Toast.hide()
			console.error(err)
			Toast.offline('连接超时,请稍后重试', 2)
			setTimeout(Toast.hide, 8000)
			return err
		})
}

export default axios
export { axios }
