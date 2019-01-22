<template>
	<div class="account-view">
		<div class="account-wrapper">
			<div class="logo">
				<img src="../../public/logo.png" width="90" height="90">
			</div>
			<div class="center">
				<div class="btn">
					<mu-button round small @click="toLoginOrRegister('cellphone')">手机号登陆</mu-button>
				</div>
				<div class="btn">
					<mu-button round small @click="toLoginOrRegister('email')">邮箱登陆</mu-button>
				</div>
				<div class="btn">
					<mu-button round small @click="toLoginOrRegister('register')">注册</mu-button>
				</div>
				<div class="no-login">
					<span>游客试用</span>
				</div>
			</div>
			<div class="bottom">
				<div class="title">
					<div class="left-line"></div>
					<span>其他登陆方式</span>
					<div class="right-line"></div>
				</div>
				<div class="else-login">
					<div class="wechat">
						<div class="icon"></div>
						<div class="name">微信</div>
					</div>
					<div class="qq">
						<div class="icon"></div>
						<div class="name">QQ</div>
					</div>
					<div class="weibo">
						<div class="icon"></div>
						<div class="name">微博</div>
					</div>
					<div class="wangyi">
						<div class="icon"></div>
						<div class="name">网易邮箱</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		name: 'AccountView',
		methods: {
			...mapActions(['setBottonPlayer']),
			toLoginOrRegister(type){
				
				this.$router.push({name:'accounttype',params:{type:type}})
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.setBottonPlayer(false)
			})
		},
		beforeRouteLeave(to, from, next) {
			this.setBottonPlayer(true)
			next()
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;

	.account-view {
		height: 100%;
		width: 100%;

		.account-wrapper {
			height: 100%;
			position: relative;

			.logo {
				position: relative;
				height: 35%;
				background: url(../../public/images/account_bg.jpg) no-repeat;
				background-size: cover;

				&>img {
					position: absolute;
					top: 20%;
					right: 0;
					bottom: 0;
					left: 0;
					margin: auto;
					-webkit-box-reflect: below 1px -webkit-linear-gradient(transparent 85%, rgba(0, 0, 0, .2));
				}

			}

			.center {
				padding-top: 10px;
				background: -webkit-linear-gradient(#fff3ff, #fafafa);
				background: -o-linear-gradient(#fff3ff, #fafafa);
				background: -moz-linear-gradient(#fff3ff, #fafafa);
				background: linear-gradient(#fff3ff, #fafafa);

				.btn {
					height: 49px;
					width: 100%;
					text-align: center;

					.mu-button {
						height: 35px;
						width: 80%;
						box-shadow: none;
						color: @light-theme-bg;
						border: 1px solid @light-theme-bg;
						background: rgba(255,255,255,.9);
					}
				}
				.no-login{
					height: 35px;
					line-height: 35px;
					text-align: center;
					&>span{
						text-decoration: underline;
						color: #595959;
						font-size: 13px;
					}
				}
			}

			.bottom {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 125px;

				.title {
					display: flex;
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 13px;
					color: rgba(0,0,0,0.8);
					.left-line,.right-line{
						margin-top: 23px;
						flex: 1;
						height: 1px;
					}
					
					.left-line {
						background: -webkit-gradient(linear, 0 0, 100% 0, from(#d9d9d9), to(#fafafa));
						background: -webkit-linear-gradient(to left, #d9d9d9, #fafafa);
						background: -moz-linear-gradient(to left, #d9d9d9, #fafafa);
						background: -o-linear-gradient(to left, #d9d9d9, #fafafa);
						background: linear-gradient(to left, #d9d9d9, #fafafa);
					}

					&>span {
						flex: 0 0 100px;
					}

					.right-line {
						background: -webkit-gradient(linear, 100% 0, 0 0, from(#d9d9d9), to(#fafafa));
						background: -webkit-linear-gradient(to right, #d9d9d9, #fafafa);
						background: -moz-linear-gradient(to right, #d9d9d9, #fafafa);
						background: -o-linear-gradient(to right, #d9d9d9, #fafafa);
						background: linear-gradient(to right, #d9d9d9, #fafafa);
					}
				}
			
				.else-login{
					margin: 0 auto;
					display: flex;
					width: 90%;
					&>div{
						flex: 1;
						width: 60px;
						text-align: center;
						.name{
							padding: 6px 0;
							font-size: 10px;
							color: #a6a6a6;
						}
						.icon{
							margin: 0 auto;
							height: 40px;
							width: 40px;
						}
					}
					.wechat{
						.icon{
							background: url(../../public/images/login_wechat_icon.png) center center no-repeat;
							background-size: 40px;
						}
					}
					.qq{
						.icon{
							background: url(../../public/images/login_qq_icon.png) center center no-repeat;
							background-size: 40px;
						}
					}
					.weibo{
						.icon{
							background: url(../../public/images/login_weibo_icon.png) center center no-repeat;
							background-size: 40px;
						}
					}
					.wangyi{
						.icon{
							background: url(../../public/images/login_yi_icon.png) center center no-repeat;
							background-size: 40px;
						}
					}
					
					
				}
			
			}

		}

	}
</style>
