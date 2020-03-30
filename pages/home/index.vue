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
			this.$log("HOME ONLOAD",options)
			this.loadData()
			// this.loadData_v2()
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
				let params = {
					page:1,
					type:'home'
				}
				let options = {
					header:{
						sn:'aslkdfj'
					},
					Authorization:'Bear 123456789...',
				}
				
				this.$fetch.get(url,params,options)
				return
				
				this.$fetch.get(url,params,options).then(res=>{
					console.log('Home load data:',res)
				},err=>{
					console.log('Home error:',err)
				},compele=>{
					console.log('Home compele:',compele)
				})
			},
			
			loadData_v2(){
				let url = this.$api.home
				let data = {
						page:1,type:'home'
				}
				let options = {
					header:{
						sn:'aslkdfj'
					},
					Authorization:'Bear 123456789...',
					success(res){
						console.log("success:",res)
					},
					fail(e){
						console.log("fail:",res)
					}
				}
				this.$fetch.get(url,data,options)
			}
		},
		
		
	}
</script>

<style lang="less">

</style>
