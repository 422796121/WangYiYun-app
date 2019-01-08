<template>
	<div class="discovery-header">
		<div class="discovery-wrapper">
			<mu-appbar color='#d23023'>
				<mu-button icon slot="left" @click="setLfetOpen">
					<mu-icon value="menu"></mu-icon>
				</mu-button>
				<div class="header-btn">
					<mu-button icon>
						<i class="music-icon"></i>
					</mu-button>
					<mu-button icon>
						<i class="logo-icon"></i>
					</mu-button>
					<mu-button icon>
						<i class="video-icon"></i>
					</mu-button>
				</div>
				<mu-button icon slot="right">
					<mu-icon value="search"></mu-icon>
				</mu-button>
			</mu-appbar>
		</div>
		<div class="link-wrapper">
			<mu-button flat @click="toDiscover('stylerecommd',0)">
				<span class="top-link" :class="linknum == 0 ? 'active' : ''">推荐</span>
			</mu-button>
			<mu-button flat @click="toDiscover('songsheet',1)">
				<span class="top-link" :class="linknum == 1 ? 'active' : ''">朋友</span>
			</mu-button>
			<mu-button flat @click="toDiscover('anchorstation',2)">
				<span class="top-link" :class="linknum == 2 ? 'active' : ''">主电台</span>
			</mu-button>
		</div>
	</div>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default {
		name: 'DiscoveryHeader',
		data() {
			return {
				linknum: 0
			}
		},
		computed: {
			...mapState(['leftOpen'])
		},
		methods: {
			...mapActions(['setLfetOpen']),
			toDiscover(path,num) {
				this.linknum = num
				this.$router.push(`/discover/${path}`)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;
	.discovery-header {
		width: 100%;

		.discovery-wrapper {
			height: 56px;

			.mu-appbar {
				.header-btn {
					margin: 0 auto;
					display: flex;
					width: 90%;

					.mu-button {
						flex: 1;

						.music-icon,
						.logo-icon,
						.video-icon {
							display: inline-block;
							height: 56px;
							width: 56px;
						}

						.music-icon {
							background: url(../../../public/images/top_music.png) center center no-repeat;
							background-size: 56px;
						}

						.logo-icon {
							background: url(../../../public/images/loadlogo.png) center center no-repeat;
							background-size: 56px;
						}

						.video-icon {
							background: url(../../../public/images/top_video.png) center center no-repeat;
							background-size: 56px;
						}
					}
				}
			}
		}
	
		.link-wrapper {
					display: flex;
					background: @light-theme-bg;
		
					.mu-button {
						flex: 1;
						color: @light-theme-font;
						.active{
							display: inline-block;
							border-bottom: 2px solid #fff;
							color: #fff;
						}
					}
				}
	}
</style>
