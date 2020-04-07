import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import request from './common/request.js'
import constant from './common/const.js'
import config from './common/config.js'
import api from './common/api.js'

Vue.config.productionTip = false


// 全局 log
const log = (TAG,value,level='log')=>{
	if(config.env === constant.Env.PRO){
		 return
	}
	if(level === 'log'){
		console.log(`------"${TAG}"----->>>`)
		console.log(value)
		console.log(`<<<----------------`)
	}else if(level === 'error'){
		console.log(`------"${TAG}"----->>>`)
		console.error(value)
		console.log(`<<<----------------`)
	}else{
		console.log(`------"${TAG}"----->>>`)
		console.warn(value)
		console.log(`<<<----------------`)
	}
};

//	全局 toast
const showToast = (msg,duration =2000,icon = 'none') =>{
	wx.showToast({
		title:msg,
		duration:duration,
		icon:icon
	})
}

// 全局 loading...
const showLoading = (title ='加载中...',mask=true) =>{
	wx.showLoading({
		title:title,
		mask:mask
	})
}

Vue.prototype.$config = config;
Vue.prototype.$api = api;
Vue.prototype.$store = store; // vuex store
Vue.prototype.$const = constant; // 全局常量池 : this.$const.Storage.HISTORY
Vue.prototype.$log = log; // 全局log : this.$log(tag,msg)
Vue.prototype.$showToast = showToast; // 全局toast : this.$showToast("hello")
Vue.prototype.$showLoading = showLoading; // 全局toast : this.$showToast("hello")
Vue.prototype.$fetch = request;

App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
