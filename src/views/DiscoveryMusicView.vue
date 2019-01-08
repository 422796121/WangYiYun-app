<template>
	<div class="descovery-view" ref="descovery">
		<ul>
			<li>
				<DiscoveryHeader></DiscoveryHeader>
			</li>
			<li>
				<router-view></router-view>
			</li>
			<li>
				<DiscoveryFooter></DiscoveryFooter>
			</li>
		</ul>
	</div>
</template>

<script>
	import DiscoveryHeader from '../components/DiscoveryMusic/DiscoveryHeader.vue'
	import DiscoveryFooter from '../components/DiscoveryMusic/DiscoveryFooter.vue'
	import SetDrawer from '../components/DiscoveryMusic/SetDrawer.vue'
	import {mapState} from 'vuex'
	export default {
		name: 'DiscoveryMusicView',
		components: {
			DiscoveryHeader,
			DiscoveryFooter,
			SetDrawer
		},
		data() {
			return {
				discoveryScroll: null
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.$store.commit('SET_SCROLL', {
					discoveryScroll: this.discoveryScroll,
					descovery: this.$refs.descovery
				})
			})
		},
		computed: {
			...mapState(['isAjax', 'data'])
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped="scoped">
	.descovery-view {
		height: 100%;

		&>ul {}
	}
</style>
