<template>
	<div class="more-list-view">
		<home-header></home-header>
		<div class="use-space" style="height: 56px;"></div>
		<pull-up-load v-show="isAjax"></pull-up-load>

		<div class="more-list-wrapper" ref="mvlist">
			<ul>
				<li>
					<div class="video-content">
						<div class="content" v-for="(mv,index) in newMVList" :key="index" @click="showVideo({axios:axios,router:$router,id:mv.id})">
							<div class="img-div">
								<img :src="mv.cover" alt="">
							</div>
							<div class="title">{{mv.name}} - {{mv.briefDesc}}</div>
							<div class="imfor">
								<span class="artist">{{mv.artistName}}</span>
								<span class="conut">播放次数:{{mv.playCount}}</span>
								<i class="good"></i>
								<i class="comm"></i>
							</div>
							<div style="height: 5px;background: #f2f2f2;"></div>
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
	import HomeHeader from '../../components/HomeHeader.vue'
	import PullUpLoad from '../../components/PullUpLoad.vue'
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'VideoView',
		data() {
			return {
				mvListScroll: null
			}
		},
		components: {
			HomeHeader,
			PullUpLoad
		},
		computed: {
			...mapState(['isAjax', 'scroll', 'loadMore']),
			...mapGetters(['newMVList'])
		},
		methods: {
			...mapActions(['setScroll', 'refreshScroll', 'getNewMVList', 'showVideo']),
			setScrollComponent() {
				if (this.mvListScroll === null) {
					this.setScroll({
						name: 'mvListScroll',
						scroll: this.mvListScroll,
						ref: this.$refs.mvlist
					})
					this.mvListScroll = this.scroll['mvListScroll']
				} else {
					this.refreshScroll(this.scroll['mvListScroll'])
				}
				if (this.scroll['mvListScroll'] !== null) {
					this.scroll['mvListScroll'].on('pullingDown', () => {
						this.getNewMVList({
							axios: this.axios
						})
						this.scroll['mvListScroll'].finishPullDown()
					})
					this.scroll['mvListScroll'].on('pullingUp', () => {
						this.getNewMVList({
							axios: this.axios
						})
						this.scroll['mvListScroll'].finishPullUp()

					})
				}
			}
		},
		created() {
			this.getNewMVList({
				axios: this.axios
			})
		},
		mounted() {
			this.getNewMVList({
				axios: this.axios
			})
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

		.more-list-wrapper {
			position: relative;
			height: 100%;
			width: 100%;

			.video-content {
				margin-top: 5px;

				.content {
					margin-top: 8px;
					width: 100%;

					.img-div {
						margin: 0 auto;
						width: 96%;

						&>img {
							width: 100%;
							border-radius: 3px;
						}
					}

					.title {
						margin: 0 auto;
						width: 96%;
						height: 28px;
						line-height: 28px;
						font-size: 14px;
						color: #000;
						border-bottom: 1px solid #f2f2f2;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.imfor {
						margin: 0 auto;
						display: flex;
						height: 28px;
						line-height: 28px;
						width: 96%;

						.artist,
						.conut {
							display: inline-block;
							flex: 1;
							font-size: 11px;
							color: #000;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						&>i {
							display: inline-block;
							flex: 0 0 40px;
							width: 40px;
						}

						.good {
							background: url(../../../public/images/video_list_good.png) center center no-repeat;
							background-size: 18px;
						}

						.comm {
							background: url(../../../public/images/video_list_comm.png) center center no-repeat;
							background-size: 18px;
						}
					}
				}
			}
		}

		.use-space {
			height: 44px;
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
