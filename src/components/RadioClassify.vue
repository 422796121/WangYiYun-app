<template>
	<div class="radio-classify-view">
		<div class="radio-classify-wrapper">
			<div class="hot">
				<div class="title">热门分类</div>
				<div class="content">
					<div class="content-item" v-for="(hotclassify,hotclassifyindex) in hotClassifyRadioList" :key="hotclassifyindex + 'hotclassify'">
						<div>
							<img :src="hotclassify.pic56x56Url">
							<span class="name">{{hotclassify.name}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="more">
				<div class="title">更多分类</div>
				<div class="content">
					<div class="content-item" v-for="(moreclassify,moreclassifyindex) in moreClassifyRadioList" :key="moreclassifyindex + 'moreclassify'">
						<div>
							<img :src="moreclassify.pic56x56Url">
							<span class="name">{{moreclassify.name}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'RadioClassify',
		computed: {
			...mapGetters({
				hotClassifyRadioList: 'hotClassifyRadioList',
				moreClassifyRadioList: 'moreClassifyRadioList'
			})
		},
	}
</script>

<style lang="less" scoped="scoped">
	.radio-classify-view {
		width: 100%;

		.radio-classify-wrapper {

			//分类
			.hot,
			.more {
				.title {
					padding-left: 3%;
					height: 40px;
					line-height: 40px;
					font-size: 15px;
					font-weight: bold;
				}

				.content {
					display: flex;
					flex-wrap: wrap;
					border-top: 1px solid #f2f2f2;

					.content-item {
						flex: 0 0 50%;
						width: 50%;
						height: 46px;
						border-bottom: 1px solid #f2f2f2;

						&:nth-child(2n) .name {
							border: 0;
						}

						&>div {
							margin: 0 auto;
							width: 80%;
							height: 46px;
							display: flex;

							&>img {
								margin: 8px;
								flex: 0 0 30px;
								width: 30px;
								height: 30px;
							}

							.name {
								margin-top: 8px;
								flex: 1;
								height: 30px;
								line-height: 30px;
								font-size: 14px;
								border-right: 1px solid #f2f2f2;
							}

						}
					}
				}
			}
		
			.more {
				.content {
					.content-item:last-child{
						border-bottom: 0;
					}
				}
			}
			
			
		}
	}
</style>
