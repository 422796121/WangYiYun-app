<template>
	<div class="music-player">
		<div class="song-list-header">
			<i class="account-icon back" @click="showSongView"></i>
			<div class="title">
				<!-- <span class="name">{{playImfo.name}}</span> -->
				<span class="name">{{playImfo.name}}</span>
				<!-- <span class="author">{{playImfo.author}}</span> -->
				<span class="author">{{playImfo.author}}</span>
			</div>
			<i class="account-icon share"></i>
		</div>
		<div class="middle">
			<mu-avatar :size="250" class="middle-img">
				<!-- <img class="img" :src="`https://music.163.com/api/img/blur/`"> -->
				<img class="img" :src="playImfo.img">
			</mu-avatar>
		</div>
		<div class="btn-list">
			<i class="like"></i>
			<!-- <i class="unlike"></i> -->
			<i class="download"></i>
			<i class="feel"></i>
			<i class="comm"></i>
			<i class="more"></i>
		</div>
		<div class="time">
			<span class="currect">{{playerTimer.currentTime}}</span>
			<mu-slider class="demo-slider" color="#d23023" :value="playerTimer.percent" :display-value="false" @change="changePlayTime"></mu-slider>
			<span class="end">{{playerTimer.duration}}</span>
		</div>
		<div class="play-btn">
			<div>
				<i class="type all" @click="changePlayType(1)" v-show="playType == 0"></i>
				<i class="type one" @click="changePlayType(2)" v-show="playType == 1"></i>
				<i class="type random" @click="changePlayType(0)" v-show="playType == 2"></i>
			</div>
			<div>
				<i class="prev" @click="prev"></i>
			</div>
			<div @click="playMusic">
				<i class="play" v-if="!playState"></i>
				<i class="pause" v-else></i>
			</div>
			<div>
				<i class="next" @click="next"></i>
			</div>
			<div>
				<i class="list"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'MusicPlayer',
		data() {
			return {}
		},
		computed: {
			...mapGetters(['playState', 'playImfo', 'playerTools', 'playType', 'playerTimer'])
		},
		methods: {
			...mapActions(['getPlayerData', 'setMusicPlayer', 'showSongView', 'changePlayerSong', 'setMusicPlayerStatus',
				'changePlayType', 'changePlayTime'
			]),
			playMusic() {
				let player = this.playerTools.player
				let show = this.playerTools.timestamp
				this.setMusicPlayerStatus()
				this.setMusicPlayer({
					player,
					show,
					conti: true
				})
			},
			prev() {
				this.changeSong(-1)
			},
			next() {
				this.changeSong(1)
			},
			changeSong(num) {
				this.changePlayerSong({
					axios: this.axios,
					num
				})
			}
		}
	}
</script>

<style lang="less">
	@light-theme-bg: #000;

	.music-player {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 998;
		background: @light-theme-bg;

		//头部
		.song-list-header {
			display: flex;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 54px;
			border-bottom: 1px solid rgba(217, 217, 217, .3);

			.back {
				margin-left: 2px;
				padding-top: 12px;
				flex: 0 0 32px;
				display: inline-block;
				height: 54px;
				width: 32px;
				background: url(../../public/images/login_back.png) center center no-repeat;
				background-size: 18px;
			}


			.share {
				margin-right: 5px;
				padding-top: 12px;
				flex: 0 0 32px;
				display: inline-block;
				height: 54px;
				width: 32px;
				background: url(../../public/images/songlist_share.png) center center no-repeat;
				background-size: 20px;
			}

			.title {
				flex: 1;
				display: inline-block;
				padding-left: 10px;
				height: 54px;
				vertical-align: top;
				color: #fff;

				&>span {
					display: inline-block;
					width: 100%;
				}

				.name {
					margin-top: 5px;
					height: 24px;
					line-height: 28px;
					font-size: 16px;
					font-weight: bold;
				}

				.author {
					padding-top: 3px;
					height: 20px;
					font-size: 14px;
					color: rgba(217, 217, 217, 0.8)
				}
			}
		}

		//图片
		.middle {
			position: absolute;
			top: 54px;
			left: 0;
			right: 0;
			bottom: 162px;

			.middle-img {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				background: #FAFAFA;

				&>.img {
					border: 0;
				}
			}
		}

		// 其他按钮
		.btn-list {
			display: flex;
			position: absolute;
			bottom: 116px;
			left: 10px;
			right: 10px;
			height: 46px;

			&>i {
				flex: 1;
				display: inline-block;
				height: 46px;
				width: 100%;
			}

			.like {
				background: url(../../public/images/play_else_like.png) center center no-repeat;
				background-size: 70px;
			}

			.unlike {
				background: url(../../public/images/play_else_unlike.png) center center no-repeat;
				background-size: 70px;
			}

			.download {
				background: url(../../public/images/play_else_download.png)center center no-repeat;
				background-size: 70px;
			}

			.feel {
				background: url(../../public/images/play_else_feel.png)center center no-repeat;
				background-size: 70px;
			}

			.comm {
				background: url(../../public/images/play_else_comm.png)center center no-repeat;
				background-size: 70px;
			}

			.more {
				background: url(../../public/images/play_else_more.png)center center no-repeat;
				background-size: 70px;
			}
		}

		// 滑动条
		.time {
			display: flex;
			position: absolute;
			bottom: 70px;
			left: 0;
			right: 0;
			height: 46px;

			.currect,
			.end {
				display: inline-block;
				flex: 0 0 46px;
				width: 46px;
				height: 46px;
				line-height: 46px;
				text-align: center;
				font-size: 11px;
			}

			.currect {
				color: rgba(242, 242, 242, 0.9);
			}

			.end {
				color: rgba(242, 242, 242, 0.6);
			}

			.demo-slider {
				margin: 0;
				height: 46px;
			}
		}

		// 播放按钮
		.play-btn {
			display: flex;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 70px;

			&>div {
				flex: 1;
				display: inline-block;

				&>i {
					display: inline-block;
					height: 56px;
					width: 100%;
				}

				.type {

					&.all {
						background: url(../../public/images/play_type_all.png) center center no-repeat;
						background-size: 50px;
					}

					&.one {
						background: url(../../public/images/play_type_one.png) center center no-repeat;
						background-size: 50px;
					}

					&.random {
						background: url(../../public/images/play_type_random.png)center center no-repeat;
						background-size: 50px;
					}
				}

				.prev {
					background: url(../../public/images/play_btn_prev.png) center center no-repeat;
					background-size: 45px;
				}

				.play {
					background: url(../../public/images/play_btn_play.png) center center no-repeat;
					background-size: 50px;
				}

				.pause {
					background: url(../../public/images/play_btn_pause.png) center center no-repeat;
					background-size: 50px;
				}

				.next {
					background: url(../../public/images/play_btn_next.png) center center no-repeat;
					background-size: 45px;
				}

				.list {
					background: url(../../public/images/play_list.png) center center no-repeat;
					background-size: 50px;
				}
			}
		}

	}
</style>
