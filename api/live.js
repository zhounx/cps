import util from '@/common/util.js'
const ajax = util.ajax

export default {
	// 笔记页转文本
	pageTransformText (data) {
		let param = {
			url:"/sp/event/pageTransformText",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 创建记事
	addEvent (data) {
		let param = {
			url:"/sp/event/addEvent",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 查询未完成的记事
	queryUnfinishedEvent (data) {
		let param = {
			url:"/sp/event/queryUnfinishedEvent",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 查询记事详情
	queryEventInfo (data) {
		let param = {
			url:"/sp/event/queryEventInfo",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 保存记事
	saveEvent (data) {
		let param = {
			url:"/sp/event/saveEvent",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 删除记事
	delEvent (data) {
		let param = {
			url:"/sp/event/delEvent",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 修改记事标题
	updateTitle (data) {
		let param = {
			url:"/sp/event/updateTitle",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 修改记事日期
	updateDate (data) {
		let param = {
			url:"/sp/event/updateDate",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 修改记事页文本内容
	updatePageText (data) {
		let param = {
			url:"/sp/event/updatePageText",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 修改记事图片
	updateEventImgs (data) {
		let param = {
			url:"/sp/event/updateEventImgs",
			method:"POST",
			data:data
		}
		return ajax(param);
	}
}