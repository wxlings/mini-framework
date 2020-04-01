import constant from './const.js'
import conf from './config.js'
import api from './api.js'

let config = {
	url:conf.host,
	header:{
		// 'Content-Type': 'application/json'
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}

/**
 * 拦截器
 */
let interceptor = {
	request:(req)=>{
		_reqlog(req)
		return req
	},
	response:(res)=>{
		if(res.statusCode === 500){
			_reslog(res)
		}
		// _reslog(res) 	//内容过多,请自行控制是否打开日志
		return res
	}
}

function request(url,options){
	let tempUrl = url || options.url||''
	if(tempUrl.indexOf('http://') !== 0 || tempUrl.indexOf('https://') !== 0){
		options.url = conf.host + tempUrl
	}
	options.header = Object.assign({},config.header,options.header)
	options.requestId = options.requestId || new Date().getTime()
	return new Promise((resolve,reject)=>{
		wx.getStorage({
			key:constant.Storage.TOKEN,
			success(res){
				options.header.token = res.data
			},
			fail(e){
				// todo 可以在这里跳转到登录
			},
			complete(res) {
				options.complete = (res) =>{
					res.requestId = options.requestId
					if(interceptor.response){ // 如果有设置响应拦截器,先进行响应拦截
						res = interceptor.response(res)
					}
					let statusCode = res.statusCode
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
					}else if(statusCode === 'some-code'){
						// todo 其他http 状态自行处理
					}
				}
				if(interceptor.request){ // 如果有设置请求拦截器,先进行请求拦截
					options = interceptor.request(options)
				}
				wx.request(options)
			}
		})
	})
}

/**
 * @param {Object} req 打印请求日志
 */
function _reqlog(req) {
	if(process.env.NODE_ENV === 'development') {
		console.log('【' + req.requestId + '】 url：' + req.url,' token:',req.header.token);
		if(req.data) {
			console.log('【' + req.requestId + '】 params：' + JSON.stringify(req.data));
		}
	}
}

/**
 * @param {Object} req 打印响应日志
 */
function _reslog(res) {
  if (process.env.NODE_ENV === 'development') {
  	console.log("【" + res.requestId + "】 地址：" + res.config.url)
  	if (res.config.data) {
  		console.log("【" + res.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
  	}
  	console.log("【" + res.requestId + "】 响应结果：" + JSON.stringify(res))
  }
}
/**
 * get request
 */
function get(url,data={},options={}){
	options.method = 'GET';
	options.data = data;
	return request(url,options)
}
/**
 * post request
 */
function post(url,data={},options={}){
	options.method = 'POST';
	options.data = data;
	return request(url,options)
}
/**
 * put request
 */
function put(url,data={},options={}){
	options.method = 'PUT';
	options.data = data;
	return request(url,options)
}
/**
 * delete request
 */
function del(url,data={},options={}){
	options.method = 'DELETE';
	options.data = data;
	return request(url,options)
}


module.exports.get = get
module.exports.post = post
module.exports.put = put
module.exports.delele = del
module.exports.request = request