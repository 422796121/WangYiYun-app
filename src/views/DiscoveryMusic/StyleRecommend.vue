<template>
		<div></div>
</template>

<script>
	import {
		mapState,mapActions
	} from 'vuex'
	export default {
		name: 'StyleRecommend',
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

	.style-recommend-view {
		width: 100%;
	}
</style>
