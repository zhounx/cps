import util from '@/common/util.js'
const ajax = util.ajax
export default {
	// 查询我的笔记本列表
	queryNotebookList (data) {
		let param = {
			url:"/sp/notebook/queryMyNotebookList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 查询小程序关联的系统笔记本列表
	queryAppNotebookList (data) {
		let param = {
			url:"/sp/notebook/queryAppNotebookList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 查询我的标签列表
	queryTagList (data) {
		let param = {
			url:"/sp/tags/queryTagList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 创建标签
	addTag (data) {
		let param = {
			url:"/sp/tags/addTag",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 删除标签
	delTag (data) {
		let param = {
			url:"/sp/tags/delTag",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	//给事件添加标签
	updateTag (data) {
		let param = {
			url:"/sp/event/updateTags",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 添加到我的笔记本
	addNotebook (data) {
		let param = {
			url:"/sp/notebook/addNotebook",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 查询笔记本页码详情
	queryNotebookPageInfo (data) {
		let param = {
			url:"/sp/notebook/queryNotebookPageInfo",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 全局搜索
	globleSearch (data) {
		let param = {
			url:"/sp/search/globSearch",
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
	// 删除记事
	delEvent (data) {
		let param = {
			url:"/sp/event/delEvent",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 查询有记事的日期
	queryDateList (data) {
		let param = {
			url:"/sp/event/queryDateList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	// 查询记事列表
	queryEventList (data) {
		let param = {
			url:"/sp/event/queryEventList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
}