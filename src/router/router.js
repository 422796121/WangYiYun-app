import Vue from 'vue'
import Router from 'vue-router'
import DiscoveryMusic from '../views/DiscoveryMusicView.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkExactActiveClass: 'active',
	routes: [{
		path: '/discover',
		name: 'discover',
		component: DiscoveryMusic,
		children: [{
				path: 'stylerecommd',
				name: 'stylerecommd',
				component: () => import('../views/DiscoveryMusic/StyleRecommend.vue')
			},
			{
				path: 'songsheet',
				name: 'songsheet',
				component: () => import('../views/DiscoveryMusic/SongSheet.vue')
			},
			{
				path: 'anchorstation',
				name: 'anchorstation',
				component: () => import('../views/DiscoveryMusic/AnchorStation.vue')
			},
			{
				path: 'rankings',
				name: 'rankings',
				component: () => import('../views/DiscoveryMusic/Rankings.vue')
			}
		]
	}]
})
