<template>
	<div class="pull-up-load">
		<div class="pull-up-wrapper">
			<div class="pull-up" v-loading="true" data-mu-loading-size="24" data-mu-loading-color="#d23023"
			 data-mu-loading-overlay-color="rgba(255,255,255,0.8)"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'pullUpLoad'

	}
</script>

<style lang="less" scoped="scoped">
	.pull-up-load {
		position: fixed;
		top: 89px;
		left: 0;
		width: 100%;
		background: transparent;
		z-index: 900;

		.pull-up-wrapper {
			margin: 0 auto;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			.pull-up {
				position: relative;
				height: 40px;
			}
		}
	}

</style>
