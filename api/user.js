import util from '@/common/util.js'
const ajax = util.ajax

/*查询绑定的智能笔列表*/
const queryPenList = (data) => {
	let param = {
		url: "/sp/pen/queryPenList",
		method:"POST"
	}
	return ajax(param);
}

/*解除绑定智能笔*/
const unbind = (data) => {
	let param = {
		url: "/sp/pen/unbind",
		method:"POST",
		data
	}
	return ajax(param);
}

/*查询收藏列表*/
const queryCollectList = (data) => {
	let param = {
		url: "/sp/collect/queryCollectList",
		method:"POST",
		data
	}
	return ajax(param);
}

/*取消收藏*/
const delCollect = (data) => {
	let param = {
		url: "/sp/collect/delCollect",
		method:"POST",
		data
	}
	return ajax(param);
}

/*查询收到的分享列表*/
const queryReceiveList = (data) => {
	let param = {
		url: "/sp/share/queryReceiveList",
		method:"POST",
		data
	}
	return ajax(param);
}

/*删除分享*/
const delReceiveShare = (data) => {
	let param = {
		url: "/sp/share/delReceiveShare",
		method:"POST",
		data
	}
	return ajax(param);
}


export {
	queryPenList,
	unbind,
	queryCollectList,
	delCollect,
	queryReceiveList,
	delReceiveShare
}