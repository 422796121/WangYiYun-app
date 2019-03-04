<template>
	<div class="header-unlogin" v-show="!loginUserStatus">
		<div class="content">
			<span>登陆网易云音乐</span>
			<span>手机电脑多端同步，尽享海量高品质音乐</span>
		</div>
		<div class="btn">
			<mu-button round small @click="toLogin">立即登录</mu-button>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'FrinedView',
		computed: {
			...mapGetters(['loginUserStatus'])
		},
		methods: {
			...mapActions(['setBottonPlayer', 'getFriendEvent']),
			toLogin() {
				this.setBottonPlayer(false)
				this.$router.push('/account')
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;
	@light-theme-font: #faf6f5;
	@light-theme-font-black: #333;


	.header-unlogin {
		width: 100%;
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
</style>
