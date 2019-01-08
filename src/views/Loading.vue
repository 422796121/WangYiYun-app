<template>
	<div class="loading-view">
		<div class="loading-wrapper">
			<div class="loading-img">
				<img src="../../public/images/loadlogo.png">
			</div>
			<div class="loading-content">
				<span>网易云音乐</span>
			</div>
		</div>
		<div class="footer">
			<div class="footer-content">
				<span>版权归OrangeMiracke所有</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Loading'
	}
</script>

<style lang="less" scoped="scoped">
	.loading-view {
		position: relative;
		height: 100%;
		width: 100%;
		background: url(../../public/images/loadbg.jpg) center center no-repeat;
		background-size: cover;

		.loading-wrapper {
			position: absolute;
			top: 30%;
			left: 0;
			transform: translateY(-50%);
			width: 100%;

			.loading-img {
				text-align: center;

				&>img {
					width: 80%;
					height: 80%;
				}
			}

			.loading-content {
				height: 56px;
				line-height: 56px;
				text-align: center;

				&>span {
					font-size: 30px;
					color: #fff;
					letter-spacing: 2px;
				}
			}
		}

		.footer {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 5px;

			.footer-content {
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 14px;
				letter-spacing: 1px;
				color: rgba(250, 246, 245, 0.5);
			}
		}
	}
</style>
