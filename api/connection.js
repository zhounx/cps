import util from '@/common/util.js'
const ajax = util.ajax
export default {
	// 检查智能笔是否被绑定
	checkBind (data) {
		let param = {
			url:"/sp/pen/checkBind",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	//查询绑定的智能笔列表
	queryPenList (data) {
		let param = {
			url:"/sp/pen/queryPenList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	//绑定智能笔
	bindPen (data) {
		let param = {
			url:"/sp/pen/bind",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	//查询笔记本列表
	queryMyNotebookList (data) {
		let param = {
			url:"/sp/notebook/queryMyNotebookList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
}