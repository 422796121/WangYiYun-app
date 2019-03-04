<template>
	<mu-drawer :open="leftBar" :docked="false" @close="setLeftOpen">
		<div class="header-login" v-if="loginUserStatus" :style="{background:'url('+ userDetail.profile.backgroundUrl+')',backgroundSize:'cover'}">
			<div class="title">
				<mu-avatar :size="54">
					<img :src="userDetail.profile.avatarUrl">
				</mu-avatar>
				<div class="desc">
					<div class="name">{{userDetail.profile.nickname}}</div>
					<div class="level">Lv{{userDetail.level}}</div>
				</div>
			</div>
		</div>
		<div class="header-unlogin" v-else>
			<div class="content" @click="setLeftOpen">
				<span>登陆网易云音乐</span>
				<span>手机电脑多端同步，尽享海量高品质音乐</span>
			</div>
			<div class="btn">
				<mu-button round small @click="toLogin">立即登录</mu-button>
			</div>
		</div>
		<mu-list>
			<div class="use-space"></div>
			<mu-list-item button>
				<mu-list-item-title>我的消息</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>会员中心</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>商场</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>游戏推荐</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>在线听歌免流量</mu-list-item-title>
			</mu-list-item>
			<div class="use-space"></div>
			<mu-list-item button>
				<mu-list-item-title>我的好友</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>附近的人</mu-list-item-title>
			</mu-list-item>
			<div class="use-space"></div>
			<mu-list-item button>
				<mu-list-item-title>个性换肤</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>听歌识曲</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>定时停止播放</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>扫一扫</mu-list-item-title>
			</mu-list-item>
			<mu-list-item button>
				<mu-list-item-title>音乐闹钟</mu-list-item-title>
			</mu-list-item>
		</mu-list>
		<div class="bottom-btn">
			<span><i></i>退出登陆</span>
			<span><i></i>设置</span>
			<span><i></i>退出</span>
		</div>
	</mu-drawer>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'StyleRecommend',
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(['leftBar', 'loginUserStatus', 'userDetail'])
		},
		methods: {
			...mapActions(['setLeftOpen', 'setBottonPlayer']),
			toLogin() {
				this.setBottonPlayer(false)
				this.setLeftOpen()
				this.$router.push('/account')
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.use-space {
		height: 5px;
		background: rgba(166, 166, 166, .2);
	}

	.header-login {
		padding-top: 50px;
		padding-bottom: 5px;
		color: rgba(255, 255, 255, 0.8);
		font-size: 14px;

		.title {
			padding-left: 5px
		}

		.desc {
			padding: 5px 0;
			padding-left: 3px;
			display: flex;

			.name {
				flex: 1;
			}

			.level {
				flex: 0 0 30px;
				font-size: 13px;
			}
		}
	}

	.header-unlogin {
		background: url(../../public/images/left-bg.png) center center no-repeat;
		background-size: cover;
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

	.mu-list {
		padding-top: 0;
		font-size: 16px;

	}

	.set-list .mu-item-action {
		min-width: 35px;
	}

	.mu-paper {
		width: 80%;
	}

	.bottom-btn {
		display: flex;
		background: #fff;
		border-top: 1px solid rgba(128, 128, 128, 0.4);

		&>span {
			padding: 10px 0;
			flex: 1;
			text-align: center;
			font-size: 15px;
		}
	}
</style>
