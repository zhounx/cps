import util from '@/common/util.js'
const ajax = util.ajax
const ajaxLogin = util.ajaxLogin

export default {
	loginReq(data){
		let param = {
			url:"/sp/auth/login",
			method:"POST",
			data
		}
		return ajaxLogin(param);
	},
	logoutReq(data){
		let param = {
			url:"/sp/auth/loginOut",
			method:"POST",
			data
		}
		return ajax(param);
	},
	refreshToken(data){
		let param = {
			url:"/sp/auth/refreshToken",
			method:"POST",
			data
		}
		return ajax(param);
	},
	queryUserInfo(data){
		let param = {
			url:"/sp/user/queryUserInfo",
			method:"POST"
		}
		return ajax(param);
	}
}