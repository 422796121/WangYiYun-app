<template>
	<div class="bottom-music-player">
		<audio src="https://music.163.com/song/media/outer/url?id=33894312.mp3" ref="player"></audio>
		<div class="time-progress">
			<div class="time" ref="timeShow"></div>
		</div>
		<div class="music-player-wrapper">
			<div class="player-img">
				<img src="https://p2.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg" alt="">
			</div>
			<div class="content">
				<div class="title">sefd</div>
				<div class="lyric" v-if="playState">sdf</div>
				<div class="author" v-else>123</div>
			</div>
			<div class="btn-box">
				<span class="play-btn" :class="playState ? 'hasplay' : ''" @click="playMusic"></span>
				<span class="like-btn haslike"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BottomMusicPlayer',
		data() {
			return {
				playState: false,
				duration: 0
			}
		},
		mounted() {
			this.$nextTick(() => {
				let player = this.$refs.player
				player.addEventListener('loadedmetadata', () => {
					this.duration = player.duration
					this.setTimeProgress(player.currentTime)
				})
			})

		},
		methods: {
			playMusic() {
				let player = this.$refs.player
				console.log(player.duration)
				if (this.playState === false) {
					player.play()
					this.playState = true
				} else {
					player.pause()
					this.playState = false
				}
				player.addEventListener('timeupdate', () => {
					this.setTimeProgress(player.currentTime)
				})
			},
			setTimeProgress(current) {
				let progress = (current / this.duration) * 100.0
				this.$refs.timeShow.style.width = `${progress}%`
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.bottom-music-player {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 44px;
		width: 100%;
		// border-top: 1px solid #f2f2f2;
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

				.lyric,.author {
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
