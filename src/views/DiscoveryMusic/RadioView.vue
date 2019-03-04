<template>
	<div class="style-recommend-radio-view">
		<div class="bg"></div>
		<carousel></carousel>
		<v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
			<div class="btn-wrapper">
				<div class="btn-box">
					<mu-avatar :size="45">
						<img src="../../../public/images/dragonball_radio_calss.png">
					</mu-avatar>
					<span>电台分类</span>
				</div>
				<div class="btn-box">
					<mu-avatar :size="45">
						<img src="../../../public/images/dragonball_radio_rank.png">
					</mu-avatar>
					<span>电台排行</span>
				</div>
				<div class="btn-box">
					<mu-avatar :size="45">
						<img src="../../../public/images/dragonball_radio_vip.png">
					</mu-avatar>
					<span>付费专区</span>
				</div>
			</div>

			<div class="recommend-list">
				<div class="name">
					<span>今日优选</span>
				</div>
				<div class="content">
					<div class="content-item" v-for="(recommdRadio,recommdRadioindex) in recommdRadioList" :key="recommdRadioindex + 'recommdRadioindex'"
					 @click="toRadioList({axios:axios,router:$router,id:recommdRadio.id,thisraido:recommdRadio,audioType:'radio'})">
						<div class="content-img">
							<img :src="recommdRadio.picUrl" :alt="recommdRadio.copywriter">
						</div>
						<div class="content-text">
							<div class="title">{{recommdRadio.name}}</div>
							<div class="program">听众: {{recommdRadio.subCount}}</div>
							<div class="desc">{{recommdRadio.rcmdtext}}</div>
						</div>
					</div>
				</div>
			</div>

			<div class="radio-list">
				<div class="name">
					<span>创作|翻唱<i class="right-icon"></i></span>
				</div>
				<div class="content">
					<div class="content-item" v-for="(create,createindex) in createRadioList" :key="createindex + 'createindex'"
					 @click="toRadioList({axios:axios,router:$router,id:create.id,thisraido:create,audioType:'radio'})">
						<div class="content-img">
							<img :src="create.picUrl" :alt="create.copywriter">
						</div>
						<span class="title">{{create.name}}</span>
					</div>
				</div>
			</div>

			<div class="radio-list">
				<div class="name">
					<span>3D电音<i class="right-icon"></i></span>
				</div>
				<div class="content">
					<div class="content-item" v-for="(threed,threedindex) in threedRadioList" :key="threedindex + 'threedindex'"
					 @click="toRadioList({axios:axios,router:$router,id:threed.id,thisraido:threed,audioType:'radio'})">
						<div class="content-img">
							<img :src="threed.picUrl" :alt="threed.copywriter">
						</div>
						<span class="title">{{threed.name}}</span>
					</div>
				</div>
			</div>

			<div class="radio-list">
				<div class="name">
					<span>情感调频<i class="right-icon"></i></span>
				</div>
				<div class="content">
					<div class="content-item" v-for="(feel,feelindex) in feelRadioList" :key="feelindex + 'feelindex'" @click="toRadioList({axios:axios,router:$router,id:feel.id,thisraido:feel,audioType:'radio'})">
						<div class="content-img">
							<img :src="feel.picUrl" :alt="feel.copywriter">
						</div>
						<span class="title">{{feel.name}}</span>
					</div>
				</div>
			</div>

			<div class="radio-list">
				<div class="name">
					<span>音乐故事<i class="right-icon"></i></span>
				</div>
				<div class="content">
					<div class="content-item" v-for="(story,storyindex) in storyRadioList" :key="storyindex + 'storyindex'" @click="toRadioList({axios:axios,router:$router,id:story.id,thisraido:story,audioType:'radio'})">
						<div class="content-img">
							<img :src="story.picUrl" :alt="story.copywriter">
						</div>
						<span class="title">{{story.name}}</span>
					</div>
				</div>
			</div>

			<radio-classify></radio-classify>
		</v-touch>
	</div>
</template>

<script>
	import Carousel from '../../components/Carousel.vue'
	import RadioClassify from '../../components/RadioClassify.vue'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'StyleRecommend',
		components: {
			Carousel,
			RadioClassify
		},
		data() {
			return {}
		},
		computed: {
			...mapGetters({
				recommdRadioList: 'recommdRadioList',
				createRadioList: 'createRadioList',
				threedRadioList: 'threedRadioList',
				feelRadioList: 'feelRadioList',
				storyRadioList: 'storyRadioList'
			})
		},
		methods: {
			...mapActions(['setLfetOpen', 'getRadioData', 'toRadioList']),
			swiperleft() {
				this.$router.push('/videoview')
			},
			swiperright() {
				this.$router.push('/discover/friends')
			}
		},
		created() {
			this.$nextTick(() => {
				this.getRadioData(this.axios)

			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;
	@light-theme-font-black: #333;

	.style-recommend-radio-view {
		width: 100%;
		position: relative;
		padding-top: 5px;
		padding-bottom: 130px;

		.bg {
			position: absolute;
			top: 0;
			left: 0;
			height: 120px;
			width: 100%;
			background: #d23023;
		}


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

		.recommend-list {
			margin-bottom: 20px;
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
				width: 100%;

				.content-item {
					padding-bottom: 5px;
					display: flex;

					.content-img {
						flex: 0 0 100px;
						margin-left: 8px;
						border-radius: 5px;
						overflow: hidden;

						&>img {
							height: 100px;
							width: 100px;
						}
					}

					.content-text {
						margin-left: 10px;
						flex: 1;
						border-bottom: 1px solid #f2f2f2;

						.title {
							margin-bottom: 5px;
							padding: 5px 0;
							display: inline-block;
							width: 100%;
							height: 30px;
							line-height: 30px;
							font-size: 15px;
							font-weight: bold;
							text-align: left;

							&>span {
								display: block;
								width: 100%;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
								overflow: hidden;

								&:first-child {
									color: #000;
								}
							}
						}

						.program,
						.desc {
							padding: 8px 0;
							font-size: 12px;
							color: @light-theme-font-black;
						}

					}


				}
			}
		}

		.radio-list {
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
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;

						.author {
							padding-top: 3px;
						}
					}
				}
			}
		}

	}
</style>
