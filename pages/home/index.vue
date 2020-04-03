<template>
	<view>
		<text>这是home页</text>
	</view>
</template>

<script>
	import { mapState } from 'vuex'; 
	export default {
		data() {
			return {
				inited:false,
				pageIndex:1
			};
		},
		computed:{
			...mapState(['logined','user']) // 应用内数据状态共享
		},
		onLoad(options) {
			
		},
		onShow(options) {
			
		},
		onReady(){
			
		},
		onHide() {
			
		},
		onPullDownRefresh() {
			
		},
		onReachBottom() {
			
		},
		methods:{
			loadData(){
				let url = this.$api.home;
				let data = {
					page:1,
					type:'home'
				}
				let options = {
					header:{
						sn:'aslkdfj',
						Authorization:'Bear 123456789'
					},
					requestId:'home-fetch',
				}
				
				this.$fetch.get(url,data,options).then(res=>{
					this.$log('HOME LOAD',res)
				},err=>{
					this.$log('HOME LOAD FAIL',err)
				})
				// let _this = this
				// setTimeout(()=>{
				// 	_this.$fetch.cancel(options.requestId)
				// },50)
			}
		},
		
		
	}
</script>

<style lang="less">

</style>
