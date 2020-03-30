<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.setStorage({
				key:this.$const.Storage.TOKEN,
				data:'hello'
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
