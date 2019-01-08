<template>
		<mu-drawer :open="$store.state.discover.leftOpen" :docked="false" @close="setLfetOpen">
			<!-- <div class="header-login">
				<div class="title">
					<mu-avatar :size="54">
						<img :src="">
					</mu-avatar>
					<div class="desc">
						<div class="name">{{self.name}}</div>
						<div class="tel">tel:{{self.phone}}</div>
					</div>
				</div>
			</div> -->
			<div class="header-unlogin">
				<div class="content">
					<span>登陆网易云音乐</span>
					<span>手机电脑多端同步，尽享海量高品质音乐</span>
				</div>
				<mu-button round color="primary">Primary</mu-button>
			</div>
			<mu-list>
				<mu-list-item button>
					<mu-list-item-title>Menu Item 1</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>Menu Item 2</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>Menu Item 2</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>Menu Item 2</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>Menu Item 2</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>Menu Item 2</mu-list-item-title>
				</mu-list-item>
			</mu-list>
		</mu-drawer>
</template>

<script>
	import {
		mapState,
		mapActions
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
	.set-list .mu-item-action {
        min-width: 35px;
    }
</style>
