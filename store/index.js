import Vue from 'vue';
import Vuex from 'vuex';

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
			try {
			  wx.setStorageSync(this.$const.USER, data);
			} catch (e) {
				console.error("Vuex -> login() -> setStorage() excetion:",e);
			}
		},
		
		/**
		 * @param {Object} data logout 
		 */
		logout(state,data){
			state.logined = false;
			state.user = {};
			try {
			  wx.removeStorageSync()
			} catch (e) {
				console.error("Vuex -> logout() -> setStorage() excetion:",e)
			}
		},
		// 插入一条产品信息，临时媒介
		produc(state,data){
			state.product = data
		},
		// 浏览历史加入本地存储
		addHistory(state,data){
			let key = this.$const.Storage.HISTORY
			wx.getStorage({
				key:key,
				success(res){
					if(res.data){
						if(res.data.length > 20){ // 保留最新的20条数据
							res.data.pop()
						}
						res.data.shift(data)
						wx.setStorage({
							key:this.$const.Storage.HISTORY,
							data:data,
							success(){
								
							},
							fail(){
								
							}
						})
					}
				},
				fail(){
					
				}
			})
			
		},
		// remove history
		clearHistory(){
			wx.removeStorage({
				key:this.$const.Storage.HISTORY
			})
		}
	},
	actions:{}
})

export default store;
