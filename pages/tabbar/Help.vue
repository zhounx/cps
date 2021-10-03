<template>
	<view class="container help-container">
		<view class="block">
			<view class="question">这是个什么工具？什么是CPS？</view>
			<view class="answer">冠军高效系统（champion productive system），可以在喜马拉雅音频课找到资源，由<text class="mark">尹志豪</text>老师讲课。
			这门课旨在提高我们的竞争力，让我们在短时间产出高质量的成果，<text class="mark">高效=高效率+高效能</text>，强烈推荐听课。
			音频课程中高效工具是最简便的记事本，对于懒得写字或者不方便随身携带记事本的人群比较不方便，故而我做了这个工具自用，也是鞭策自己努力
			</view>
			<view class="answer">由于是自用，故而全是用本地缓存数据，无法在两台设备通用，清理微信后数据也会消失</view>
		</view>
		
		<view class="block">
			<view class="question">CPS基本原理是什么？包括什么步骤？</view>
			<view class="answer">
				基本原理：把手上大大小小的事情<text class="mark"></text>分批次</text>，再加上效率最高的逻辑判断处理。
			</view>
			<view class="answer">
				CPS分为5个步骤:
			</view>
			<view class="answer">
				<view class="bg-white padding  margin-top-xs">
					<view class="cu-steps steps-arrow">
						<view class="cu-item text-blue" v-for="(item,index) in basicsList" :key="index">
							<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="answer">
				1.收集，只专注于让你注意的事项放在收集中心;<br>
				2.处理，只专注于清空收集中心，批次处理为可执行的下一步行动任务;<br>
				3.安排，只专注于把行动任务安排到适当的日程上准备执行;<br>
				4.执行，只专注于确保完成日程安排的所有行动任务;<br>
				5.规划，只专注于每周所有事项检讨，下一周的计划，确保人生方向正确。<br>
			</view>
		</view>
		<view class="block">
			<view class="question">收集的步骤和要点是什么？</view>
			<view class="answer">
				1.要将所有未竟事项和吸引注意力的事项100%纪录到收集中心;<br>
				2.将想法也100%记录到收集中心;<br>
				3.当收集时，只专注于记录到收集中心，千万不能一边收集一边处理;<br>
				4.工具全天候待命;<br>
				5.每天必须用第二个阶段处理清空收集中心;<br>
			</view>
		</view>
		<view class="block">
			<view class="question">处理的步骤和要点是什么？</view>
			<view class="answer">
				1.把收集区很多条收集事项或创意中，拿出第一条，判断它是什么;<br>
				2.如果是个垃圾，立刻删除掉;<br>
				3.如果是个参考信息，不需要采取任何行动，可以做个参考的标记;<br>
				4.如果也不是个参考信息，而是个现在不需要做决定的事情或想法，就归到以后决定区;<br>
				5.如果不属于上面任何一种，而是一个要采取的行动，先判断是多个行动组成的项目还是单一行动;<br>
				6.如果是项目，则拆解它，并拿拆解的第一个行动拿来思考，看它是不是能够在两分钟内完成，如果可以立刻完成（两分钟原则）;<br>
				7.如果两分钟无法完成，看看是否要在七天内完成，如果不用，也归到以后决定区;<br>
				8.如果要在七天内完成，看看能不能把他再拆解成更小的单一小行动，然后把这个行动做好规划（定好优先序号，如有必要还记下执行的日期，时间地点）;<br>
				9.把下面第二第三往后的行动，依次做这样的规划拆解，最终成为一连串的下一行动，再把这些行动安排到日程表;<br>
			</view>
			
			<view class="question">以后行动区有什么用？</view>
			<view class="answer">
				1.以后要做的事情一定要写下来，防止忘记，也可以防止老是觉得有什么重要的事忘记了，减轻莫名的心理负担;<br>
				2.以后决定区记录事项包括：时机还没有成熟的，以后可能会考虑的，或是七天以后可能会做的;<br>
				3.以后决定区需要每天清理一遍，方式三选一：1. 过时的，没用的就删除掉；2.拆解成下一行动，并安排时间，优先序；3.判断，如果是七天以后的事情，就继续留着;<br>
			</view>
		</view>
		<view class="block">
			<view class="question">安排的步骤和要点是什么？</view>
			<view class="answer">
				优先级分为ABCD类，分别为：重要而紧急，重要不紧急，紧急不重要，不紧急且不重要，这个工具暂时还没做优先级功能。
			</view>
			<view class="answer">
				1.把处理写好的行动中，把当天需要去做的，要达成的行动都挑出来，写上当天的日期（需要执行的那一天）;<br>
				2.把挑选出来的，把最重要的先挑出来（根据行动序号，先把A类拿出来），不要超过五个，在前面做个记号代表最重要;<br>
				3.把这几个行动安排在精力状态最好的时间段，在行动后面记上时间，这个时间应该在之前写好的高效工作时间段之内;<br>
				4.把B类放在一大段一大段时间安排，不要细致，比如16：00-18：00 和XXX沟通，处理一个小BUG，改一个样式等等，不太需要记录;<br>
				5.C类事项，碎片时间段挑选一些来做，甚至做没做完的B类，没做完也无所谓;<br>
				6.D类不是闲的蛋疼就不用做了;<br>
				灵活：尽量在同一个场合能办的一起办了
			</view>
		</view>
		<view class="block">
			<view class="question">执行的步骤和要点是什么？</view>
			<view class="answer">
				1.快速接连执行第一种种类，完成一定要在下一行动区上划掉;<br>
				2.第二种，依照处理和安排步骤，拆解，标注，比对现有重要事项重要性，衡量评估，抉择取舍。我们的工作是斗智，不要马上去做;<br>
				3.突发情况，先比较优先序高低，良好沟通后再做决定。沟通过程就是把自己比较优先序高低的理由解释给上司/客户;<br>
			</view>
		</view>
		<view class="block">
			<view class="question">规划的步骤和要点是什么？</view>
			<view class="answer">
				1.准备一个享受仪式，周末抽出一小时，不容易被打扰的时间段，避免家人打扰，预先沟通;<br>
				2.氛围很重要，轻音乐，喜欢的食物，好写的笔，独处的享受时间;<br>
				3.上周复盘:记事本上或专门规划本子，写上:每周规划;<br>
				4.符合我事业目标的事情有哪些，我可以如何改善，写几分钟，可翻看下一行动区;<br>
				5.上周产出符合事业人生目标的是什么，如何改善;<br>
				6.下周期望的三到五个产出目标，最好先想一下事业和人生目标;<br>
				7.检查下周即将到来的事项或预约的事，预先准备;<br>
				8.清理记事本以后决定区，创意收集区，下一行动区，没用的删掉，卡顿的就拆解;<br>
			</view>
		</view>
		<view class="block">
			<view class="question">使用CPS有什么好处？</view>
			<view class="answer">
				1.掌控，所有吸引注意力的事情都收集好了，心无挂碍;<br>
				2.明确下一步，所有下一步事项都在眼前呈现;<br>
				3.容易决定优先序，容易把注意力集中在20%重要事情，带给80%回报;<br>
				4.批次处理，效率最高;<br>
				5.放松;<br>
				6.提高工作质量，头脑负担小了，工作更专注;<br>
				7.有更多时间做其他事情。
			</view>
		</view>
		
	</view>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			basicsList: [{
				cuIcon: 'writefill',
				name: '收集'
			}, {
				cuIcon: 'radioboxfill',
				name: '处理'
			}, {
				cuIcon: 'activityfill',
				name: '安排'
			}, {
				cuIcon: 'repairfill',
				name: '执行'
			}, {
				cuIcon: 'explorefill',
				name: '规划'
			},]
		};
	},
	onLoad(options) {
		let flag = uni.getStorageSync('newUser')
		if(!flag){
			uni.setStorageSync('newUser', '1')
		}
	},
	onShow(){
		
	},
	computed: {
		
	},
	methods: {
		
	}
};
</script>
<style lang="scss">
.help-container {
	height: 100vh;
	padding: 30upx 0;
	background-color: $bg-color-base;
	.block{
		width: 690upx;
		padding: 30upx;
		margin-bottom: 30upx;
		border-radius: 18upx;
		background-color: #FFF;
		box-shadow: 5upx 1upx 10upx 1upx #eee;
		.question{
			margin-bottom: 20upx;
			font-size: 32upx;
			font-weight: bold;
		}
		.answer{
			margin-bottom: 20upx;
			font-size: 28upx;
			color: #666;
			line-height: 1.5;
			&:last-of-type{
				margin: 0;
			}
			.mark{
				font-weight: bold;
				color: red;
			}
		}
	}
}
</style>
