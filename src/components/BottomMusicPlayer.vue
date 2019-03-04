<template>
	<div class="bottom-music-player" @click="showSongView">
		<audio src="" ref="player" @ended="changeSong(1,true)"></audio>
		<div class="time-progress">
			<div class="time" ref="timeShow" :style="`width:${timePercent}%`"></div>
		</div>
		<div class="music-player-wrapper">
			<div class="player-img">
				<img :src="playImfo.img" alt="" width="38" height="38">
			</div>
			<v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" :swipe-options="{direction: 'horizontal'}" style="width:100%;">
				<div class="content">
					<div class="title">{{playImfo.name}}</div>
					<div class="author" v-if="lyric==null">{{playImfo.author}}</div>
					<div class="lyric" v-else>{{lyric}}</div>
				</div>
			</v-touch>
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
			...mapGetters(['playState', 'lyric', 'currentTime', 'playImfo', 'timePercent'])
		},
		methods: {
			...mapActions(['getPlayerData', 'setMusicPlayer', 'saveMusicPlayerTool', 'setMusicPlayerStatus', 'changePlayerSong','showSongView']),
			playMusic(event) {
				event.stopPropagation()
				let player = this.$refs.player
				let show = this.$refs.timeShow
				this.setMusicPlayerStatus()
				this.setMusicPlayer({
					player,
					show,
					conti: true
				})
			},
			swiperleft() {
				this.changeSong(1)
			},
			swiperright() {
				this.changeSong(-1)
			},
			changeSong(num,isEnd) {
				this.changePlayerSong({
					axios: this.axios,
					num,
					isEnd
				})
			}
		},
		mounted() {
			this.$nextTick(() => {
				let player = this.$refs.player
				let show = this.$refs.timeShow
				this.saveMusicPlayerTool({
					player,
					show
				})
			})
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
		z-index: 990;
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
				margin-right: 5px;
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
					white-space: nowrap;
				}

				.author,
				.lyric {
					padding-left: 1px;
					height: 17px;
					line-height: 17px;
					font-size: 12px;
				}
			}

			.btn-box {
				flex: 0 0 84px;
				height: 84px;
				z-index: 991;

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
