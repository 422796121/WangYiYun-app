<template>
	<div class="search-view">
				<div class="history-wrapper" v-show="historyArr.length != 0">
					<div class="title">
						<h2>搜索历史</h2>
						<span>
							<i class="icon-clear clear-icon"></i>
							<span @click="clearHistory">清除记录</span>
						</span>
					</div>
					<div class="content" v-for="(his,index) in historyArr" :key="index" @click="toClassifyDetail(his)">
						<div class="text">
							<i class="icon-history history-icon"></i>
							<span class="key">{{his}}</span>
						</div>
					</div>
				</div>
				<div class="hot-wrapper" v-for="(hots,indexs) in hotSearchArr" :key="indexs">
					<div class="title">
						<h2>热销作品</h2>
					</div>
					<div class="content" v-for="(hot,index) in hots" :key="index" @click="goDetail(hot._id)">
						<div class="text">
							<span class="num">{{index+1}}</span>
							<span class="name">{{hot.title}}</span>
							<span class="author">{{hot.author}}</span>
						</div>
					</div>

				</div>
				<div class="tab-wrapper">
					<div class="title">
						<h2>热门标签</h2>
					</div>
					<div class="content">
						<div class="tab-item">
							<span class="tab"></span>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
			</li>

	</div>
</template>

<script>

	export default {
		name: 'SearchView'
		
	}
</script>

<style lang="less" scoped="scoped">
	.search-view {
		height: 100%;
		width: 100%;
		// background: RGB(242, 242, 242);

		&>ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.title {
			padding: 3px 0;
			height: 32px;
			line-height: 32px;
			font-size: 14px;
			background: #f2f2f2;

			&>h2 {
				display: inline-block;
				margin-left: 8px;
				padding-left: 8px;
				height: 17px;
				line-height: 17px;
				border-left: 7px solid RGB(94, 94, 94);
				border-radius: 2px;
				font-weight: 600;
			}

			&>span {
				float: right;
				margin-right: 8px;

				&>span {
					display: inline-block;
					height: 17px;
					font-size: 14px;

				}

				.menu-icon {
					vertical-align: middle;
					font-size: 14px;
				}
			}
		}

		.history-wrapper {
			margin-top: 8px;

			.title {
				background: #FFFFFF;

				&>span {
					color: #5e5e5e;
				}
			}

			.content {
				height: 37px;
				width: 100%;
				border-bottom: 1px solid #e1e1e1;

				&:last-child {
					border: 0;
				}

				.text {
					margin: 0 auto;
					width: 94%;
					height: 37px;
					line-height: 37px;
					font-size: 14px;
					color: #8a8a8a;
				}
			}
		}

		.hot-wrapper {
			overflow: hidden;
			background: #FFFFFF;

			.content {
				width: 100%;
				height: 38px;
				line-height: 38px;
				font-size: 14px;
				color: #888;
				border-top: .5px solid #dfdfdf;

				&:nth-child(2) .text .num {
					background: #ff4644 !important;
				}

				&:nth-child(3) .text .num {
					background: #e28d29 !important;
				}

				&:nth-child(4) .text .num {
					background: #9fc575 !important;
				}


				.text {
					position: relative;
					margin: 0 auto;
					width: 96%;

					&>span {
						display: inline-block;
						text-align: center;
					}

					.name {
						color: #4c4c4c;
					}

					.num {
						height: 18px;
						line-height: 18px;
						width: 18px;
						color: #FFFFFF;
						background: #8f8f8f;
						border-radius: 50%;
						text-align: center;
						font-size: 12px;
					}

					.author {
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}

		}

		.tab-wrapper {
			width: 100%;

			.content {
				margin: 0 auto;
				padding: 10px 0;
				width: 98%;

				.tab-item {
					padding: 5px 0;
					display: inline-block;
					float: left;
					width: 25%;

					.tab {
						margin-left: 50%;
						transform: translateX(-50%);
						display: inline-block;
						width: 85%;
						height: 36px;
						line-height: 36px;
						text-align: center;
						font-size: 14px;
						background: #f2f2f2;
						border: 1px solid #dfdfdf;
						border-radius: 5px;
						color: #4c4c4c;
					}
				}
			}
		}

	}
</style>
