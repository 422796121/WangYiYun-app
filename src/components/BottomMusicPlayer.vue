<template>
	<div class="bottom-music-player">
		<audio src="https://music.163.com/song/media/outer/url?id=556042458.mp3" ref="player"></audio>
		<div class="time-progress">
			<div class="time" ref="timeShow"></div>
		</div>
		<div class="music-player-wrapper">
			<div class="player-img">
				<img src="https://p2.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg" alt="">
			</div>
			<div class="content">
				<div class="title">{{currentTime}}</div>
				<div class="author" v-if="lyric==null">asd</div>
				<div class="lyric" v-else>{{lyric}}</div>
			</div>
			<div class="btn-box">
				<span class="play-btn" :class="playState ? 'hasplay' : ''" @click="playMusic"></span>
				<span class="like-btn haslike"></span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'BottomMusicPlayer',
		data() {
			return {}
		},
		computed: {
			...mapState(['isAjax']),
			...mapGetters(['playState', 'lyric', 'currentTime'])
		},
		created() {
			this.$nextTick(() => {
				let player = this.$refs.player
				this.getPlayerData({
					ele: player,
					axios: this.axios,
					musicid: '556042458'
				})
			})

		},
		methods: {
			...mapActions(['getPlayerData', 'setMusicPlayer']),
			playMusic() {
				let player = this.$refs.player
				let show = this.$refs.timeShow
				this.setMusicPlayer({
					player,
					show
				})
			}
		}
	}
</script>

<style lang="less">
	.bottom-music-player {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 44px;
		width: 100%;
		z-index: 999;
		background: rgba(255, 255, 255, .9);

		.time-progress {
			width: 100%;
			height: 2px;
			background: #d8d8d8;

			.time {
				width: 0;
				height: 2px;
				background: #d23023;
			}
		}

		.music-player-wrapper {
			display: flex;

			.player-img {
				flex: 0 0 42px;
				height: 42px;

				&>img {
					margin: 2px;
					width: 38px;
					height: 38px;
					border-radius: 5px;
				}
			}

			.content {
				flex: 1;

				.title {
					height: 21px;
					line-height: 21px;
					font-size: 14px;
					color: #000;
					font-weight: 500;
				}

				.author,
				.lyric {
					height: 17px;
					line-height: 17px;
					font-size: 12px;
				}
			}

			.btn-box {
				flex: 0 0 84px;
				height: 84px;

				&>span {
					display: inline-block;
					margin: 2px;
					width: 38px;
					height: 38px;
				}

				.play-btn {
					background: url(../../public/images/btn_play.png) center center no-repeat;
					background-size: 23px 23px;

					&.hasplay {
						background: url(../../public/images/btn_pause.png) center center no-repeat;
						background-size: 23px 23px;
					}
				}

				.like-btn {
					background: url(../../public/images/btn_unlove.png) center center no-repeat;
					background-size: 22px 22px;

					&.haslike {
						background: url(../../public/images/btn_love.png) center center no-repeat;
						background-size: 22px 22px;
					}
				}
			}
		}
	}
</style>
