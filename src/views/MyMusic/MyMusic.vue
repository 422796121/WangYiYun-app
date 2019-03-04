<template>
	<div class="my-music-view" v-show="!isAjax">

		<v-touch v-on:swipeleft="swiperleft">
			<div class="bg"></div>
			<div class="unlogin-wrapper">
				<div>
					<mu-avatar size="32" @click="toLogin" v-if="!loginUserStatus">
						<img src="../../../public/images/b8i.png" width="40" height="40">
					</mu-avatar>
					<mu-avatar size="32" @click="toLogin" v-else>
						<img :src="userDetail.profile.avatarUrl" width="40" height="40">
					</mu-avatar>
					<div class="content" @click="toLogin" v-if="!loginUserStatus">
						<span>未登录</span>
					</div>
					<div class="content" v-else>
						<span>{{userDetail.profile.nickname}}</span>
					</div>
					<div class="btn">
						<mu-button round>签到</mu-button>
					</div>
				</div>
			</div>
			<div class="my-music-wrapper">
				<div class="column">
					<div class="use-space"></div>
					<div class="local-music">
						<i></i>
						<span>本地音乐<em class="count">(0)</em></span>
					</div>
					<div class="recent-play">
						<i></i>
						<span>最近播放<em class="count">(0)</em></span>
					</div>
					<div class="download">
						<i></i>
						<span>下载管理<em class="count">(0)</em></span>
					</div>
					<div class="my-radio">
						<i></i>
						<span>我的电台<em class="count">(0)</em></span>
					</div>
					<div class="my-collect">
						<i></i>
						<span>我的收藏<em class="count">(0)</em></span>
					</div>
				</div>
				<div class="song-sheet">
					<div class="song-sheet-wrapper">
						<div class="header" @click="songSheet = !songSheet">
							<i class="up-icon" :class="songSheet?'':'down-icon'"></i>
							<span>创建的歌单</span>
							<i class="config"></i>
						</div>
						<div class="content" v-show="songSheet" v-if="!loginUserStatus" @click="toLogin">
							<div class="song-sheet-item">
								<div class="cover">
									<img v-if="!loginUserStatus" src="https://p1.music.126.net/EWC8bPR8WW9KvhaftdmsXQ==/3397490930543093.jpg?param=48y48"
									 width="48" height="48">
								</div>
								<div class="text">
									<div class="name">我喜欢的音乐</div>
									<div class="count">0首</div>
								</div>
								<div class="btn"></div>
							</div>
						</div>
						<div class="content" v-else v-show="songSheet" v-for="(create,createindex) in createList" :key="createindex"
						 @click="getSongListDetail({axios:axios,router:$router,listid:create.id,audioType:'music'})">
							<div class="song-sheet-item">
								<div class="cover">
									<img v-show="create!=undefined" :src="create.coverImgUrl+'?param=48y48'" width="48" height="48">
								</div>
								<div class="text">
									<div class="name">{{create.name}}</div>
									<div class="count">{{create.trackCount}}首</div>
								</div>
								<div class="btn"></div>
							</div>
						</div>

						<div class="header" v-show="loginUserStatus" @click="collectSheet = !collectSheet">
							<i class="up-icon" :class="collectSheet?'':'down-icon'"></i>
							<span>收藏的歌单({{collectList.lenght}})</span>
							<i class="config"></i>
						</div>
						<div class="content" v-show="collectSheet" v-for="(collect,collectindex) in collectList" :key="collectindex+1"
						 @click="getSongListDetail({axios:axios,router:$router,listid:collect.id,audioType:'music'})">
							<div class="song-sheet-item">
								<div class="cover">
									<img :src="collect.coverImgUrl+'?param=48y48'" width="48" height="48">
								</div>
								<div class="text">
									<div class="name">{{collect.name}}</div>
									<div class="count">{{collect.trackCount}}首</div>
								</div>
								<div class="btn"></div>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="recommand-song-sheet">
				<div class="line"></div>
				<div class="recommand-song-sheet-wrapper">
					<div class="title">推荐歌单</div>
					<div class="recommand-list">
						<div class="recommand-item" v-for="(recommd,recommdindex) in recommdSongSheet" :key="recommdindex + 'recommdindex'"
						 @click="getSongListDetail({axios:axios,router:$router,listid:recommd.id})">
							<div class="cover">
								<img :src="recommd.picUrl" :alt="recommd.copywriter">
							</div>
							<div class="name">{{recommd.name}}</div>
						</div>
					</div>
				</div>
			</div>
		</v-touch>
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'MyMusic',
		data() {
			return {
				songSheet: true,
				collectSheet: true
			}
		},
		computed: {
			...mapState(['isAjax']),
			...mapGetters(['recommdSongSheet', 'loginUserStatus', 'loginCode', 'createList', 'collectList', 'userDetail'])

		},
		methods: {
			...mapActions(['setBottonPlayer', 'getPlaylist', 'getSongListDetail']),
			toLogin() {
				this.setBottonPlayer(false)
				this.$router.push('/account')
			},
			swiperleft() {
				this.$router.push('/discover/stylerecommd')
			}
		},
		mounted() {
			if (this.loginCode === 200) {
				this.getPlaylist(this.axios)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;
	@light-theme-font-black: #333;

	.my-music-view {
		width: 100%;
		padding-bottom: 80px;
		background: #FFF;

		.bg {
			margin-top: -1px;
			height: 26px;
			width: 100%;
			background: @light-theme-bg;
		}

		//未登录
		.unlogin-wrapper {
			position: absolute;
			top: 56px;
			left: 0;
			width: 100%;

			&>div {
				display: flex;
				margin: 0 auto;
				width: 96%;
				height: 50px;
				line-height: 50px;
				background: rgba(242, 242, 242, 0.93);
				border-radius: 5px;
				box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);

				.mu-avatar {
					flex: 0 0 32px;
					margin: 9px 10px;
				}

				.content {
					flex: 1;
					color: #000;
					font-size: 14px;
				}

				.btn {
					flex: 0 0 100px;
					width: 100px;

					.mu-button {
						height: 24px;
						line-height: 24px;
						width: 88px;
						border: 1px solid @light-theme-bg;
						font-size: 12px;
						color: @light-theme-bg;
						background: transparent;
						box-shadow: none;
					}
				}
			}
		}

		//各栏目
		.my-music-wrapper {
			// margin-top: 30px;
			width: 100%;
			background: #fff;

			.column {
				&>div {
					display: flex;
					height: 40px;
					line-height: 40px;

					&>i {
						flex: 0 0 40px;
						margin: 6px 8px;
						display: inline-block;
						height: 28px;
						width: 28px;
					}

					&>span {
						flex: 1;
						font-size: 15px;
						color: #000;
						border-bottom: 1px solid #f2f2f2;

						.count {
							padding: 0 5px;
							font-size: 13px;
							color: #a6a6a6;
						}
					}
				}

				.use-space {
					height: 30px
				}

				.local-music {
					&>i {
						background: url(../../../public/images/my_music_local_icon.png) center center no-repeat;
						background-size: 28px;
					}
				}

				.recent-play {
					&>i {
						background: url(../../../public/images/my_music_history_icon.png) center center no-repeat;
						background-size: 28px;
					}
				}

				.download {
					&>i {
						background: url(../../../public/images/my_music_download_icon.png) center center no-repeat;
						background-size: 28px;
					}
				}

				.my-radio {
					&>i {
						background: url(../../../public/images/my_music_radio_icon.png) center center no-repeat;
						background-size: 28px;
					}
				}

				.my-collect {
					&>i {
						background: url(../../../public/images/my_music_collect_icon.png) center center no-repeat;
						background-size: 28px;
					}
				}

			}

			//歌单
			.song-sheet {
				.song-sheet-wrapper {
					padding-bottom: 20px;

					.header {
						display: flex;
						height: 32px;
						line-height: 32px;
						background: #f2f2f2;

						&>i {
							flex: 0 0 16px;
							display: inline-block;
							height: 16px;
							width: 16px;
						}

						.up-icon {
							margin: 8px;
							transform: rotateZ(90deg);
							background: url(../../../public/images/right.png) center center no-repeat;
							background-size: 12px;

							&.down-icon {
								transform: rotateZ(0);
							}
						}

						.config {
							margin: 8px;
							background: url(../../../public/images/songsheet_config_black.png) center center no-repeat;
							background-size: 16px;
						}

						&>span {
							flex: 1;
							font-size: 13px;
						}
					}

					.content {
						.song-sheet-item {
							padding-top: 3px;
							height: 50px;
							display: flex;

							.cover {
								margin-top: 2px;
								margin-left: 5px;
								height: 48px;
								flex: 0 0 48px;
								background: #595959;
								border-radius: 5px;
							}

							.text {
								margin-left: 8px;
								flex: 1;
								border-bottom: 1px solid #f2f2f2;

								.name {
									height: 30px;
									line-height: 30px;
									font-size: 13px;
									color: #000;
									overflow: hidden;
								}

								.count {
									font-size: 13px;
									color: #808080;
								}
							}

							.btn {
								flex: 0 0 50px;
								transform: rotateZ(90deg);
								border-right: 1px solid #f2f2f2;
								background: url(../../../public/images/more_bar.png) center center no-repeat;
								background-size: 20px;
							}


						}
					}


				}

			}


		}

		//推荐歌单
		.recommand-song-sheet {
			.line {
				height: 10px;
				background: #f2f2f2;
			}

			.recommand-song-sheet-wrapper {
				padding: 15px 0 0;

				.title {
					padding: 5px 0 15px;
					font-size: 15px;
					color: #000;
					text-align: center;
				}

				.recommand-list {
					display: flex;

					.recommand-item {
						flex: 0 0 33.3%;
						width: 33.3%;
						text-align: center;

						.cover {
							&>img {
								height: 95%;
								width: 95%;
								border-radius: 5px;
							}
						}

						.name {
							padding: 5px 2px 0;
							display: inline-block;
							width: 100%;
							height: 48px;
							line-height: 14px;
							font-size: 12px;
							text-align: left;
							color: @light-theme-font-black;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							overflow: hidden;
						}
					}
				}
			}
		}

	}
</style>
