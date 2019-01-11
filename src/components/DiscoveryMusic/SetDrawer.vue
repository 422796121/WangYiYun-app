<template>
		<mu-drawer :open="leftBar" :docked="false" @close="setLfetOpen">
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
				<div class="btn">
					<mu-button round color="primary">Primary</mu-button>
				</div>
			</div>
			<mu-list>
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
				<mu-list-item button>
					<mu-list-item-title>我的好友</mu-list-item-title>
				</mu-list-item>
				<mu-list-item button>
					<mu-list-item-title>附近的人</mu-list-item-title>
				</mu-list-item>
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
			...mapGetters(['leftBar'])
		},
		methods: {
			...mapActions(['setLfetOpen'])
		}
	}
</script>

<style lang="less" scoped="scoped">
	.header-unlogin{
		.content{
			padding-top: 30%;
			transform: translateY(-50%);
			height: 50px;
			&>span{
				padding: 3px 0;
				display: inline-block;
				width: 100%;
				text-align: center;
				font-size: 14px;
			}
		}
		.btn{
			padding-top: 10px;
			height: 50px;
			width: 100%;
			.mu-button{
				margin-left: 50%;
				transform: translateX(-50%);
			}
		}
		
	}
	.set-list .mu-item-action {
        min-width: 35px;
    }
	.mu-paper{
		width: 80%;
	}

</style>
