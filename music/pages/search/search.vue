<template>
	<view class="search">
		<musichead title='搜索' :icon='true' :iconBlack="true"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch(searchWord)" @input="handleToSuggest">
					<text class="iconfont iconguanbi" v-show="searchType != 1" @tap="handleToClose"></text>
				</view>

				<block v-if="searchType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont iconlajitong" @tap="handleToClear"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item,index) in searchHistory" :key="index" @tap="handleToWord(item)">{{item}}
							</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">热搜榜</view>
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index"
							@tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{index + 1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}
									<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view>{{item.content}}</view>
							</view>
							<text class="search-hot-count">{{item.score}}</text>
						</view>
					</view>
				</block>

				<block v-else-if="searchType == 2">
					<view class="search-result">
						<view class="search-result-item" v-for="(item,index) in searchList" :key='index'
							@tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>
									<view> {{item.al.name}}- {{item.ar[0].name}}</view>
								</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
					</view>
				</block>

				<block v-else-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-head">搜索"{{this.searchWord}}"</view>
						<view class="search-suggest-item" v-for="(item,index) in suggestList" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont iconsearch"></text>
							{{item.keyword}}
						</view>
					</view>
				</block>


			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '../../common/iconfont.css'
	import {
		searchHot,
		searchWord,
		searchSuggest
	} from '../../common/api.js'
	export default {
		data() {
			return {
				searchHot: [],
				searchWord: '',
				searchHistory: [],
				searchType: 1,
				searchList: [],
				suggestList : []
			}
		},
		onLoad() {
			// 热搜榜渲染
			searchHot().then((res) => {
				if (res.data.code == '200') {
					this.searchHot = res.data.data
				}
			});
			uni.getStorage({
				key: 'searchHistory',
				success: (res) => {
					this.searchHistory = res.data;
				}
			})

		},
		methods: {
			// 点击热搜榜,历史记录,搜索推荐
			handleToWord(word) {
				this.searchWord = word
				this.handleToSearch(word)
			},
			// 搜索添加历史记录
			handleToSearch(word) {
				this.searchHistory.unshift(word)
				// 去重
				this.searchHistory = [...new Set(this.searchHistory)];
				if (this.searchHistory.length > 10) {
					this.searchHistory.length = 10
				}

				uni.setStorage({
					key: 'searchHistory',
					data: this.searchHistory
				});
				this.getSearchList(word)
			},
			// 清空历史记录
			handleToClear() {
				uni.removeStorage({
					key: 'searchHistory',
					success: () => {
						this.searchHistory = [];
					}
				});
			},
			// 搜索
			getSearchList(word) {
				searchWord(word).then((res) => {
					if (res.data.code == '200') {
						this.searchList = res.data.result.songs
						this.searchType = 2
					}
				})
			},
			// 点击搜索关闭
			handleToClose() {
				this.searchWord = ''
				this.searchType = 1
			},
			// 点击跳转播放
			handleToDetail(songId) {
				uni.navigateTo({
					url: '/pages/detail/detail?songId=' + songId
				})
			},
			// 输入事件
			handleToSuggest(event){
				let value = event.detail.value
				if(!value){
					this.searchType = 1
				}
				searchSuggest(value).then((res)=>{
					if(res.data.code == '200'){
						this.suggestList = res.data.result.allMatch
						this.searchType = 3
					}
				})
			}
		},
		components: {
			musichead
		}
	}
</script>

<style scoped>
	.search-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}

	.search-search text {
		margin: 0 26rpx;
	}

	.search-search input {
		flex: 1;
		font-size: 26rpx;
	}

	.search-history {
		margin: 0 30rpx;
		font-size: 26rpx;
	}

	.search-history-head {
		display: flex;
		justify-content: space-between;
	}

	.search-history-list {
		display: flex;
		margin-top: 36rpx;
		flex-wrap: wrap;
	}

	.search-history-list view {
		padding: 20rpx 40rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}

	.search-hot {
		margin: 30rpx 30rpx;
		font-size: 26rpx;
		color: #bebebe;
	}

	.search-hot-head {}

	.search-hot-item {
		display: flex;
		align-items: center;
		margin-top: 40rpx;
	}

	.search-hot-top {
		width: 60rpx;
		color: #fb2221;
		font-size: 34rpx;
	}

	.search-hot-word {
		flex: 1;
	}

	.search-hot-word view:nth-child(1) {
		font-size: 36rpx;
		color: black;
	}

	.search-hot-word view:nth-child(2) {
		font-size: 24rpx;
		color: #878787;
	}

	.search-hot-word image {
		width: 48rpx;
		height: 22rpx;
	}

	.search-hot-count {
		color: #878787;
	}

	.search-result {
		border-top: 2rpx #e5e5e5 solid;
		padding: 30rpx;
	}

	.search-result-item {
		display: flex;
		align-items: center;
		border-bottom: 2rpx #e5e5e5 solid;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
	}

	.search-result-item text {
		font-size: 50rpx;
	}

	.search-result-word {
		flex: 1;
	}

	.search-result-word view:nth-child(1) {
		font-size: 28rpx;
		color: #3e6694;
	}

	.search-result-word view:nth-child(2) {
		font-size: 26rpx;
	}

	.search-suggest {
		border-top: 2rpx #e5e5e5 solid;
		padding: 30rpx;
		font-size: 26rpx;
	}

	.search-suggest-head {
		color: #537caa;
		margin-bottom: 40rpx;
	}

	.search-suggest-item {
		color: #666666;
		margin-bottom: 70rpx;
	}

	.search-suggest-item text {
		color: #c2c2c2;
		font-size: 26rpx;
		margin-right: 26rpx;
	}
</style>
