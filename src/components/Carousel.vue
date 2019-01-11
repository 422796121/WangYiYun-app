<template>
	<div class="carousel-wrapper" ref="carousel">
		<ul class="carousel-list" ref="slide">
			<li class="carousel-item" v-for="(carousel,index) in apiData.carousel" :key="index">
				<img :src="carousel.img" :alt="carousel._id">
			</li>
		</ul>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		name: 'Carousel',
		data() {
			return {
				carouselScroll: null
			}
		},
		computed: {
			...mapGetters(['apiData'])
		},
		mounted() {
			this.setCarousel({
				scroll: this.carouselScroll,
				carousel: this.$refs.carousel,
				slide: this.$refs.slide
			})
		},
		methods: {
			...mapActions(['setCarousel'])
		}
	}
</script>

<style lang="less" scoped="scoped">
	.carousel-wrapper {
		margin: 0 auto;
		width: 95%;
		overflow: hidden;
		border-radius: 10px;

		.carousel-list {
			position: relative;
			display: inline-block;			
			
			.carousel-item {
				display: inline-block;
				text-align: center;
				height: 160px;
				overflow: hidden;
				&>img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
