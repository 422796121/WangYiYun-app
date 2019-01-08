<template>
	<div id="app">
		<loading v-if="isAjax"></loading>
		<router-view v-else/>
		<set-drawer></set-drawer>
	</div>
</template>
<script>
	import Loading from './views/Loading.vue'
	import SetDrawer from './components/DiscoveryMusic/SetDrawer.vue'
	import {mapState} from 'vuex'
	export default {
		name: 'App',
		components: {
			Loading,
			SetDrawer
		},
		computed: {
			...mapState(['isAjax'])
		}
	}
</script>
<style>
	html,
	body {
		height: 100%;
		width: 100%;
	}

	#app {
		height: 100%;
	}
</style>
