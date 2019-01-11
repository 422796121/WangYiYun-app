<template>
	<div class="descovery-view" ref="descovery">
		<ul>
			<li>
				<DiscoveryHeader></DiscoveryHeader>
			</li>
			<li>
				<router-view></router-view>
			</li>
		</ul>
	</div>
</template>

<script>
	import DiscoveryHeader from '../components/DiscoveryMusic/DiscoveryHeader.vue'
	import {mapState} from 'vuex'
	export default {
		name: 'MyMusicView',
		components: {
			DiscoveryHeader
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
		}
	}
</script>

<style lang="less" scoped="scoped">
	.descovery-view {
		height: 100%;
	}
</style>
