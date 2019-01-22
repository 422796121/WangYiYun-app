<template>
	<div class="descovery-view" ref="descovery">
		<ul>
			<li>
				<home-header></home-header>
			</li>
			<li>
				<router-view></router-view>
			</li>
		</ul>
	</div>
</template>

<script>
	import HomeHeader from '../components/HomeHeader.vue'
	import {mapState} from 'vuex'
	export default {
		name: 'VideoView',
		components: {
			HomeHeader
		},
		data() {
			return {
				discoveryScroll: null
			}
		},
		mounted() {
			this.$nextTick(() => {
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
