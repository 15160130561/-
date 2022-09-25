<template>
	<view class="detail">
		<view class="fixbg" :style="{backgroundImage:'url('+ songDetail.al.picUrl +')'}"></view>
		<musichead :title='songDetail.name' :icon='true' color='white'></musichead>
		<view class="container"  v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-play" @tap="handleToPlay">
					<image :src="songDetail.al.picUrl" mode="" :class="{ 'detail-play-run' : isplayrotate }"></image>
					<text class="iconfont" :class="iconPlay"></text>
					<view></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap"
						:style="{ transform : 'translateY(' +  - (lyricIndex - 1) * 82  + 'rpx)' }">
						<view class="detail-lyric-item" v-for="(item,index) in songLyric"
							:class="{active : lyricIndex == index}" :key="index">{{item.lyric}}</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-title">喜欢这首歌的人也听</view>
					<view class="detail-like-item" v-for="(item,index) in songSimi" :key='index'
						@tap="handleToSimi(item.id)">
						<view class="detail-like-img">
							<image :src="item.album.picUrl" mode=""></image>
						</view>
						<view class="detail-like-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70"
									src="../../static/dujia.png" mode=""></image>
								<image v-if="item.privilege.maxbr == 999000" src="../../static/sq.png" mode=""></image>
								{{item.artists[0].name}} - {{item.name}}
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-title">精彩评论</view>
					<view class="detail-comment-item" v-for="(item,index) in songComment" :key='index'>
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-head">
								<view class="detail-comment-name">
									<view>{{item.user.nickname}}</view>
									<view>{{time(item.time)}}</view>
								</view>
								<view class="detail-comment-like">
									{{likedCount(item.likedCount)}}
									<text class="iconfont iconlike"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								{{item.content}}
							</view>
						</view>
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
		songDetail,
		songUrl,
		songLyric,
		songSimi,
		songComment
	} from '../../common/api.js';
	export default {
		data() {
			return {
				songDetail: {
					al: {
						picUrl: ''
					}
				},
				songSimi: [],
				songComment: [],
				songLyric: [],
				lyricIndex: 0,
				iconPlay: 'iconpause',
				isplayrotate: true,
				isLoading: true
			}
		},
		onLoad(options) {
			this.playMusic(options.songId)
		},
		onUnload() {
			clearInterval(this.timer);
			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
		onHide() {
			clearInterval(this.timer);
			// #ifdef H5
			this.bgAudioManager.destroy()
			// #endif
		},
		methods: {
			// 点赞人数
			likedCount(value) {
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
			// 时间戳改格式
			time(value) {
				var date = new Date((value))
				return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
			},
			// 喜欢这首歌跳转
			handleToSimi(songId) {
				this.playMusic(songId);
			},
			playMusic(songId) {
				this.$store.commit('NEXT_ID',songId);
				this.isLoading = true
				uni.showLoading({
					title:'加载中'
				})
				Promise.all([songDetail(songId), songSimi(songId), songComment(songId), songLyric(songId), songUrl(
					songId)]).then((res) => {
					if (res[0].data.code == '200') {
						this.songDetail = res[0].data.songs[0]
					}
					if (res[1].data.code == '200') {
						this.songSimi = res[1].data.songs
					}
					if (res[2].data.code == '200') {
						this.songComment = res[2].data.hotComments
					}
					if (res[3].data.code == '200') {
						let lyric = res[3].data.lrc.lyric
						let re = /\[([^\]]+)\]([^[]+)/g;
						var result = []
						lyric.replace(re, ($0, $1, $2) => {
							result.push({
								'time': this.formatTimeToSec($1),
								'lyric': $2
							})
						})
						this.songLyric = result
					}
					if (res[4].data.code == '200') {
						// #ifdef MP-WEIXIN
						this.bgAudioManager = uni.getBackgroundAudioManager();
						this.bgAudioManager.title = this.songDetail.name
						// #endif

						// #ifdef H5
						if(!this.bgAudioManager){
								this.bgAudioManager = uni.createInnerAudioContext();
						}
					
						this.iconPlay = 'iconbofang1';
						this.isplayrotate = false;
						// #endif
						this.bgAudioManager.src = res[4].data.data[0].url || ''
						// this.listenLyricIndex()
						this.bgAudioManager.onPlay(() => {
							this.iconPlay = 'iconpause'
							this.isplayrotate = true
							this.listenLyricIndex()
						})
						this.bgAudioManager.onPause(() => {
							this.iconPlay = 'iconbofang1'
							this.isplayrotate = false
							this.cancelLyricIndex()
						})
						this.bgAudioManager.onEnded(()=>{
							this.playMusic(this.$store.state.nextId);
						})
					}
					  uni.hideLoading()
						this.isLoading = false
				})
			},
			// 歌词时间
			formatTimeToSec(value) {
				let arr = value.split(':')
				return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(2);
			},
			// 监听暂停播放
			handleToPlay() {
				if (this.bgAudioManager.paused) {
					this.bgAudioManager.play()
				} else {
					this.bgAudioManager.pause()
				}
			},
			// 歌词滚动
			listenLyricIndex() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					for (var i = 0; i < this.songLyric.length; i++) {
						if (this.songLyric[this.songLyric.length - 1].time < this.bgAudioManager.currentTime) {
							this.lyricIndex = this.songLyric.length - 1;
							break;
						}
						if (this.songLyric[i].time < this.bgAudioManager.currentTime && this.songLyric[i + 1]
							.time > this.bgAudioManager.currentTime) {
							this.lyricIndex = i;
						}
					}

				}, 500)
			},
			cancelLyricIndex() {
				clearInterval(this.timer);
			},

		},
		components: {
			musichead
		}
	}
