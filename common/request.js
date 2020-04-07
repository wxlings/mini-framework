
/** 
声明的options支持的参数请阅官方文档 https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
	let url = this.$api.home;
	let data = {type:'home',...}
	let options = {header:{sn:'aslkdfj',Authorization:'Bear 123456789',...},requestId:'home-fetch',...}
	this.$fetch.get(url,data,options).then(res=>{this.$log('HOME LOAD',res.data)},err=>{this.$log('HOME LOAD FAIL',res.data)})
也可以这样使用：
	let options = {url:this.$api.home,data:{type:'home'},header:{sn:''},requestId:'home_fetch'}
	this.$fetch.request(),then(res=>{},err=>{})
中断请求：
	this.$fetch.cancel('requestId') // 要在异步发起请求之后才能取消
 */

import constant from './const.js'
import conf from './config.js'
import api from './api.js'

const config = {
	url:conf.host,
	header:{
		'Content-Type': 'application/x-www-form-urlencoded',
		'token':'',
		'version':conf.version // 通常在头部增加version标识,为了解决小程序升级审核时因数据返回异常而审核不过
	}
}

const requests = new Map()

/**
 * 拦截器:如果需要对请求或者响应进行处理可以在这里处理
 */
const interceptor = {
	request:(req)=>{
		_reqlog(req)
		return req
	},
	response:(res)=>{
		// if(res.statusCode === 500){
		// 	_reslog(res)
		// }
		_reslog(res) 	//内容过多,请自行控制是否打开日志
		return res
	}
}

function request(url,options){
	let tempUrl = url || options.url||'' // ;支持url 放在options中
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
				options.success =(res)=>{
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
							title:'服务器开小差了,请稍后再试...',
							icon:'none'
						})
						reject({
							err_code:statusCode,
							err_msg:'服务器开小差了,请稍后再试...'
						})
					}else if(statusCode === 404){
						reject({
							err_code:statusCode,
							err_msg:'请求的资源未找到'
						})
					}else if(statusCode === 'some-code'){ // todo 其他http 状态自行处理
						reject({
							err_code:statusCode,
							err_msg:res.errMsg
						})
					}
				}
				options.fail =(res)=>{
					if(res.errMsg === 'request:fail abort'){
						reject(res)
					}else{
						wx.showToast({
							title:'网络连接异常,请重试',
							icon:'none'
						})
						reject(res)
					}
				}
				options.complete = ()=>{
					requests.delete(options.requestId)
				}
				if(interceptor.request){ // 如果有设置请求拦截器,先进行请求拦截
					options = interceptor.request(options)
				}
				requests.set(options.requestId,wx.request(options))
			}
		})
	})
}

/**
 * @param {Object} req 打印请求日志
 */
function _reqlog(req) {
	if(conf.env !== constant.Env.PRO) {
		console.log('【' + req.requestId + '】url:',req.url);
		if(req.data) {
			console.log('【' + req.requestId + '】params:',req.data);
		}
	}
}

/**
 * @param {Object} req 打印响应日志
 */
function _reslog(res) {
  if (conf.env !== constant.Env.PRO) {
	console.log("【" + res.requestId + "】response:",res)
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

/**
 * @param {Object} requestId cancel request task with requestId
 */
function cancel(requestId){
	if(requestId || requestId === 0){
		if(requests.has(requestId)){
			requests.get(requestId).abort()
			console.log('Cancel request:',requestId)
		}
	}else{
		console.log("please expect requestId")
	}
}


module.exports.get = get
module.exports.post = post
module.exports.put = put
module.exports.delele = del
module.exports.request = request // 支持像原生一样设置请求参数
module.exports.cancel = cancel