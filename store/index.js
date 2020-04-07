/**
直接获取`state`和使用`getter`获取:
1. 使用`this.$store.***.***`
  	let product = this.$store.state.product
  	let token = this.$store.getters.getUserToken
2. 使用`mapState`和`mapGetters` ,可以绑定到页面元素
	import {mapState,mapGetters} from 'vuex'
 	computed:{
		...mapState(['logined','user'])
		...mapGetters({sn:getUserSn,token:getUserToken})
	}
	onLoad(options){
		console.log(this.logined,this.user,this.sn,this.token)
	}
 
修改`state`值状态:`mutation`(仅支持同步操作)和`action`(支持异步操作)
1. 使用`this.$store.commit('***',data)` // data选填
 	this.$store.commit('login',{user:'w',age:26,gender:'male'}})
	this.$store.dispatch('relogin',{header:{token:'...'}})
2. 使用`mapMutations`和`mapActions`
	import {mapMutation,mapActions} from 'vuex'
	methods:{
		...mapMutations(['login','product'])
		...mapActions(['relogin','forceLogout'])
	}
	onLoad(options){
		this.product({title:'abc',id:'56565',...})
		this.forceLogout({header:{token:'...'})
	}
 */

import Vue from 'vue';
import Vuex from 'vuex';
import constant from '../common/const.js'
import api from '../common/api.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		logined:false, // 登录状态
		user:{}, // 用户user
		product:{} // produc:同一时间仅保存一个商品信息
	},
	getters:{ // 两种函数声明方式
		getUserSn(state){
			return state.user.sn
		},
		getUserToken:(state) =>{
			return state.user.token
		}
	},
	mutations:{
		/**
		 * @param {Object} data user info
		 */
		login(state,data){
			state.logined = true;
			state.user = data;
			wx.setStorage({
				key:constant.Storage.USER,
				data:data,
				success(e){},
				fail(e){
					console.error("Vuex -> login() -> setStorage() excetion:",e);
				}
			})
		},
		
		/**
		 * @param {Object} data logout 
		 */
		logout(state,data={}){
			state.logined = false;
			state.sn = ''
			state.token = ''
			state.user = data;
			wx.clearStorage()
			console.log("Vuex->logout")
		},
		
		/**
		 * @param {Object} data 插入一条产品信息，临时媒介
		 */
		product(state,data){
			state.product = data
		},
		/**
		 * @param {Object} data 浏览历史加入本地存储
		 */ 
		addHistory(state,data){
			let key = constant.Storage.HISTORY
			let temp = []
			wx.getStorage({
				key:key,
				success(res){
					if(res.data){
						if(res.data.length > 18){ // 保留最新的20条数据
							res.data.pop()
						}
						res.data.unshift(data)
						temp = res.data
					}else{
						temp.push(data)
					}
				},
				fail(){
					temp.push(data)
				},
				complete(){
					wx.setStorage({
						key:key,
						data:data,
						success(res){
							console.log("Add history:",res)
						},
						fail(e){
							console.error("Add history:",e)
						}
					})
				}
			})
		},
		/**
		 * remove history
		 */ 
		clearHistory(){
			wx.removeStorage({
				key:constant.Storage.HISTORY
			})
		}
	},
	actions:{
		// 强制退出
		forceLogout(context,options={}){
			let params = {
				url:api.logout,
				method:'POST',
				success:(res) =>{ // 如果调用处重写了success,这里的逻辑需要修改,建议直接使用complete
					context.commit('logout')
				}
			}
			Object.assign(params,options)
			wx.request(params)
		},
		// 重新获取微信code登录
		relogin({commit},options={}){
			wx.login({success:(res)=>{
				if(res.code){
					let params = {
						url:api.login,
						method:'POST',
						success:(res) =>{ // 如果调用处重写了success,这里的逻辑需要修改,建议直接使用complete
							commit('login',res.data.user)
						}
					}
					Object.assign(params,options)
					wx.request(params)
				}
			}})
		},
	}
})

export default store;
