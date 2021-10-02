import util from '@/common/util.js'
const ajax = util.ajax

export default{
	
	// 查询记事详情
	getQueryEventInfoStore (data) {
		let param = {
			url:"/sp/event/queryEventInfo",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 删除记事
	delEventStore (data) {
		let param = {
			url:"/sp/event/delEvent",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 添加收藏
	addCollectStore (data) {
		let param = {
			url:"/sp/collect/addCollect",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 取消收藏
	delCollectStore (data) {
		let param = {
			url:"/sp/collect/delCollect",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 修改记事标题
	updateTitleStore (data) {
		let param = {
			url:"/sp/event/updateTitle",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 修改记事日期
	changeDateStore (data) {
		let param = {
			url:"/sp/event/updateDate",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 笔记页转文本
	pageChangeTxtStore (data) {
		let param = {
			url:"/sp/event/pageTransformText",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 笔记本页转文本
	pageNoteBookChangeTxtStore (data) {
		let param = {
			url:"/sp/notebook/pageTransformText",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 修改记事页文本内容
	updatePageTextStore (data) {
		let param = {
			url:"/sp/event/updatePageText",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 修改笔记本页文本内容
	updateNotePageTextStore (data) {
		let param = {
			url:"/sp/notebook/updatePageText",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 修改记事页文本内容
	editPictureStore (data) {
		let param = {
			url:"/sp/event/updateEventImgs",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 创建分享
	addShareStore (data) {
		let param = {
			url:"/sp/share/addShare",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 添加到我收到的分享
	addReceiveShareStore (data) {
		let param = {
			url:"/sp/share/addReceiveShare",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 查询笔记本有数据的页码列表
	getQueryNotebookPageListStore (data) {
		let param = {
			url:"/sp/notebook/queryNotebookPageList",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 查询笔记本页码详情
	getQueryNotebookPageInfoStore (data) {
		let param = {
			url:"/sp/notebook/queryNotebookPageInfo",
			method:"POST",
			data:data
		}
		return ajax(param);
	},
	
	// 创建word分享
	getWordUrlStore (data) {
		let param = {
			url:"/sp/share/createWordShare",
			method:"POST",
			data:data
		}
		return ajax(param);
	}
}