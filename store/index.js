import Vue from 'vue';
import Vuex from 'vuex';
import constant from '../common/const.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		logined:false, // 登录状态
		token:'',
		user:{}, // user信息
		product:{} // produc:同一时间仅保存一个商品信息
	},
	mutations:{
		
		/**
		 * @param {Object} data token value
		 */
		setToken(state,data){
			state.token = data
		},
		
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
			state.user = data;
			wx.clearStorage()
		},
		
		/**
		 * @param {Object} data 插入一条产品信息，临时媒介
		 */
		produc(state,data){
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
						if(res.data.length >= 18){ // 保留最新的20条数据
							res.data.pop()
						}
						res.data.shift(data)
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
	actions:{}
})

export default store;
