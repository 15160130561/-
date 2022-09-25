<template>
	<view class="list">
		<view class="fixbg" :style="{ backgroundImage: 'url(' + playList.coverImgUrl + ')' }"></view>
		<musichead title='歌单' :icon='true' color='white'></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playList.coverImgUrl"></image>
						<text class="iconfont iconyousanjiao">{{formatCount(playList.playCount)}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playList.name}}</view>
						<view>
							<image src="../../static/wangyiyunyinyue.png"></image>网易云音乐
						</view>
						<view>
							{{playList.description}}
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="list-share">
					<text class="iconfont iconicon-"></text>分享给微信好友
				</button>
				<!-- #endif -->

				<view class="list-music">
					<view class="list-music-title">
						<text class="iconfont iconbofang1"></text>
						<text>播放全部</text>
						<text>(共{{playList.trackCount}}首)</text>
					</view>

					<view class="list-music-item" v-for="(item,index) in playList.tracks" :key='index'
						@tap="handleToDetail(item.id)">
						<view class="list-music-top">{{index + 1}}</view>
						<view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<image src="../../static/dujia.png" mode=""></image>
								<image src="../../static/sq.png" mode=""></image>
								{{item.ar[0].name}} - {{item.name}}
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view>

				</view>


			</scroll-view>
		</view>

	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		list
	} from "../../common/api.js";
	export default {
		data() {
			return {
				playList: {
					coverImgUrl: "",
					trackCount: "",
				 creator: "",
				},
				isLoading: true
			}
		},
		methods: {
			// 人数改变
			formatCount(value) {
				if (value >= 10000 && value < 100000000) {
					value /= 10000;
					return value.toFixed(1) + '万';
				} else if (value >= 100000000) {
					value /= 100000000;
					return value.toFixed(1) + '亿';
				} else {
					return value;
				}
			},
			// 歌曲跳转
			handleToDetail(songId) {
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				})
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:'加载中'
			})
			list(options.listId).then((res) => {
				if (res.data.code == '200') {
				 this.playList = res.data.playlist
				this.$store.commit("INIT_CHANGE",  res.data.playlist.trackIds);
					this.isLoading = false
					 uni.hideLoading()
				}
		 })
		},
		comments: {
			musichead
		}
	}
</script>

<style scoped>
	.list-head {
		display: flex;
		margin: 30rpx;
	}

	.list-head-img {
		width: 265rpx;
		height: 265rpx;
		border-radius: 15rpx;
		margin-right: 40rpx;
		overflow: hidden;
		position: relative;
	}

	.list-head-img image {
		width: 100%;
		height: 100%;
	}

	.list-head-img text {
		position: absolute;
		font-size: 26rpx;
		color: white;
		right: 8rpx;
		top: 8rpx;
	}

	.list-head-text {
		flex: 1;
		font-size: 24rpx;
		color: #c3d1e3;
	}

	.list-head-text image {
		width: 52rpx;
		height: 52rpx;
		border-radius: 50%;
	}

	.list-head-text view:nth-child(1) {
		font-size: 34rpx;
		color: #ffffff;
	}

	.list-head-text view:nth-child(2) {
		display: flex;
		align-items: center;
		margin: 30rpx 0;
	}

	.list-head-text view:nth-child(2) text {
		margin-left: 15rpx;
	}

	.list-head-text view:nth-child(3) {
		line-height: 38rpx;
	}

	.list-share {
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 37rpx;
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;
	}

	.list-share text {
		margin-right: 16rpx;
	}

	.list-music {
		background: white;
		border-radius: 50rpx;
		overflow: hidden;
		margin-top: 45rpx;
	}

	.list-music-title {
		height: 58rpx;
		line-height: 58rpx;
		margin: 30rpx 30rpx 70rpx 30rpx;
	}

	.list-music-title text:nth-child(1) {
		font-size: 58rpx;
	}

	.list-music-title text:nth-child(2) {
		font-size: 34rpx;
		margin: 0 10rpx 0 25rpx;
	}

	.list-music-title text:nth-child(3) {
		font-size: 28rpx;
		color: #b2b2b2;
	}

	.list-music-item {
		display: flex;
		margin: 0 30rpx 70rpx 44rpx;
		align-items: center;
	}

	.list-music-top {
		width: 56rpx;
		font-size: 28rpx;
		color: #979797;
	}

	.list-music-song {
		flex: 1;
		line-height: 40rpx;
	}

	.list-music-song view:nth-child(1) {
		font-size: 30rpx;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song view:nth-child(2) {
		font-size: 22rpx;
		color: #a2a2a2;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song image {
		width: 34rpx;
		height: 22rpx;
		margin-right: 10rpx;
	}

	.list-music-item text {
		font-size: 50rpx;
		color: #c8c8c8;
	}
</style>
