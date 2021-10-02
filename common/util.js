/**
 * @description 常用工具集合
 */
import store from '@/store'

export default {
	deepClone(source) {
		if (!source && typeof source !== 'object') {
			throw new Error('error arguments', 'deepClone');
		}
		const targetObj = source.constructor === Array ? [] : {};
		Object.keys(source).forEach(keys => {
			if (source[keys] && typeof source[keys] === 'object') {
				targetObj[keys] = deepClone(source[keys]);
			} else {
				targetObj[keys] = source[keys];
			}
		});
		return targetObj;
	},
	random(min, max){
		if (min > max) {
			min = [max, max = min][0];
		}
		const range = max - min;
		return (min + Math.round(Math.random() * range));
	},
	arrSum(arr) {
		return arr.reduce((x, y) => x + y)
	},

	// 公共导航
	navTo(url, params = {}, type = 'navigateTo') {
		let keys = Object.keys(params)
		if (keys.length) {
			keys.forEach((key, index) => {
				let value = params[key]
				// 参数语法
				let firstChar = index === 0 ? '?' : '&'
				url += `${firstChar}${key}=${value}`
			})
		}
		uni[type]({
			url
		})
	},

	isJSON(str) {
		if (typeof str == 'string') {
			try {
				var obj = JSON.parse(str);
				if (typeof obj == 'object' && obj) {
					return true;
				} else {
					return false;
				}

			} catch (e) {
				console.log('error：' + str + '!!!' + e);
				return false;
			}
		}
		console.log('It is not a string!')
	},
	safariDate(dateStr) {
		return dateStr.replace(/-/g, '/')
	},
	dateFormat(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
		if (!date) {
			return ''
		}
		if (typeof date === 'string') {
			date = new Date(date.replace(/-/g, '/'))
		}
		if (typeof date === 'number') {
			date = new Date(date)
		}
		var o = {
			'M+': date.getMonth() + 1,
			'D+': date.getDate(),
			'h+': date.getHours() % 24 === 0 ? 24 : date.getHours() % 24,
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		}
		var week = {
			'0': '\u65e5',
			'1': '\u4e00',
			'2': '\u4e8c',
			'3': '\u4e09',
			'4': '\u56db',
			'5': '\u4e94',
			'6': '\u516d'
		}
		if (/(Y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') :
				'') + week[date.getDay() + ''])
		}
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k])
					.length)))
			}
		}
		console.log(fmt)
		return fmt
	},
	getElSize(selector) { //得到元素的size
		return new Promise((res, rej) => {
			uni.createSelectorQuery().select(selector).fields({
				size: true,
				scrollOffset: true
			}, data => {
				// console.log(11111, selector, data)
				res(data);
			}).exec();
		});
	}
}
