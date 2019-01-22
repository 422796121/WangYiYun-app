<template>
	<div class="mymusic-view">
		<home-header></home-header>
		<div class="mymusic-wrapper" ref="mymusic">
			<ul>
				<li>
					<div class="use-space"></div>
					<pull-up-load v-show="isAjax"></pull-up-load>
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import HomeHeader from '../components/HomeHeader.vue'
	import PullUpLoad from '../components/PullUpLoad.vue'
	import {
		mapActions
	} from 'vuex'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'MyMusicView',
		components: {
			HomeHeader,
			PullUpLoad
		},
		data() {
			return {
				mymusicScroll: null
			}
		},
		created() {
			this.$nextTick(() => {
				this.setScrollComponent()
			})
		},
		updated() {
			this.setScrollComponent()
		},
		computed: {
			...mapState(['isAjax', 'scroll'])
		},
		methods: {
			...mapActions(['setScroll', 'refreshScroll']),
			setScrollComponent() {
				if (this.mymusicScroll === null) {
					this.setScroll({
						name: 'mymusic',
						scroll: this.mymusicScroll,
						ref: this.$refs.mymusic
					})
					this.mymusicScroll = this.scroll['mymusic']
				} else {
					this.refreshScroll(this.scroll['mymusic'])
				}
				if (this.scroll['mymusic'] !== null) {
					this.scroll['mymusic'].on('pullingDown', () => {
						// this.reGetDiscoveryData(this.axios)
						// this.getRadioData(this.axios)
						this.scroll['mymusic'].finishPullDown()
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.mymusic-view {
		height: 100%;
		width: 100%;

		.mymusic-wrapper {
			height: 100%;

			.use-space {
				height: 56px;
			}
		}
	}
</style>
