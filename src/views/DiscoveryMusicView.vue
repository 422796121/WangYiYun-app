<template>
	<div class="descovery-view" ref="descovery">
		<ul>
			<li class="descovery-top">
				<DiscoveryHeader></DiscoveryHeader>
				<div class="link-wrapper">
					<mu-button flat @click="toDiscover('stylerecommd',0)">
						<span class="top-link" :class="linknum == 0 ? 'active' : ''">推荐</span>
					</mu-button>
					<mu-button flat @click="toDiscover('songsheet',1)">
						<span class="top-link" :class="linknum == 1 ? 'active' : ''">朋友</span>
					</mu-button>
					<mu-button flat @click="toDiscover('anchorstation',2)">
						<span class="top-link" :class="linknum == 2 ? 'active' : ''">电台</span>
					</mu-button>
				</div>
			</li>
			<li class="descovery-content">
				<div class="bg"></div>
				<carousel></carousel>
				<router-view></router-view>
			</li>
		</ul>
	</div>
</template>

<script>
	import DiscoveryHeader from '../components/DiscoveryMusic/DiscoveryHeader.vue'
	import Carousel from '../components/Carousel.vue'
	export default {
		name: 'DiscoveryMusicView',
		components: {
			DiscoveryHeader,
			Carousel
		},
		data() {
			return {
				discoveryScroll: null,
				linknum: 0
			}
		},
		methods: {
			toDiscover(path, num) {
				this.linknum = num
				this.$router.push(`/discover/${path}`)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;
	
	.descovery-view {
		height: 100%;

		.descovery-top {
			height: 81px;
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
			position: relative;
			padding-top: 10px;

			.bg {
				position: absolute;
				top: 0;
				left: 0;
				height: 120px;
				width: 100%;
				background: #d23023;
			}
		}

	}
</style>
