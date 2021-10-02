<template>
	<view class="container xxx-container">
		<msg></msg>
		
	</view>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			
		};
	},
	onLoad(options) {
		
	},
	onShow(){
		
	},
	computed: {
		...mapState('user', ['$sourcePath']),
	},
	methods: {
		
	}
};
</script>
<style lang="scss">
.xxx-container {
	height: 100vh;
	background-color: $bg-color-base;
}
</style>
