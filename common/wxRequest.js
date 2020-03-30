/** 直接使用wx.request Api进行网络请求：优点简单,明了,速度快;缺点:不合适进行封装
 *  let url = '/index/hello'
 *  let data = {
		page:1,type:'home',...
	}
 *  let options = {
		header:{
			sn:'aslkdfj',
			Authorization:'Bear 123456789...'
		},
		dataType:'json',
		success(res){
			console.log("success:",res)
		},
		fail(e){
			console.log("fail:",res)
		}
	}
	this.$fetch.get(url,params,options)
 */

import conf from './config.js'
import constant from './const.js'
import api from './api.js'

/**
 * 基础数据
 */
let config = {
	host:conf.host,
	header:{
		// 'Content-Type': 'application/json'
		'Content-Type': 'application/x-www-form-urlencoded',
		'token':''
	},
	data:{},
	method:'POST',
	dataType:'json',
	responseType: 'text',
	success(){},
	fail(){},
	complete(){}
}

function wxRequest(params){
	let url = params.url||''
	if(url.indexOf('http://') !== 0 || url.indexOf('https://') !== 0){
		params.url = config.host + url
	}
	let header = {...config.header}
	wx.getStorage({
		key:constant.Storage.TOKEN,
		success(res) {
			header.token = res.data
		},
		complete(){
			Object.assign(header,params.header)
			params.header = header
			console.log("Get params:",params)
			wx.request(params)
		}
	})
}

function wxGet(url,data={},params={}){
	params.url = url
	params.data = data
	params.method = 'GET'
	request(params)
}

function wxPost(url,data={},params={}){
	params.url = url
	params.data = data
	params.method = 'POST'
	this.request(params)
}

function wxPut(url,data={},params={}){
	params.url = url
	params.data = data
	params.method = 'PUT'
	this.request(params)
}

function wxDelete(url,data={},params={}){
	params.url = url
	params.data = data
	params.method = 'DELETE'
	this.request(params)
}

module.exports.wxGet = wxGet
module.exports.wxPost = wxPost
module.exports.wxPut = wxPut
module.exports.wxDelete = wxDelete