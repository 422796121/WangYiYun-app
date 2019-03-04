<template>
	<div class="song-list-view" ref="videolist">
		<ul>
			<li>
				<div class="song-list-header">
					<i class="account-icon back" @click="goBackList"></i>
					<div class="title">歌单</div>
					<i class="account-icon search"></i>
					<i class="account-icon more"></i>
				</div>
				<pull-up-load v-show="isAjax"></pull-up-load>
			</li>
			<li v-show="!isAjax">
				<div class="player">
					<video :src="showMvVideo.url" controls  webkit-playsinline="true"></video>
				</div>
				<div class="imfor">
					<div class="title">{{showMvVideo.name}}</div>
					<div>
						<span class="upload-time">{{showMvVideo.time}}</span>
						<span class="play-count">{{showMvVideo.count}}</span>
					</div>
					<div class="desc">{{showMvVideo.desc}}</div>
					<div class="btn-list">
						<i class="btn-item"></i>
						<i class="btn-item"></i>
						<i class="btn-item"></i>
						<i class="btn-item"></i>
					</div>
					<div class="author">{{showMvVideo.artist}}</div>
				</div>
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
			...mapGetters(['showMvVideo'])
		},
		methods: {
			...mapActions(['goBack', 'setScroll', 'refreshScroll']),
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
			goBackList(){
				this.$router.push('/videoview')
			}
		},
		updated() {
			this.setScrollComponent()
			console.log('1')
		},
		mounted() {
			console.log()
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

		.player{
			width: 100%;
			&>video{
				width: 100%;
			}
		}

	}
</style>
