<template>
	<div>
		{{type}}
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		name: 'LoginOrRegister',
		data(){
			return {
				type: this.$route.params.type
			}
		},
		methods: {
			...mapActions(['setBottonPlayer'])
		},
		mounted() {
			this.$nextTick(() => {
				this.setBottonPlayer(false)
			})
		},
		beforeRouteLeave(to, from, next) {
			this.setBottonPlayer(true)
			next()
		},
		update(){
			console.log('a')
		}
	}
</script>

<style>

</style>
