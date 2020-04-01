<script>
	import { mapMutations } from 'vuex';
	export default {
		onLaunch: function(e) {
			this.save(e.query.sn)
			try{
				let user = wx.getStorageInfoSync(this.$const.Storage.USER)
				if(user){
					this.login(user)
					//this.check()
				}
			}catch(e){
				this.$log("App onLoad=>Storage=>error",e)
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		methods:{
			...mapMutations(['login','logout']),
			/**
			 * 检查 user 登录状态
			 */
			check(){
				let url = this.$api.check_user
				this.$fetch.get(url).then(res=>{
					this.$log('APP CHECKER USER',res)
					if(res.err_code === 0){
						this.login(res.data.user)
					}else if(res.err_code === 4000){
						this.logout()
					}
				})
			},
			
			/**
			 * 保存sn,用于锁粉推广
			 */
			save(sn){
				if(sn && sn.length>4 && !this.$store.state.logined){
					wx.setStorage({
						key:this.$const.Storage.SN,
						data:sn
					})
				}
			},
			
			/**
			 *  小程序更新
			 */
			update () {
				if (wx.canIUse('getUpdateManager')) {
					let manager = wx.getUpdateManager()
					manager.onCheckForUpdate(function(res) {
						if (res.hasUpdate) {
							manager.onUpdateReady(function() {
								wx.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) {
											manager.applyUpdate()
										}
									}
								})
							})
							manager.onUpdateFailed(function() {
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
								})
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	image{
		background-color: #F8F8F8;
	}
	
	Page{
		background-color: #F8F8F8;
	}
	
	.flex{
		display: flex;
		align-items: center;
	}
	
	
</style>
