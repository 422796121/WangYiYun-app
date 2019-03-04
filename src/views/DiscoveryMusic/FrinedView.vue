<template>
	<div class="friend-view">
		<v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
			<need-login></need-login>
		</v-touch>
	</div>
</template>

<script>
	import NeedLogin from "../../components/NeedLogin.vue"
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'FrinedView',
		components: {
			NeedLogin
		},
		computed: {
			...mapGetters(['loginUserStatus'])
		},
		methods: {
			...mapActions(['setBottonPlayer', 'getFriendEvent']),
			toLogin() {
				this.setBottonPlayer(false)
				this.$router.push('/account')
			},
			swiperleft() {
				this.$router.push('/discover/radio')
			},
			swiperright() {
				this.$router.push('/discover/stylerecommd')
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getFriendEvent(this.axios)
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;
	@light-theme-font-black: #333;

	.friend-view {
		width: 100%;

		.header-unlogin {
			background: rgba(0, 0, 0, 0.8);
			padding-bottom: 28px;

			.content {
				padding-top: 30%;
				transform: translateY(-50%);
				height: 50px;
				color: rgba(255, 255, 255, 0.8);

				&>span {
					padding: 3px 0;
					display: inline-block;
					width: 100%;
					text-align: center;
					font-size: 14px;
				}
			}

			.btn {
				margin-top: 30px;
				height: 40px;
				width: 100%;

				.mu-button {
					margin-left: 50%;
					padding: 0 10px;
					transform: translateX(-50%);
					width: 150px;
					border: .5px solid rgba(255, 255, 255, 0.8);
					background: transparent;
					color: #fff;
				}
			}

		}

	}
</style>
