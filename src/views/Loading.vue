<template>
	<div class="loading-view">
		<div class="loading-wrapper">
			<div class="loading-img">
				<img src="../../public/images/loadingcontent.png">
			</div>
		</div>
		<div class="footer">
			<div class="loading-img">
				<img src="../../public/images/loadingtitle.png">
			</div>
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
		background-color: RGB(207, 50, 50);

		.loading-wrapper {
			position: absolute;
			top: 55%;
			left: 0;
			height: 60%;
			transform: translateY(-50%);
			width: 100%;

			.loading-img {
				text-align: center;

				&>img {
					width: 60%;
					height: 60%;
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

			.loading-img {
				position: absolute;
				left: 0;
				bottom: 20px;
				text-align: center;

				&>img {
					width: 40%;
					height: 40%;
				}
			}

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