</script>

<style scoped>
	.detail-play {
		width: 580rpx;
		height: 580rpx;
		background: url(~@/static/disc.png);
		background-size: cover;
		margin: 214rpx auto 0 auto;
		position: relative;
	}

	.detail-play image {
		width: 370rpx;
		height: 370rpx;
		border-radius: 50%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		animation: 10s linear move infinite;
		animation-play-state: paused;
	}

	.detail-play .detail-play-run {
		animation-play-state: running;
	}

	@keyframes move {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.detail-play text {
		width: 100rpx;
		height: 100rpx;
		font-size: 100rpx;
		color: white;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.detail-play view {
		position: absolute;
		width: 170rpx;
		height: 266rpx;
		position: absolute;
		left: 60rpx;
		right: 0;
		margin: auto;
		top: -170rpx;
		background: url(~@/static/needle.png);
		background-size: cover;
	}

	.detail-lyric {
		height: 246rpx;
		line-height: 82rpx;
		font-size: 32rpx;
		text-align: center;
		color: #949495;
		overflow: hidden;
	}

	.detail-lyric-wrap {
		transition: 0.5s;
	}

	.active {
		color: white;
	}

	.detail-lyric-wrap {
		transition: .5s;
	}

	.detail-lyric-item {
		height: 82rpx;
	}

	.detail-like {
		margin: 0 32rpx;
	}

	.detail-like-title {
		font-size: 36rpx;
		color: white;
		margin: 50rpx 0;
	}

	.detail-like-list {}

	.detail-like-item {
		display: flex;
		margin-bottom: 38rpx;
		align-items: center;
	}

	.detail-like-img {
		width: 82rpx;
		height: 82rpx;
		border-radius: 15rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.detail-like-img image {
		width: 100%;
		height: 100%;
	}

	.detail-like-song {
		flex: 1;
	}

	.detail-like-song view:nth-child(1) {
		color: white;
		font-size: 30rpx;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 10rpx;
	}

	.detail-like-song view:nth-child(2) {
		font-size: 22rpx;
		color: #a2a2a2;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.detail-like-song image {
		width: 34rpx;
		height: 22rpx;
		margin-right: 10rpx;
	}

	.detail-like-item text {
		font-size: 50rpx;
		color: #877764;
	}

	.detail-comment {
		margin: 0 32rpx;
	}

	.detail-comment-title {
		font-size: 36rpx;
		color: white;
		margin: 50rpx 0;
	}

	.detail-comment-item {
		display: flex;
		margin-bottom: 28rpx;
	}

	.detail-comment-img {
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 18rpx;
	}

	.detail-comment-img image {
		width: 100%;
		height: 100%
	}

	.detail-comment-content {
		flex: 1;
		color: #cac9cd;
	}

	.detail-comment-head {
		display: flex;
		justify-content: space-between;
	}

	.detail-comment-name view:nth-child(1) {
		font-size: 24rpx;
	}

	.detail-comment-name view:nth-child(2) {
		font-size: 20rpx;
	}

	.detail-comment-like {
		font-size: 30rpx;
	}

	.detail-comment-text {
		line-height: 40rpx;
		color: white;
		font-size: 28rpx;
		margin-top: 16rpx;
		border-bottom: 1px #595860 solid;
		padding-bottom: 40rpx;
	}
</style>
