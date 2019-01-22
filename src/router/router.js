import Vue from 'vue'
import Router from 'vue-router'
import MyMusicView from '../views/MyMusicView.vue'
import DiscoveryMusic from '../views/DiscoveryMusicView.vue'
import VideoView from '../views/VideoView.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	routes: [{
			path: '/mymusicview',
			name: 'mymusicview',
			redirect: '/mymusicview/mine',
			component: MyMusicView,
			children: [{
				path: 'mine',
				name: 'mine',
				component: () => import('../views/MyMusic/MyMusic.vue')
			}]
		},
		{
			path: '/discover',
			name: 'discover',
			redirect: '/discover/stylerecommd',
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
				},
				// 				{
				// 					path: 'friends',
				// 					name: 'friends',
				// 					component: () => import('../views/DiscoveryMusic/Rankings.vue')
				// 				},
				{
					path: 'radio',
					name: 'radio',
					component: () => import('../views/DiscoveryMusic/RadioView.vue')
				}
			]
		},
		{
			path: '/videoview',
			name: 'videoview',
			component: VideoView
		},
		{
			path: '/account',
			name: 'account',
			component: () => import ('../views/AccountView.vue')
		},
		{
			path: '/account/:type',
			name: 'accounttype',
			component: () => import ('../views/Account/LoginOrRegister.vue')
		}
	]
})
