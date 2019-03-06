<template>
	<div class="song-list-view" ref="videolist">
		<ul>
			<li>
				<div class="song-list-header">
					<i class="account-icon back" @click="goBackList"></i>
					<div class="title">{{showMvVideo.name}}</div>
					<i class="account-icon search"></i>
					<i class="account-icon more"></i>
				</div>
				<pull-up-load v-show="isAjax"></pull-up-load>
			</li>
			<li v-show="!isAjax">
				<div class="player">
					<video :src="showMvVideo.url" controls webkit-playsinline="true"></video>
				</div>
				<div class="imfor">
					<div class="title">{{showMvVideo.name}}</div>
					<div class="data">
						<span class="upload-time">发布时间: {{showMvVideo.time}}</span>
						<span class="play-count">播放次数: {{showMvVideo.count}}</span>
					</div>
					<div class="desc">{{showMvVideo.briefDesc}} <br> {{showMvVideo.desc}}</div>
					<div class="btn-list">
						<div class="btn-item">
							<i class="good"></i>
							<span>{{showMvVideo.likeCount}}</span>
						</div>
						<div class="btn-item">
							<i class="add"></i>
							<span>{{showMvVideo.subCount}}</span>
						</div>
						<div class="btn-item">
							<i class="comm"></i>
							<span>{{showMvVideo.commentCount}}</span>
						</div>
						<div class="btn-item">
							<i class="share"></i>
							<span>{{showMvVideo.shareCount}}</span>
						</div>
					</div>
					<div class="artist">
						<div>
							<mu-avatar :size="36">
								<img :src="showMvVideo.img">
							</mu-avatar>
						</div>
						<span>{{showMvVideo.artist}}</span>
						<mu-button class="btn" color="#d02323" round small>关注</mu-button>
					</div>
				</div>
			</li>
			<li v-show="!isAjax">
				<div class="simi-title">
					<span>相关推荐</span>
				</div>
				<div class="simi-wrapper">
					<div class="simi-item" v-for="(simi,simiindex) in simiMV" :key="simiindex" @click="showVideo({axios:axios,router:$router,id:simi.id})">
						<div class="img">
							<img :src="simi.cover" alt="" width="150" height="85">
						</div>
						<div class="imfo">
							<span class="name">{{simi.name}}</span>
							<span class="artist">{{simi.artistName}}</span>
						</div>
					</div>
				</div>
				<div class="use-space" style="height: 44px;"></div>
			</li>
		</ul>
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
		name: 'VideoPlayView',
		data() {
			return {
				videoPlayScroll: null
			}
		},
		components: {
			PullUpLoad
		},
		computed: {
			...mapState(['isAjax', 'scroll']),
			...mapGetters(['showMvVideo', 'simiMV'])
		},
		methods: {
			...mapActions(['goBack', 'setScroll', 'refreshScroll', 'showVideo']),
			setScrollComponent() {
				if (this.videoPlayScroll === null) {
					this.setScroll({
						name: 'videoPlayScroll',
						scroll: this.videoPlayScroll,
						ref: this.$refs.videolist
					})
					this.videoPlayScroll = this.scroll['videoPlayScroll']
				} else {
					this.refreshScroll(this.scroll['videoPlayScroll'])
				}
			},
			goBackList() {
				this.$router.push('/videoview')
			}
		},
		updated() {
			this.setScrollComponent()
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #000;

	.song-list-view {
		// position: fixed;
		height: 100%;
		width: 100%;
		z-index: 100;

		.use-space {
			height: 44px;
		}

		//头部
		.song-list-header {
			display: flex;
			height: 44px;
			background: @light-theme-bg;


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

		.use-space {
			height: 44px;
		}

		.player {
			width: 100%;

			&>video {
				width: 100%;
			}
		}

		.imfor {
			width: 100%;

			&>div {
				margin: 0 auto;
				width: 96%;
			}

			// 题目
			.title {
				line-height: 30px;
				font-size: 18px;
				font-weight: bold;
				color: #000;
			}

			// 视频数据
			.data {
				height: 20px;
				line-height: 20px;
				font-size: 13px;
				color: #808080;

				.upload-time {
					padding-right: 10px;
					border-right: 1px solid #d9d9d9;
				}

				.play-count {
					padding-left: 10px;
				}
			}

			// 简介
			.desc {
				padding: 5px 0;
				line-height: 18px;
				font-size: 15px;
			}

			//按钮
			.btn-list {
				display: flex;
				width: 100%;
				border-bottom: 1px solid #d9d9d9;

				.btn-item {
					padding: 5px 0;
					flex: 1;
					height: 60px;
					text-align: center;

					&>i {
						display: inline-block;
						height: 30px;
						width: 30px;
					}

					.good {
						background: url(../../../public/images/mv_btn_good.png) center center no-repeat;
						background-size: 22px;
					}

					.add {
						background: url(../../../public/images/mv_btn_add.png) center center no-repeat;
						background-size: 22px;
					}

					.comm {
						background: url(../../../public/images/mv_btn_comm.png) center center no-repeat;
						background-size: 18px;
					}

					.share {
						background: url(../../../public/images/mv_btn_share.png) center center no-repeat;
						background-size: 22px;
					}

					&>span {
						display: block;
						height: 18px;
						line-height: 14px;
						font-size: 14px;

					}
				}
			}


			.artist {
				position: relative;
				width: 100%;
				text-align: center;
				border-bottom: 1px solid #d9d9d9;

				&>div {
					position: absolute;
					top: 7px;
					left: 7px;
				}

				&>span {
					padding-left: 40px;
					display: inline-block;
					width: 96%;
					font-size: 14px;
					height: 50px;
					line-height: 50px;
					text-align: left;
					color: #000;

					.header {
						display: inline-block;
						height: 22px;
						line-height: 22px;
						width: 50px;
						border: 2px solid #d02323;
						border-radius: 15px;
						text-align: center;
					}
				}

				.btn {
					position: absolute;
					top: 11px;
					right: 0;
				}
			}
		}

		.simi-title {
			width: 100%;
			background: #d9d9d9;
			font-size: 14px;

			&>span {
				margin: 0 auto;
				display: block;
				height: 24px;
				line-height: 24px;
				width: 96%;
			}
		}

		.simi-wrapper {
			padding-top: 5px;
			width: 100%;

			.simi-item {
				margin: 0 auto;
				padding-bottom: 5px;
				display: flex;
				width: 96%;

				.img {
					&>img {
						border-radius: 5px;
					}
				}

				.imfo {
					padding-left: 5px;
					height: 88px;
					border-bottom: 1px solid #d9d9d9;

					.name {
						display: block;
						margin-top: 20px;
						font-size: 15px;
					}

					.artist {
						display: block;
						padding-top: 8px;
						color: #808080;
						font-size: 13px;
					}
				}
			}
		}
	}
</style>
