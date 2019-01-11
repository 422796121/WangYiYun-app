<template>
	<div class="style-recommend-view">
		<div class="btn-wrapper">
			<div class="btn-box">
				<mu-avatar :size="45">
					<img src="../../../public/images/dragonball_fm.png">
				</mu-avatar>
				<span>私人FM</span>
			</div>
			<div class="btn-box">
				<mu-avatar :size="45">
					<img src="../../../public/images/dragonball_daily.png">
				</mu-avatar>
				<span>每日推荐</span>
			</div>
			<div class="btn-box">
				<mu-avatar :size="45">
					<img src="../../../public/images/dragonball_playlist.png">
				</mu-avatar>
				<span>歌单</span>
			</div>
			<div class="btn-box">
				<mu-avatar :size="45">
					<img src="../../../public/images/dragonball_rank.png">
				</mu-avatar>
				<span>排行榜</span>
			</div>
		</div>

		<div class="recommend-list">
			<div class="name">
				<span>推荐歌单<i class="right-icon"></i></span>
			</div>
			<div class="content">
				<div class="content-item" v-for="(recommd,recommdindex) in recommdList" :key="recommdindex + 'recommdindex'">
					<div class="content-img">
						<img :src="recommd.picUrl" :alt="recommd.copywriter">
					</div>
					<span class="title">{{recommd.name}}</span>
				</div>
			</div>
		</div>

		<div class="exclusive-list">
			<div class="name">
				<span>独家放送<i class="right-icon"></i></span>
			</div>
			<div class="content">
				<div class="content-item" v-for="(exclusive,exclusiveindex) in exclusiveList" :key="exclusiveindex + 'exclusiveindex'">
					<div class="content-img">
						<img :src="exclusive.picUrl" :alt="exclusive.copywriter">
					</div>
					<span class="title">{{exclusive.name}}</span>
				</div>
			</div>
		</div>

		<div class="newmusic-list">
			<div class="name">
				<span>最新音乐<i class="right-icon"></i></span>
			</div>
			<div class="content">
				<div class="content-item" v-for="(newmusic,newmusicindex) in newmusicList" :key="newmusicindex + 'newmusicindex'">
					<div class="content-img">
						<img :src="newmusic.song.album.picUrl">
					</div>
					<div class="title">
						<span>{{newmusic.name}}</span>
						<span class="author">{{newmusic.song.artists[0].name}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="newmv-list">
			<div class="name">
				<span>推荐MV<i class="right-icon"></i></span>
			</div>
			<div class="content">
				<div class="content-item" v-for="(mv,mvindex) in mvList" :key="mvindex + 'mvindex'">
					<div class="content-img">
						<img :src="mv.picUrl" :alt="mv.copywriter">
					</div>
					<div class="title">
						<span>{{mv.name}}</span>
						<span class="author">{{mv.artistName}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="radio-list">
			<div class="name">
				<span>主播电台<i class="right-icon"></i></span>
			</div>
			<div class="content">
				<div class="content-item" v-for="(radio,radioindex) in radioList" :key="radioindex + 'radioindex'">
					<div class="content-img">
						<img :src="radio.picUrl" :alt="radio.copywriter">
					</div>
					<span class="title">{{radio.name}}</span>
				</div>
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
		name: 'StyleRecommend',
		data() {
			return {}
		},
		computed: {
			...mapGetters({
				recommdList: 'recommdList',
				exclusiveList: 'exclusiveList',
				newmusicList: 'newmusicList',
				mvList: 'mvList',
				radioList: 'radioList'
			})
		},
		methods: {
			...mapActions(['setLfetOpen', 'getMusicDetail'])
		},
		mounted() {

			this.$nextTick(() => {})
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;
	@light-theme-font-black: #333;

	.style-recommend-view {
		width: 100%;

		.btn-wrapper {
			display: flex;

			.btn-box {
				padding: 16px 0 10px;
				flex: 1;
				border-bottom: 1px solid #f2f2f2;
				text-align: center;

				.mu-avatar {
					background-color: @light-theme-bg;
				}

				&>span {
					display: block;
					height: 30px;
					line-height: 30px;
					font-size: 12px;
					color: @light-theme-font-black;
				}
			}

		}

		//推荐歌单 独家放送 新音乐 MV 电台
		.recommend-list,
		.exclusive-list,
		.newmusic-list,
		.newmv-list,
		.radio-list{
			width: 100%;

			.name {
				padding-left: 3%;
				height: 40px;
				line-height: 40px;
				font-size: 15px;
				font-weight: bold;
				color: @light-theme-font-black;

				&>span {
					line-height: 20px;
				}

				.right-icon {
					padding: 0 15px;
					display: inline-block;
					height: 12px;
					width: 12px;
					background: url(../../../public/images/right.png) center bottom no-repeat;
					background-size: 12px 12px;
				}
			}

			.content {
				display: flex;
				width: 100%;
				flex-wrap: wrap;

				.content-item {
					flex: 0 0 33.3%;
					width: 33.3%;
					text-align: center;

					.content-img {
						&>img {
							height: 95%;
							width: 95%;
						}
					}

					.title {
						padding: 5px 2px 0;
						display: inline-block;
						width: 100%;
						height: 48px;
						line-height: 14px;
						font-size: 12px;
						text-align: left;
						color: @light-theme-font-black;
						&>span{
							display: block;
							width: 100%;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							&:first-child{
								// font-weight: bold;
								color: #000;
							}
						}
						.author{
							padding-top: 3px;
						}
					}
				}
			}
		}

		//独家放送
		.exclusive-list {
			.content {
				.content-item {
					flex: 0 0 50%;

					.content-img {
						&>img {
							height: 100%;
							width: 100%;
						}
					}

					.title {
						padding: 5px 4px;
					}

					&:last-child {
						flex: 0 0 100%;

						.title {
							display: block;
						}
					}

				}

			}
		}

		//新mv
		.newmv-list{
			.content {
				.content-item {
					flex: 0 0 50%;
					width: 50%;
					.content-img {
						&>img {
							height: 100%;
							width: 100%;
						}
					}
				}
			}
		}
		

	}
</style>
