<template>
	<div class="song-list-view" ref="songlistul">
		<ul>
			<li>
				<div class="song-list-header">
					<i class="account-icon back" @click="goBack({router:$router})"></i>
					<div class="title">歌单</div>
					<i class="account-icon search"></i>
					<i class="account-icon more"></i>
				</div>
				<pull-up-load v-show="isAjax"></pull-up-load>
			</li>
			<li>
				<div class="use-space"></div>
				<div class="song-list-detail">
					<div class="detail" v-show="audioType == 0 ? true : false">
						<div class="images">
							<img :src="songList.playlist.coverImgUrl" alt="" width="130" height="130">
						</div>
						<div class="imfor">
							<span class="title">{{songList.playlist.name}}</span>
							<div class="creator">
								<mu-avatar :size="30">
									<img :src="songList.playlist.creator.avatarUrl">
								</mu-avatar>
								<span>{{songList.playlist.creator.nickname}}<i class="author-icon"></i></span>
							</div>
						</div>
					</div>
					<div class="detail" v-show="audioType == 1 ? true : false">
						<div class="images">
							<img :src="thisraido.picUrl" alt="" width="130" height="130">
						</div>
						<div class="imfor">
							<span class="title">{{thisraido.name}}</span>
							<div class="creator">
								<mu-avatar :size="30">
									<img :src="thisraido.picUrl">
								</mu-avatar>
								<span>收听人数:{{thisraido.subCount}}</span>
							</div>
						</div>
					</div>

					<div v-show="audioType == 1 ? true : false" style="height: 10px;"></div>
					<div class="btn-list" v-show="audioType == 0 ? true : false">
						<div class="btn-item">
							<i class="btn-icon subscribed"></i>
							<span>{{songList.playlist.subscribedCount}}</span>
						</div>
						<div class="btn-item">
							<i class="btn-icon share"></i>
							<span>{{songList.playlist.shareCount}}</span>
						</div>
						<div class="btn-item">
							<i class="btn-icon comment"></i>
							<span>{{songList.playlist.commentCount}}</span>
						</div>
						<div class="btn-item">
							<i class="btn-icon play"></i>
							<span>{{songList.playlist.playCount}}</span>
						</div>
					</div>
				</div>
				<div class="song-list" v-show="audioType == 0 ? true : false">
					<div class="song-header">
						<i class="play-all-icon"></i>
						<span @click="getSongDetail({axios:axios,list:songList.playlist.tracks,musicId:songList.playlist.tracks[0].id,num:0,playStatus:true,saveList: false})">播放全部({{songList.playlist.trackCount}})</span>
					</div>
					<div class="content-music" v-for="(songs,songsindex) in songList.playlist.tracks" :key="songsindex" @click="getSongDetail({axios:axios,list:songList.playlist.tracks,musicId:songs.id,num:songsindex,playStatus:true,saveList: false})">
						<span class="num">{{songsindex + 1}}</span>
						<div class="song-title">
							<span class="song">{{songs.name}}</span><br>
							<span class="alumb">{{songs.ar[0].name}}-{{songs.al.name}}</span>
						</div>
						<i class="more-icon"></i>
					</div>
				</div>
				<div class="song-list" v-show="audioType == 1 ? true : false">
					<div class="song-header">
						<i class="play-all-icon"></i>
						<span @click="getSongDetail({axios:axios,list:raidoList,musicId:raidoList.id,num:0,playStatus:true,saveList: false})">播放全部</span>
					</div>
					<div class="content-music" v-for="(raidos,raidosindex) in raidoList" :key="raidosindex" @click="getSongDetail({axios:axios,list:raidoList,musicId:raidos.id,num:raidosindex,playStatus:true,saveList: false})">
						<span class="num">{{raidosindex + 1}}</span>
						<div class="song-title">
							<span class="song">{{raidos.name}}</span><br>
							<span class="alumb">收听次数:{{raidos.listenerCount}}</span>
						</div>
						<i class="more-icon"></i>
					</div>
				</div>
				<div class="use-space"></div>
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
		name: 'SongListView',
		data() {
			return {
				songListScroll: null
			}
		},
		components: {
			PullUpLoad
		},
		computed: {
			...mapState(['isAjax', 'scroll']),
			...mapGetters(['songList', 'audioType', 'thisraido', 'raidoList'])
		},
		methods: {
			...mapActions(['goBack', 'setScroll', 'refreshScroll', 'getGoodSongList', 'getSongDetail']),
			setScrollComponent() {
				if (this.songListScroll === null) {
					this.setScroll({
						name: 'songListScroll',
						scroll: this.songListScroll,
						ref: this.$refs.songlistul
					})
					this.songListScroll = this.scroll['songListScroll']
				} else {
					this.refreshScroll(this.scroll['songListScroll'])
				}
				if (this.scroll['songListScroll'] !== null) {
					this.scroll['songListScroll'].on('pullingDown', () => {
						this.scroll['songListScroll'].finishPullDown()
					})
				}
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
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
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

		//列表
		.song-list-detail {
			background: #555555;
			color: #f4f4f4;

			.detail {
				padding: 10px 0 0;
				display: flex;

				.images {
					padding: 0 10px;
					flex: 0 0 130px;
				}

				.imfor {
					flex: 1;

					.title {
						padding: 10px 0;
						display: inline-block;
						height: 46px;
						line-height: 23px;
						font-size: 15px;
					}

					.creator {
						display: flex;
						margin-top: 10px;
						padding: 10px 0;
						height: 50px;

						&>span {
							padding-left: 5px;
							display: inline-block;
							flex: 1;
							height: 30px;
							line-height: 30px;
							font-size: 14px;
						}

						.author-icon {
							display: inline-block;
							width: 16px;
							height: 16px;
							background: url(../../../public/images/songlist_author.png) center center no-repeat;
							background-size: 6px;
							vertical-align: middle;
						}
					}
				}
			}

			.btn-list {
				padding: 5px 0;
				display: flex;

				.btn-item {
					flex: 1;
					height: 46px;
					text-align: center;
					font-size: 11px;

					.btn-icon {
						margin: 0 auto;
						padding: 3px 0;
						display: block;
						height: 30px;
						width: 24px;
					}

					.subscribed {
						background: url(../../../public/images/songlist_dingyue.png) center center no-repeat;
						background-size: 20px;
					}

					.share {
						background: url(../../../public/images/songlist_share.png) center center no-repeat;
						background-size: 20px;
					}

					.comment {
						background: url(../../../public/images/songlist_comm.png) center center no-repeat;
						background-size: 20px;
					}

					.play {
						background: url(../../../public/images/songlist_listen.png) center center no-repeat;
						background-size: 20px;
					}

				}
			}
		}

		.song-list {
			.song-header {
				display: flex;
				height: 40px;
				border-bottom: .5px solid #d9d9d9;

				.play-all-icon {
					flex: 0 0 46px;
					padding: 8px 11px;
					display: inline-block;
					width: 46px;
					height: 40px;
					background: url(../../../public/images/songlist_play.png) center center no-repeat;
					background-size: 20px;
				}

				&>span {
					flex: 1;
					display: inline-block;
					line-height: 40px;
					font-size: 14px;
				}
			}

			.content-music {
				margin: 5px 0;
				display: flex;
				height: 46px;
				width: 100%;

				.num {
					display: inline-block;
					flex: 0 0 46px;
					line-height: 46px;
					text-align: center;
					font-size: 14px;
					color: #808080;
				}

				.song-title {
					flex: 1;
					width: 0;
					border-bottom: .5px solid #d9d9d9;

					&>span {
						display: inline-block;
						line-height: 23px;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.song {
						font-size: 14px;
						vertical-align: bottom;
					}

					.alumb {
						font-size: 13px;
						vertical-align: top;
						color: #808080;
					}
				}

				.more-icon {
					display: inline-block;
					flex: 0 0 46px;
					height: 46px;
					border-bottom: .5px solid #d9d9d9;
					background: url(../../../public/images/more_bar.png) center center no-repeat;
					background-size: 20px;
				}
			}
		}

	}
</style>
