<template>
	<div class="descovery-view">
		<div class="descovery-top">
			<home-header></home-header>
			<div class="link-wrapper">
				<mu-button flat>
					<router-link to="/discover/stylerecommd" tag="span" class="top-link">推荐</router-link>
				</mu-button>
				<mu-button flat>
					<router-link to="/discover/friends" tag="span" class="top-link">朋友</router-link>
				</mu-button>
				<mu-button flat>
					<router-link to="/discover/radio" tag="span" class="top-link">电台</router-link>
				</mu-button>
			</div>
		</div>
		<div class="descovery-content">
			<div class="use-space"></div>
			<pull-up-load v-show="isAjax"></pull-up-load>
			<div class="descovery-router" ref="descovery">
				<ul>
					<li>
						<keep-alive>
							<router-view></router-view>
						</keep-alive>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import HomeHeader from '../components/HomeHeader.vue'
	import PullUpLoad from '../components/PullUpLoad.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'DiscoveryMusicView',
		components: {
			HomeHeader,
			PullUpLoad
		},
		data() {
			return {
				discoveryScroll: null,
				leave: false
			}
		},
		computed: {
			...mapState(['isAjax', 'scroll'])
		},
		methods: {
			...mapActions(['setScroll', 'reGetDiscoveryData', 'getRadioData', 'refreshScroll', 'clearScroll']),
			setScrollComponent() {
				if (this.discoveryScroll === null) {
					this.setScroll({
						name: 'discovery',
						scroll: this.discoveryScroll,
						ref: this.$refs.descovery
					})
					this.discoveryScroll = this.scroll['discovery']
				} else {
					this.refreshScroll(this.scroll['discovery'])
				}
				if (this.scroll['discovery'] !== null) {
					this.scroll['discovery'].on('pullingDown', () => {
						this.reGetDiscoveryData(this.axios)
						this.getRadioData(this.axios)
						this.scroll['discovery'].finishPullDown()
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
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;

	.descovery-view {
		height: 100%;
		width: 100%;

		.descovery-top {
			height: 81px;
			width: 100%;

			.link-wrapper {
				position: fixed;
				top: 45px;
				left: 0;
				right: 0;
				z-index: 999;
				display: flex;
				background: @light-theme-bg;

				.mu-button {
					flex: 1;
					color: @light-theme-font;

					.top-link {
						display: inline-block;
						height: 32px;
						opacity: .5;

						&.active {
							border-bottom: 2px solid #fff;
							color: #fff;
							opacity: 1;
						}
					}
				}
			}
		}

		.descovery-content {
			display: inline-block;
			position: relative;
			height: 100%;
			width: 100%;

			// 			.use-space{
			// 				height: 50px;
			// 			}
			.descovery-router {
				height: 100%;
			}
		}
	}
</style>
