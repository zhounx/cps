<template>
	<view class="zzx-calendar" @touchmove.stop>
		<view class="calendar-heander" v-show="hasWeekMode !== 'noWeek'">
			<!-- {{timeStr}} -->
			<!-- <view v-if="hasWeekMode == 'noWeek'" style="display: flex;">
					<view>{{timeStr.y+"年"+timeStr.m+"月"+timeStr.day+"日"}}</view>
					
				</view> -->
			<view style="display: flex;justify-content: space-between;" class="header-info">
				<view class="month-info">{{timeStr.y}}年{{timeStr.m}}月</view>
				<!-- <view class="year-info">{{timeStr.y}}</view> -->
			</view>
			<view class="back-today" @click="goback" v-if="showBack">
				返回今日
			</view>
		</view>
		<view class="calendar-weeks" style="border-bottom: 1px solid #EEE;">
			<view class="calendar-week" v-for="(week, index) in weeks" :key="index" style="font-size: 28rpx;">
				{{week}}
			</view>
		</view>
		<view class="calendar-content">
			<swiper class="calendar-swiper" :style="{
			   width: '100%',
			   height: sheight
		   }" :indicator-dots="false"
			 :autoplay="false" :duration="duration" :current="current" @change="changeSwp" :circular="true">
				<swiper-item class="calendar-item" v-for="sitem in swiper" :key="sitem">
					<view class="calendar-days">
						<template v-if="sitem === current">
							<view class="calendar-day" v-for="(item,index) in days" :key="index" :class="[!item.show?'day-hidden':'',(item.fullDate > today && hasWeekMode !== 'noWeek')?'disableClass':'ableClass']"
							 @click.stop="clickItem(item)">
								<view class="date" :class="[
									item.isToday ? todayClass : '',
									item.fullDate === selectedDate ? checkedClass : ''
									
									]">
									{{item.isToday?'':item.time.getDate()}}
									<view v-if="item.isToday" class="todayText" :style="{color:item.fullDate === selectedDate ? '#E04E3D':'#000'}">今</view>
									<view class="dot-show" v-if="item.info" :style="dotStyle"></view>
								</view>
								
							</view>
						</template>
						<template v-else>
							<template v-if="current - sitem === 1 || current-sitem ===-2">
								<view class="calendar-day" v-for="(item,index) in predays" :key="index" :class="{
										'day-hidden': !item.show
									}">
									<view class="date" :class="[
											item.isToday ? todayClass : ''
											]">
										{{item.time.getDate()}}
									</view>
								</view>
							</template>
							<template v-else>
								<view class="calendar-day" v-for="(item,index) in nextdays" :key="index" :class="{
										'day-hidden': !item.show
									}">
									<view class="date" :class="[
											item.isToday ? todayClass : ''
											]">
										{{item.time.getDate()}}
									</view>
								</view>
							</template>

						</template>
					</view>
				</swiper-item>
			</swiper>
			<view class="mode-change" @click="changeMode" v-if="hasWeekMode !== 'noWeek'">
				<!-- <view :class="weekMode ? 'mode-arrow-bottom' : 'mode-arrow-top'">
				</view> -->
				<!-- <view class="line"></view> -->
				<view :class="weekMode ? 'btn-bottom' : 'btn-up'"></view>
				<!-- <view class="line"></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		gegerateDates,
		dateEqual,
		formatDate
	} from './generateDates.js';
	import {mapState} from 'vuex'
	export default {
		props: {
			duration: {
				type: Number,
				default: 500
			},
			dotList: {
				type: Array, /// 打点日期列表
				default () {
					return []
				}
			},
			showBack: {
				type: Boolean, // 是否返回今日
				default: false
			},
			todayClass: {
				type: String, // 今日的自定义样式class
				default: 'is-today'
			},
			checkedClass: {
				type: String, // 选中日期的样式class
				default: 'is-checked'
			},
			dotStyle: {
				type: Object, // 打点日期的自定义样式
				default () {
					return {
						background: '#c6c6c6'
					}
				}
			},
			hasWeekMode: String,
			defaultTime: String,
			defaultEndDate: String
		},
		watch: {
			indexPageCurrentDate:function(newvalue,oldvalue){
				let today = formatDate(new Date(), 'yyyy-MM-dd');
				let nDate = this.indexPageCurrentDate.year+'-'+this.indexPageCurrentDate.month+'-'+this.indexPageCurrentDate.day;
				this.initDate(nDate);
				let param = {
					fullDate: nDate,
					isToday: dateEqual(today, nDate)
				}
				this.clickItem(param);
			},
			dotList: function(newvalue,oldvalue) {
				const days = this.days.slice(0);
				newvalue.forEach(item => {
					const index = days.findIndex(ditem => ditem.fullDate === item.date);
					if (index > 0) {
						days[index].info = item
					}
				});
				this.days = days;
				let today = formatDate(new Date(), 'yyyy-MM-dd');
				if(this.dotList.length > 0){
					let param;
					if(newvalue.length !== oldvalue.length){
						if(oldvalue.length > 0 && newvalue.length > oldvalue.length){
							let nDate = this.selectCurrentDate.year+'-'+this.selectCurrentDate.month+'-'+this.selectCurrentDate.day;
							this.initDate(nDate);
							param = {
								fullDate: nDate,
								isToday: dateEqual(today, nDate)
							}
						}else{
							this.initDate(this.dotList[0].date);
							param = {
								fullDate: this.dotList[0].date,
								isToday: dateEqual(today, this.dotList[0].date)
							}
						}
						
					}else{
						let nDate = this.selectCurrentDate.year+'-'+this.selectCurrentDate.month+'-'+this.selectCurrentDate.day;
						this.initDate(nDate);
						param = {
							fullDate: nDate,
							isToday: dateEqual(today, nDate)
						}
					}
					this.clickItem(param);
				}else{
					this.initDate(today);
					let param = {
						fullDate:today,
						isToday: dateEqual(today, today)
					}
					this.clickItem(param);
				}
				
			}
		},
		computed: {
			...mapState('live',['selectCurrentDate','indexPageCurrentDate']),
			sheight() {
				// 根据年月判断有多少行
				// 判断该月有多少天
				let h = '110rpx';
				if (!this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth, 0);
					const days = d.getDate(); // 判断本月有多少天
					let day = new Date(d.setDate(1)).getDay();
					if (day === 0) {
						day = 7;
					}
					const pre = 8 - day;
					const rows = Math.ceil((days - pre) / 7) + 1;
					h = 110 * rows + 'rpx'
				}
				return h
			},
			timeStr() {
				let str = '';
				// console.log(this.currentMonth - 1, this.currentDate)
				const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate);
				let date = new Date();
				// if(date > d){
				// 	this.selectedDate = formatDate(d, 'yyyy-MM-dd')
				// }
				const y = d.getFullYear();
				const m = (d.getMonth() + 1) <= 9 ? `0${d.getMonth()+1}` : d.getMonth() + 1;
				const day = d.getDate() <= 9 ? `0${d.getDate()}` : d.getDate();
				// str = `${y}年${m}月${day}日`;
				// console.log(`${y}年${m}月${day}日`)
				return ({
					y: y,
					m: m,
					day: day
				});
			},
			predays() {
				let pres = [];
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate)
					d.setDate(d.getDate() - 7);
					pres = gegerateDates(d, 'week')
				} else {
					const d = new Date(this.currentYear, this.currentMonth - 2, 1);
					pres = gegerateDates(d, 'month')
				}
				return pres;
			},
			nextdays() {
				let nexts = [];
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate)
					d.setDate(d.getDate() + 7);
					nexts = gegerateDates(d, 'week')
				} else {
					const d = new Date(this.currentYear, this.currentMonth, 1);
					nexts = gegerateDates(d, 'month')
				}
				return nexts;
			}
		},
		data() {
			return {
				weeks: ['一', '二', '三', '四', '五', '六', '日'],
				current: 1,
				currentYear: '',
				currentMonth: '',
				currentDate: '',
				days: [],
				weekMode: this.hasWeekMode == "noWeek" ? false : true,
				swiper: [0, 1, 2],
				// dotList: [], // 打点的日期列表
				selectedDate: formatDate(new Date(), 'yyyy-MM-dd'),
				today: formatDate(new Date(), 'yyyy-MM-dd'),
				time: this.defaultTime
			};
		},
		methods: {
			changeSwp(e) {
				// console.log(e);
				const pre = this.current;
				const current = e.target.current;
				/* 根据前一个减去目前的值我们可以判断是下一个月/周还是上一个月/周 
				 *current - pre === 1, -2时是下一个月/周
				 *current -pre === -1, 2时是上一个月或者上一周
				 */
				this.current = current;
				if (current - pre === 1 || current - pre === -2) {
					this.daysNext();
				} else {
					this.daysPre();
				}
			},
			// 初始化日历的方法
			initDate(cur,type) {
				let date = ''
				if (cur) {
					// console.log(4444, cur, typeof cur)
					// console.log(cur.replace(/-/g,'/'))
					if(typeof cur === 'string'){
						date = date = new Date(cur.replace(/-/g,'/'))
					}else{
						date = new Date(cur)
					}
					
				} else {
					date = new Date()
				}
				
				// console.log('initDate', date, cur, typeof cur)
				this.currentDate = date.getDate() // 今日日期 几号
				this.currentYear = date.getFullYear() // 当前年份
				this.currentMonth = date.getMonth() + 1 // 当前月份
				this.currentWeek = date.getDay() === 0 ? 7 : date.getDay() // 1...6,0   // 星期几
				const nowY = new Date().getFullYear() // 当前年份
				const nowM = new Date().getMonth() + 1
				const nowD = new Date().getDate() // 今日日期 几号
				const nowW = new Date().getDay();
				
				if (!this.defaultEndDate) {
					// this.selectedDate = formatDate(date, 'yyyy-MM-dd');
				}else{
					if(!type){
						this.selectedDate = formatDate(new Date(cur), 'yyyy-MM-dd');
					}
				}
				
				this.days = [];
				let days = [];
				if (this.weekMode) {
					days = gegerateDates(date, 'week');
					// this.selectedDate = days[0].fullDate;
				} else {
					days = gegerateDates(date, 'month');
					// const sel = new Date(this.selectedDate.replace('-', '/').replace('-', '/'));
					// const isMonth = sel.getFullYear() === this.currentYear && (sel.getMonth() + 1) === this.currentMonth;
					// if(!isMonth) {
					// 	this.selectedDate = formatDate(new Date(this.currentYear, this.currentMonth-1,1), 'yyyy-MM-dd')
					// }
				}
				days.forEach(day => {
					const dot = this.dotList.find(item => {
						return dateEqual(item.date, day.fullDate);
					})
					if (dot) {
						day.info = dot;
					}
				})
				this.days = days;
				//  派发事件,时间发生改变
				let obj = {
					start: '',
					end: ''
				};
				// console.log(88888888888, days)
				if(!days.length){
					return
				}
				if (this.weekMode) {
					obj.start = this.days[0].time;
					obj.end = this.days[6].time
				} else {
					const start = new Date(this.currentYear, this.currentMonth - 1, 1);
					const end = new Date(this.currentYear, this.currentMonth, 0);
					obj.start = start;
					obj.end = end;
				}
				this.$emit('days-change', obj)
			},
			//  上一个
			daysPre() {
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate);
					d.setDate(d.getDate() - 7);
					this.initDate(d);
				} else {
					const d = new Date(this.currentYear, this.currentMonth - 2, 1);
					this.initDate(d,'pre');
					if(this.hasWeekMode =="noWeek"){
						this.$emit("resetDate");
					}
				}
			},
			//  下一个
			daysNext() {
				if (this.weekMode) {
					const d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate);
					d.setDate(d.getDate() + 7);
					this.initDate(d);
				} else {
					const d = new Date(this.currentYear, this.currentMonth, 1);
					this.initDate(d,'next');
					if(this.hasWeekMode =="noWeek"){
						this.$emit("resetDate");
					}
				}
			},
			changeMode() {
				const premode = this.weekMode;
				let isweek = false;
				if (premode) {
					isweek = !!this.days.find(item => item.fullDate === this.selectedDate)
				}
				this.weekMode = !this.weekMode;
				let d = new Date(this.currentYear, this.currentMonth - 1, this.currentDate)
				const sel = new Date(this.selectedDate.replace('-', '/').replace('-', '/'));
				const isMonth = sel.getFullYear() === this.currentYear && (sel.getMonth() + 1) === this.currentMonth;
				if ((this.selectedDate && isMonth) || isweek) {
					d = new Date(this.selectedDate.replace('-', '/').replace('-', '/'))
				}
				this.initDate(d)
			},
			// 点击日期
			clickItem(e) {
				this.currentMonth = new Date(e.fullDate.replace(/-/g, '/')).getMonth()+1;
				// console.log('clickItem', this.currentMonth)
				let date = new Date();
				// console.log(date, new Date(e.fullDate))
				// console.log(+date, +new Date(e.fullDate))
				let dateStr = this.$util.safariDate(e.fullDate.replace(/-/g, '/')) + ' 00:00:00'
				// if (date < new Date(dateStr.replace(/-/g, '/')) && this.hasWeekMode !== 'noWeek') {
				// 	return;
				// } else {
					this.selectedDate = e.fullDate.replace(' 00:00:00', '');
					const curDate = new Date(e.fullDate.replace(/-/g, '/'))
					this.currentDate = curDate.getDate();
					let year = curDate.getFullYear() + ''
					let month = curDate.getMonth() + 1
					let day = curDate.getDate()
					if(month<10){
						month = '0' + month
					}else{
						month = '' + month
					}
					if(day<10){
						day = '0' + day
					}else{
						day = '' + day
					}
					// console.log(1111111111111, year, month, day)
					this.$emit('selected-change', {year,month,day});
				// }
			},
			goback() {
				const d = new Date();
				this.initDate(d);
			},
			bindTimeChange(e) {
				this.time = e.target.value
			}
		},
		created() {

		},
		mounted() {
			if (this.dotList.length == 0) {
				if (this.defaultEndDate) {
					this.selectedDate = formatDate(new Date(this.defaultEndDate), 'yyyy-MM-dd');
					this.initDate(this.defaultEndDate);
				} else {
					this.initDate();
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.zzx-calendar {
		width: 100%;
		height: auto;
		.calendar-heander {
			text-align: center;
			height: 60upx;
			line-height: 60upx;
			position: relative;
			font-size: 30upx;

			.back-today {
				position: absolute;
				right: 0;
				width: 100upx;
				height: 30upx;
				line-height: 30upx;
				font-size: 20upx;
				top: 15upx;
				border-radius: 15upx 0 0 15upx;
				color: #ffffff;
				background-color: #FF6633;
			}
		}

		.calendar-weeks {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			height: 60upx;
			margin-bottom: 1px solid #EEE;
			line-height: 60upx;
			justify-content: center;
			align-items: center;
			font-size: 28upx;

			.calendar-week {
				width: calc(100% / 7);
				height: 100%;
				text-align: center;
			}
		}

		swiper {
			width: 100%;
			height: 60upx;
		}

		.calendar-content {
			min-height: 60upx;
		}

		.calendar-swiper {
			min-height: 70upx;
			transition: height ease-out 0.3s;
		}

		.calendar-item {
			margin: 0;
			padding: 0;
			height: 100%;
		}

		.calendar-days {
			display: flex;
			flex-flow: row wrap;
			width: 100%;
			height: 100%;
			overflow: hidden;
			font-size: 28upx;

			.calendar-day {
				width: calc(100% / 7);
				height: 110upx;
				text-align: center;
				display: flex;
				flex-flow: column nowrap;
				justify-content: flex-start;
				align-items: center;
			}

			.todayText {
				position: absolute;
				top: 0;
				margin: auto;
				left: 0;
				right: 0;
				font-size: 34rpx;

			}
		}

		.day-hidden {
			visibility: hidden;
		}

		.mode-change {
			display: flex;
			justify-content: center;
			margin-top: 10upx;

			.mode-arrow-top {
				width: 0;
				height: 0;
				border-left: 12upx solid transparent;
				border-right: 12upx solid transparent;
				border-bottom: 10upx solid #FF6633;
			}

			.mode-arrow-bottom {
				width: 0;
				height: 0;
				border-left: 12upx solid transparent;
				border-right: 12upx solid transparent;
				border-top: 10upx solid #FF6633;
			}
			.btn-bottom{
				width:40rpx;
				height:14rpx;
				background-repeat: no-repeat;
				background-image: url(/static/btn_daily_up.png);
				background-size: cover;
				background-position: center;
				margin:0 30rpx;
			}
			.btn-up{
				width:40rpx;
				height:14rpx;
				background-repeat: no-repeat;
				background-image: url(/static/btn_daily_down.png);
				background-size: 100%;
				margin:0 30rpx;
			}
			.line{
				flex:1;
				border-top:1px solid #EEEEEE;
			}
		}

		.is-today {
			background: #ffffff;
			// border: 1upx solid #FF6633;
			border-radius: 50%;
			// color: #FF6633;
			color: #E04E3D;
		}

		.is-checked {
			background: #FE4839;
			color: #ffffff;
		}

		.date {
			width: 80upx;
			height: 80upx;
			line-height: 80upx;
			margin: 0 auto;
			border-radius: 80upx;
			position: relative;
			font-size: 30upx;
		}

		.dot-show {
			// margin-top: 4upx;
			position: absolute;
			left: 50%;
			bottom: 5upx;
			transform: translateX(-50%);
			width: 10upx;
			height: 10upx;
			background: #c6c6c6;
			border-radius: 18upx;
		}

		.disableClass {
			// color: #CCCCCC;
			color: #000000;
		}

		.ableClass {
			color: #000000;
		}
	}

	.zzx-calendar {
		background-color: #fff;
	}

	.calendar-weeks {
		color: #888888 !important;
		font-size: 22upx !important;
		margin-bottom: 1px solid #EEE;
	}

	.calendar-day {
		color: #CCCCCC;
		font-size: 26upx !important;
		font-weight: 600;
	}

	.zzx-calendar .is-checked {
		background: #FFF6F6 !important;
		color: #E04E3D;
	}

	.zzx-calendar .mode-change {
		margin-top: 0px !important;
		height: 40upx;
		align-items: center;
	}

	.zzx-calendar .mode-change .mode-arrow-top {
		border-bottom: 5px solid #4D9BE8 !important;
	}

	.zzx-calendar .mode-change .mode-arrow-bottom {
		border-top: 5px solid #4D9BE8 !important;
	}

	.dot-show {
		background-color: $base-color !important;
		border-radius: 50% !important;
	}

	.zzx-calendar .calendar-days .calendar-day {
		// height:82upx!important;
		justify-content: center !important;
	}

	.zzx-calendar .calendar-swiper {
		// min-height:82upx!important;
	}

	.zzx-calendar .mode-change .mode-arrow-bottom {
		border-top: 5px solid #878787 !important;
	}
	
	.header-info{
		display: flex;
		align-items: center;
		.month-info{
			color:#000000;
			font-size: 34rpx;
			font-weight: bold;
			margin:0 30rpx;
		}
		.year-info{
			color:#888888;
			font-size: 24rpx;
			font-weight: bold;
			margin:0 30rpx;
		}
	}
</style>
