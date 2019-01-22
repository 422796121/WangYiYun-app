<template>
	<div id="app">
		<loading v-if="isLoading"></loading>
		<div class="main-view" v-else>
			<keep-alive>
				<router-view />
			</keep-alive>
			<!-- <div class="set-space"></div> -->
			<bottom-music-player v-show="showBottomPlayer"></bottom-music-player>
			<set-drawer></set-drawer>
		</div>
	</div>
</template>
<script>
	import Loading from './views/Loading.vue'
	import SetDrawer from './components/SetDrawer.vue'
	import BottomMusicPlayer from './components/BottomMusicPlayer.vue'
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'App',
		components: {
			Loading,
			SetDrawer,
			BottomMusicPlayer
		},
		computed: {
			...mapState(['isLoading', 'isAjax', 'showBottomPlayer']),
			...mapGetters({
				recommdList: 'recommdList'
			})
		},
		methods: {
			...mapActions(['getDiscoveryData'])
		}
	}
</script>
<style lang="less">
	html,
	body {
		height: 100%;
		width: 100%;
	}

	#app {
		height: 100%;

		.main-view {
			height: 100%;
		}

		// 		.set-space {
		// 			height: 44px;
		// 			width: 100%;
		// 		}
	}
</style>
