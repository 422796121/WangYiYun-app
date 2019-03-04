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
				// 我的音乐
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
					// 主页
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
				// 排行
// 				{
// 					path: 'rankings',
// 					name: 'rankings',
// 					component: () => import('../views/DiscoveryMusic/Rankings.vue')
// 				},
				// 动态
				{
					path: 'friends',
					name: 'friends',
					component: () => import('../views/DiscoveryMusic/FrinedView.vue')
				},
				// 电台
				{
					path: 'radio',
					name: 'radio',
					component: () => import('../views/DiscoveryMusic/RadioView.vue')
				}
			]
		},
		// 视频
		{
			path: '/videoview',
			name: 'videoview',
			component: () => import('../views/DiscoveryMusic/VideoView.vue')
		},
		// 视频播放
		{
			path: '/videoplayview/:id',
			name:'videoplayview',
			component: () => import('../views/MyMusic/VideoPlayView.vue')
		},
		// 登录注册入口
		{
			path: '/account',
			name: 'account',
			component: () => import('../views/AccountView.vue')
		},
		// 登录注册
		{
			path: '/account/:type',
			name: 'accounttype',
			component: () => import('../views/Account/LoginOrRegister.vue')
		},
		//歌单
		{
			path: '/songlistview',
			name: 'songlistview',
			component: () => import('../views/MyMusic/SongListView.vue')
		},
		//列表
		{
			path: '/morelistview',
			name: 'morelistview',
			component: () => import('../views/MyMusic/MoreListView.vue')
		},
		//搜索
		{
			path: '/searchview',
			name: 'searchview',
			component: () => import('../views/Account/SearchView.vue')
		}
	]
})
