<template>
	<view class="music-head" :style="{color : color}">
		<view class="music-head-icon" v-if="icon" :class="{ 'music-head-iconBlack' : iconBlack }">
			<text class="iconfont iconzuojiantou-copy" @click="handleToBack"></text> |
			<text class="iconfont iconshouye"  @click="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musichead",
		data(){
			return {
				
			};
		},
		props:['title','icon','color','iconBlack'],
		methods:{
			handleToBack(){
				 uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.music-head{
		width: 100%;
		height: 75px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
        color: black;
		position: relative;
	}
	.music-head-icon{
		position: absolute;
		left: 8px;
		top: 33px;
		width: 90px;
		height: 30px;
		background-color: rgb(0, 0, 0,0.4);
		color: white;
		line-height: 31px;
		border-radius: 15px;
		display: flex;
		justify-content: space-evenly;
	}
	.music-head-iconBlack{ color:black; background:white; border:1px black solid;}

</style>