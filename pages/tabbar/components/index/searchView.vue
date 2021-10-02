<template>
	<view class="search-view">
		<view class="top-view flex flex-center">
			<view class="search-bar-view flex flex-center space-between">
				<view class="flex flex-center">
					<image :src="`${$sourcePath}/top_right_search.png`" class="icon-search"></image>
					<input type="text" placeholder="请输入搜索内容" v-model="inputText" @input="changeInput">
				</view>
				<image :src="`${$sourcePath}/btn_chose_del.png`" class="clear" @click="clear"></image>
			</view>
			<text class="cancel" @click="cancel">取消</text>
		</view>
		<view class="tabs flex flex-center">
			<view class="item" :class="{active:mode===1}" @click="switchMode(1)">按日历查询</view>
			<view class="item" :class="{active:mode===2}" @click="switchMode(2)">按笔记本查询</view>
		</view>
		<view class="item-view">
			<view class="item" v-for="(item, index) in mode===1?eventList:notebookList" :key="index">
				<notes-item :item-info="item"></notes-item>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex';
	import homePageApi from '@/api/homePage.js'
	import tagList from '@/components/tag-liist/tag-list.vue'
	import notesItem from '@/components/notes-item.vue'
	export default {
		components: {
			tagList,
			notesItem
		},
		props: {
			type: Boolean,
			default: false
		},
		data() {
			return {
				inputText: '',
				itemList: [],
				mode: 1, //1 按日历查询 2按笔记本查询
			};
		},
		onLoad(options) {

		},
		onShow() {

		},
		computed: {
			...mapState('user', ['$sourcePath']),
			eventList(){
				return this.itemList.filter(item=>item.type!==2)
			},
			notebookList(){
				return this.itemList.filter(item=>item.type===2)
			}
		},
		methods: {
			cancel() {
				this.$emit('cancel')
				this.clear()
			},
			clear() {
				this.inputText = ''
			},
			changeInput(e){
				let key = e.detail.value
				if(key){
					this.search(e.detail.value)
				}
				
			},
			async search(key){
				let res = await homePageApi.globleSearch({key,searchType: this.mode})
				this.itemList = res.data
			},
			switchMode(mode) {
				if (this.mode !== mode) {
					this.mode = mode
				}

			}
		}
	};
</script>
<style lang="scss">
	.search-view {
		width: 100vw;

		.top-view {
			height: 112upx;
			padding: 0 30upx;
			background-color: #FFF;

			.search-bar-view {
				$h: 66upx;
				width: 100%;
				height: $h;
				border-radius: $h;
				background-color: #EEE;

				.icon-search {
					width: 24upx;
					height: 24upx;
					margin-left: 20upx;
					margin-right: 10upx;
				}

				input {
					width: 60%;
				}

				.clear {
					width: 30upx;
					height: 30upx;
					margin-right: 30upx;
				}
			}

			.cancel {
				margin-left: 30upx;
				white-space: nowrap;
				text-align: center;
			}
		}

		.tabs {
			padding: 0 30upx;
			background-color: #fff;

			.item {
				$h: 88upx;
				height: $h;
				line-height: $h;
				padding: 0 30upx;
				border-bottom: 4upx solid transparent;
				font-size: 30upx;
				text-align: center;
				color: #5B5F65;
			}

			.active {
				border-color: $red;
				color: #000;
			}
		}
		.item-view{
			padding: 30upx 30upx 0;
			.item{
				margin-bottom: 30upx;
			}
		}
	}
</style>
