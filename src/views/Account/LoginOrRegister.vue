<template>
	<div class="loreView">
		<div class="loreView-header">
			<i class="account-icon back" @click="backToAccount"></i>
			<span class="title">{{pageTitle}}</span>
		</div>
		<div class="first-input">
			<div class="phone-tip" v-if="pageType == 'cellphone'">
				<i class="account-icon phone"></i>
				<span :class="content ? 'dark' : ''">+86</span>
			</div>
			<div class="email-tip" v-else>
				<i class="account-icon email"></i>
			</div>
			<input type="text" name="phone" placeholder="请输入手机号" v-if="pageType == 'cellphone'" v-model="phone">
			<input type="text" name="email" placeholder="请输入邮箱" v-else v-model="email">
			<i class="dele" v-show="content" @click="clearInput"></i>
		</div>
		<div class="second-inpunt">
			<i class="account-icon pwd"></i>
			<input type="password" placeholder="请输入密码" name="pwd" v-model="password">
			<span class="forget">忘记密码？</span>
		</div>
		<div class="btn">
			<mu-button round small @click="submitInput">{{pageBtn}}</mu-button>
		</div>
		<div class="bottom-tooltip">
			<mu-tooltip placement="top" :content="loginMsg" :open="tooltips">
				<div class="use-space"></div>
			</mu-tooltip>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'LoginOrRegister',
		data() {
			return {
				type: this.$route.params.type,
				content: false, //是否已输入
				phone: "",
				email: "",
				password: "",
				tooltips: false //提示框
			}
		},
		computed: {
			...mapGetters({
				pageType: 'pageType',
				pageBtn: 'pageBtn',
				pageTitle: 'pageTitle',
				loginMsg: 'loginMsg'
			})
		},
		methods: {
			...mapActions(['setBottonPlayer', 'loginSubmit', 'changeLoginMsg']),
			backToAccount() {
				this.setBottonPlayer(false)
				this.$router.push('/account')
			},
			//清空账号
			clearInput() {
				this.phone = ""
				this.email = ""
			},
			//提示框
			showTooltips() {
				this.tooltips = true
				setTimeout(() => {
					this.tooltips = false
				}, 2000);
			},
			//验证
			checkInput(reg, str, msg) {
				if (str === "") {
					this.changeLoginMsg("账号或密码不能为空")
					this.showTooltips()
					return true
				}
				if (!reg.test(str)) {
					this.changeLoginMsg(msg)
					this.showTooltips()
					return true
				}
			},
			//提交
			submitInput() {
				var username = ""
				var flag = false
				if (this.pageType === 'cellphone') {
					username = this.phone
					flag = this.checkInput(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, username,
						"手机号码格式错误")
					if (flag === true)
						return
				} else if (this.pageType === 'email') {
					username = this.email
					flag = this.checkInput(/^\w+([-+.]*\w+)*@\w+\.\w+$/, username, "邮箱格式错误")
					if (flag === true)
						return
				}
				flag = this.checkInput(/^\w{6,11}$/, this.password, "密码为6到11位")
				if (flag === true)
					return
				this.loginSubmit({
					axios: this.axios,
					type: this.pageType,
					username: username,
					password: this.password,
					showTooltips: this.showTooltips,
					toIndex: this.toIndex,
					cookie: this.$cookies
				})
			},
			//首页
			toIndex(type) {
				this.setBottonPlayer(true)
				this.$router.push('/discover/stylerecommd')
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.setBottonPlayer(false)
			})
		},
		beforeRouteLeave(to, from, next) {
			// this.setBottonPlayer(true)
			next()
		},
		watch: {
			phone(val) {
				if (val === "") {
					this.content = false
				} else {
					this.content = true
				}
			},
			email(val) {
				if (val === "") {
					this.content = false
				} else {
					this.content = true
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@light-theme-bg: #d23023;

	.loreView {
		position: relative;
		height: 100%;
		width: 100%;

		.loreView-header {
			display: flex;
			height: 44px;
			background: @light-theme-bg;

			.back {
				margin-left: 2px;
				padding-top: 12px;
				flex: 0 0 32px;
				display: inline-block;
				height: 44px;
				width: 32px;
				background: url(../../../public/images/login_back.png) center center no-repeat;
				background-size: 18px;
			}

			.title {
				padding-left: 3px;
				flex: 1;
				line-height: 46px;
				font-size: 14px;
				color: #fff;
			}
		}

		.first-input,
		.second-inpunt {
			display: flex;
			margin: 0 auto;
			width: 90%;
			height: 40px;
			border-bottom: 1px solid #D9D9D9;

			.account-icon,
			.dele {
				margin-top: 8px;
				display: inline-block;
				height: 32px;
				width: 32px;
			}

			&>input {
				padding-top: 8px;
				padding-left: 5px;
				flex: 1;
				border: 0;
				height: 40px;
				background: transparent;
				font-size: 15px;

				&::-webkit-input-placeholder {
					color: rgba(166, 166, 166, .9);
					font-size: 14px;
				}

				/* 使用webkit内核的浏览器 */
				&:-moz-placeholder {
					color: rgba(166, 166, 166, .9);
					font-size: 14px;
				}

				/* Firefox版本4-18 */
				&::-moz-placeholder {
					color: rgba(166, 166, 166, .9);
					font-size: 14px;
				}

				/* Firefox版本19+ */
				&:-ms-input-placeholder {
					color: rgba(166, 166, 166, .9);
					font-size: 14px;
				}

				/* IE浏览器 */
			}

			&>input:focus {
				outline: none;
			}
		}

		.first-input {
			margin: 20px auto 15px;

			.phone-tip {
				flex: 0 0 62px;

				.phone {
					background: url(../../../public/images/login_phone.png) center center no-repeat;
					background-size: 18px;
				}

				&>span {
					display: inline-block;
					height: 40px;
					width: 30px;
					font-size: 14px;
					color: #A6A6A6;
					line-height: 50px;
					vertical-align: top;
				}

				.dark {
					color: #000;
				}
			}

			.email-tip {
				flex: 0 0 32px;

				.email {
					background: url(../../../public/images/login_email.png)center center no-repeat;
					background-size: 18px;
				}
			}

			.dele {
				flex: 0 0 32px;
				background: url(../../../public/images/login_dele.png) center center no-repeat;
				background-size: 12px;
			}
		}

		.second-inpunt {
			margin: 20px auto 40px;

			.pwd {
				flex: 0 0 32px;
				background: url(../../../public/images/login_password.png) center center no-repeat;
				background-size: 18px;
			}

			.forget {
				flex: 0 0 64px;
				width: 64px;
				height: 40px;
				line-height: 50px;
				text-align: center;
				font-size: 8px;
				color: #007aae;
			}
		}

		.btn {
			height: 49px;
			width: 100%;
			text-align: center;

			.mu-button {
				height: 35px;
				width: 80%;
				box-shadow: none;
				color: #fff;
				background: @light-theme-bg;
			}
		}

		.bottom-tooltip {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;

			.use-space {
				height: 56px;
				width: 100%;
			}
		}
	}
</style>
