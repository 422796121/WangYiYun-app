<template>
	<div class="discovery-header">
		<div class="discovery-wrapper">
			<mu-appbar color='#d23023'>
				<mu-button icon slot="left" @click="setLfetOpen">
					<mu-icon value="menu"></mu-icon>
				</mu-button>
				<div class="header-btn">
					<mu-button icon>
						<router-link to="/mymusicview" tag="i" class="music-icon"></router-link>
					</mu-button>
					<mu-button icon>
						<router-link to="/discover" tag="i" class="logo-icon"></router-link>
					</mu-button>
					<mu-button icon>
						<router-link to="/videoview" tag="i" class="video-icon"></router-link>
					</mu-button>
				</div>
				<mu-button icon slot="right">
					<mu-icon value="search"></mu-icon>
				</mu-button>
			</mu-appbar>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'DiscoveryHeader',
		data() {
			return {
			}
		},
		computed: {
			...mapState(['leftOpen'])
		},
		methods: {
			...mapActions(['setLfetOpen'])
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;

	.discovery-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 999;

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
							opacity: .5;

							&.active {
								opacity: 1;
							}
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

	}
</style>
