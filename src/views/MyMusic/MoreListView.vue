<template>
	<div class="more-list-view">
		<div class="more-list-header">
			<i class="account-icon back" @click="goBack({router:$router})"></i>
			<div class="title">精选歌单</div>
			<i class="account-icon search"></i>
			<i class="account-icon more"></i>
		</div>
		<div class="more-list-wrapper" ref="morelistul">
			<ul>
				<li>
					<pull-up-load v-show="isAjax"></pull-up-load>
				</li>
				<li>
					<div class="use-space"></div>
					<div class="song-header">
						<div class="title">网友精选</div>
						<span :class="goodListOrder=='new' ? 'active' : ''" @click="toGoodSongList({axios:axios,router:$router,order:'new'})">最新</span>
						<span :class="goodListOrder=='hot' ? 'active' : ''" @click="toGoodSongList({axios:axios,router:$router,order:'hot'})">最热</span>
					</div>
					<div class="more-content" ref="container">
						<div class="content">
							<div class="content-item" v-for="(goods,goodindex) in goodSongList" :key="goodindex" @click="getSongListDetail({axios:axios,router:$router,listid:goods.id,audioType:'music'})">
								<div class="content-img">
									<img :src="goods.coverImgUrl" alt="">
								</div>
								<span class="title">{{goods.name}}</span>
							</div>
						</div>
					</div>
					<div class="loading" v-show="loadMore">加载中</div>
					<div class="use-space"></div>
				</li>
			</ul>

		</div>

	</div>
</template>

<script>
	import PullUpLoad from '../../components/PullUpLoad.vue'
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'MoreListView',
		data() {
			return {
				moreListScroll: null
			}
		},
		components: {
			PullUpLoad
		},
		computed: {
			...mapState(['isAjax', 'scroll', 'loadMore']),
			...mapGetters(['songList', 'goodSongList', 'goodListOrder'])
		},
		methods: {
			...mapActions(['goBack', 'setScroll', 'refreshScroll', 'getGoodSongList', 'toGoodSongList', 'getSongListDetail']),
			setScrollComponent() {
				if (this.moreListScroll === null) {
					this.setScroll({
						name: 'moreListScroll',
						scroll: this.moreListScroll,
						ref: this.$refs.morelistul
					})
					this.moreListScroll = this.scroll['moreListScroll']
				} else {
					this.refreshScroll(this.scroll['moreListScroll'])
				}
				if (this.scroll['moreListScroll'] !== null) {
					this.scroll['moreListScroll'].on('pullingDown', () => {
						this.scroll['moreListScroll'].finishPullDown()
					})
					this.scroll['moreListScroll'].on('pullingUp', () => {
						this.getGoodSongList({
							axios: this.axios
						})
						this.scroll['moreListScroll'].finishPullUp()

					})
				}
			},
			load() {
				this.getGoodSongList({
					axios: this.axios
				})
			}

		},
		mounted() {
			this.setScrollComponent()
		},
		updated() {
			this.setScrollComponent()
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #000;

	.more-list-view {
		height: 100%;
		width: 100%;

		//头部
		.more-list-header {
			display: flex;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 44px;
			background: @light-theme-bg;
			z-index: 999;

			.back {
				margin-left: 2px;
				padding-top: 12px;
				flex: 0 0 32px;
				display: inline-block;
				height: 44px;
				width: 32px;
				background: url(../../../public/images/login_back.png) center center no-repeat;
				background-size: 18px;
			}

			.search {
				margin-left: 2px;
				padding-top: 12px;
				flex: 0 0 32px;
				display: inline-block;
				height: 44px;
				width: 32px;
				background: url(../../../public/images/header_search.png) center center no-repeat;
				background-size: 20px;
			}

			.more {
				margin-left: 2px;
				padding-top: 12px;
				flex: 0 0 32px;
				display: inline-block;
				height: 44px;
				width: 32px;
				background: url(../../../public/images/header_more.png) center center no-repeat;
				background-size: 20px;
			}

			.title {
				flex: 1;
				display: inline-block;
				padding-left: 3px;
				height: 44px;
				line-height: 44px;
				vertical-align: top;
				font-size: 14px;
				text-align: center;
				color: #fff;
			}
		}

		.more-list-wrapper {
			position: relative;
			height: 100%;
			width: 100%;
		}

		.use-space {
			height: 44px;
		}

		.song-header {
			display: flex;
			height: 40px;
			border-bottom: .5px solid #d9d9d9;

			&>div {
				padding-left: 8px;
				flex: 1;
				font-size: 14px;
				line-height: 40px;
			}

			&>span {
				display: inline-block;
				flex: 0 0 46px;
				height: 40px;
				line-height: 40px;
				font-size: 13px;
				text-align: center;

				&.active {
					color: #D23023;
				}
			}

		}

		// 列表
		.more-content {
			.content {
				display: flex;
				width: 100%;
				flex-wrap: wrap;

				.content-item {
					padding-bottom: 8px;
					flex: 0 0 50%;
					text-align: center;

					.content-img {
						&>img {
							height: 90%;
							width: 90%;
							border-radius: 5px;
						}
					}

					.title {
						width: 92%;
						display: inline-block;
						padding: 5px 6px;
						text-align: left;
						font-size: 13px;
						color: #000;
					}

				}

			}

		}

		//加载中
		.loading {
			height: 40px;
			width: 100%;
			text-align: center;
			color: #a6a6a6;
			font-size: 14px;
		}

	}
</style>
