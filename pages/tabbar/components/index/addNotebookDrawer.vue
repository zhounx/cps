<!-- 下方弹出抽屉组件（官方的抽屉组件兼容性不好） -->
<template>
	<drawer ref="drawer" @cancel="cancelCb">
		<view class="tips">{{step===1?'请选择您的笔记本':'请输入笔记本名称'}}</view>
		<view v-show="step===1" class="choose-view">
			<view class="choose-list flex flex-center">
				<view v-for="(item,index) in appNotebookList" :key="index" class="item-view flex flex-center flex-col">
					<view  class="item flex flex-center justify-center" @click="switchTypeIndex(index)">
						<image :src="index===typeIndex?`${$sourcePath}/btn_chose_red.png`:''" class="icon"></image>
						<image :src="filePath+'/storage/commonDownload?fileId='+item.coverId" class="cover-image" mode="aspectFit"></image>
					</view>
					<text class="text">{{item.systemNotebookName}}</text>
				</view>
				
			</view>
		</view>
		<view v-show="step===2" class="rename-view">
			<view class="input-view flex flex-center">
				<input type="text" v-model="bookName" maxlength="24">
			</view>
		</view>
		<view class="btns flex flex-center justify-center">
			<view class="cancel" @click="handelCancel">{{step===1?'取消':'上一步'}}</view>
			<view class="confirm" @click="handleSure">{{step===1?'下一步':'确定'}}</view>
		</view>
	</drawer>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import config from '@/common/config.js'
	import homePageApi from '@/api/homePage.js'
	export default {
		props:{
			appNotebookList: Array
		},
		computed: {
			...mapState('user', ['userInfo', '$sourcePath']),
		},
		data() {
			return {
				step: 1,
				typeIndex: 0,
				bookName: '',
				filePath:config.filePath,
			};
		},
		methods: {
			...mapActions('user', ['login']),
			...mapActions('live', ['initWebSocket']),
			openModal() {
				this.$refs.drawer.openModal();
			},

			closeModal() {
				this.$refs.drawer.closeModal();
			},
			switchStep(step) {
				this.step = step
			},
			handelCancel() {
				if (this.step === 1) {
					this.closeModal()
				} else {
					this.switchStep(1)
				}
			},
			handleSure() {
				if (this.step === 1) {
					this.switchStep(2)
					this.bookName = this.appNotebookList[this.typeIndex].systemNotebookName
				} else {
					if(!this.bookName){
						uni.showToast({
							icon: 'none',
							title: '请输入笔记本名称'
						})
						return
					}
					this.addNotebook({
						notebookId: this.appNotebookList[this.typeIndex].systemNotebookId,
						remark: this.bookName
					})
					
				}
			},
			async addNotebook(params){
				await homePageApi.addNotebook(params)
				uni.showToast({
					title: '添加笔记本成功'
				})
				this.$emit('refresh')
				this.closeModal()
			},
			switchTypeIndex(index) {
				this.typeIndex = index
			},
			cancelCb() {
				this.step = 1
				this.typeIndex = 0
				this.bookName = ''
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tips {
		margin-bottom: 50upx;
		font-weight: bold;
		font-size: 36upx;
	}

	.choose-view {
		.choose-list {
			padding: 30upx 0;
			overflow: auto;
			.item-view{
				margin-right: 60upx;
			}
			.item {
				// flex-shrink: 0;
				position: relative;
				width: 260upx;
				height: 320upx;
				margin-bottom: 20upx;
				border: 2upx solid #EEEEEE;
				border-radius: 10upx;
				.icon {
					position: absolute;
					right: -22upx;
					top: -22upx;
					z-index: 3;
					width: 44upx;
					height: 44upx;
					border-radius: 50%;
					background-color: #fff;
					border: 1px solid #DDD;
					
				}

				.cover-image {
					width: 180upx;
					height: 237upx;
				}
			}
		}
	}

	.rename-view {
		.input-view {
			height: 70upx;
			padding: 0 30upx;
			border: 1px solid #DDD;

			input {
				width: 100%;
			}
		}
	}

	.btns {
		margin-top: 100upx;

		.cancel {
			@include cancel-btn(300upx, 100upx) margin-right: 20upx;
		}

		.confirm {
			@include darker-btn(300upx, 100upx)
		}
	}
</style>
