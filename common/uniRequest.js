import store from '../store/index.js'
import constant from './const.js'
import conf from './config.js'
import api from './api.js'

let config = {
	url:conf.host,
	header:{
		// 'Content-Type': 'application/json'
		'Content-Type': 'application/x-www-form-urlencoded',
		'token':store.state.token
	},
	data:{},
	method:'POST',
	dataType:'json',
	responseType: 'text',
	success(){},
	fail(){},
	complete(){}
}

let interceptor = {
	request:null,
	response:null
}

function request(options){
	let url = options.url||''
	if(url.indexOf('http://') !== 0 || url.indexOf('https://') !== 0){
		options.url = conf.host + url
	}
	let header = {...config.header}
	// try {
	// 	let token = wx.getStorageSync(constant.Storage.TOKEN)
	// 	if (token) {
	// 		options.token = token
	// 	}
	// } catch (e) {
	// 	console.log('Get Storage->token fail:',e)
	// }
	
	Object.assign(header,options.header)
	options.header = header
	return new Promise((resolve,reject)=>{
		let _config = {}
		Object.assign(_config, config, options);
		_config.requestId = new Date().getTime();
		console.log("*******************",_config)
		_reqlog(_config)
		options.complete = (res) =>{
			console.log("-------------",res)
			let statusCode = res.statusCode
			res.config = _config
			if(interceptor.response){ // 使用拦截器修改网络拦截数据
				res = interceptor.response(res)
			}
			resolve(res.data)
			return
			if(statusCode === 200){
				if(res.data.err_code === 4000){ // 如果有强制登录业务
					wx.navigateTo('/pages/login/index')
					return
				}
				resolve(res.data)
			}else if(statusCode === 500){
				wx.showToast({
					title:'服务器繁忙,请稍再试...',
					icon:'none'
				})
				let temp = {
					err_code:statusCode, // 这里强烈建议符合服务器返回数据格式的字段
					err_msg:'server error!',
				}
				reject(temp)
			}else if(statusCode === 302){
				// todo
			}
		}
		
		uni.request(_config)
	})

}

function _reqlog(req) {
	if(process.env.NODE_ENV === 'development') {
		console.log('【' + req.requestId + '】 url：' + req.url);
		if(req.data) {
			console.log('【' + req.requestId + '】 params：' + JSON.stringify(req.data));
		}
	}
}

function _reslog(res) {
  let _statusCode = res.data.err_code;
  // if (process.env.NODE_ENV === 'development') {
  // 	console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
  // 	if (res.config.data) {
  // 		console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
  // 	}
  // 	console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
  // }
  //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
  switch (_statusCode) {
    case 200:
      break;
    case 401:
      // token为空
      console.log('reponse-401');
      break;
    case 404:
      break;
    default:
      break;
  }
}

function get(url,data={},options={}){
	options.url = url;
	options.method = 'GET';
	options.data = data;
	request(options)
}

function post(url,data={},options={}){
	options.url = url;
	options.method = 'POST';
	options.data = data;
	request(options)
}

function put(url,data={},options={}){
	options.url = url;
	options.method = 'PUT';
	options.data = data;
	request(options)
}

function del(url,data={},options={}){
	options.url = url;
	options.method = 'DELETE';
	options.data = data;
	request(options)
}

module.exports.get = get
module.exports.post = post
module.exports.put = put
module.exports.delele = del
module.exports.request = request