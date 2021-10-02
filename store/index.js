import Vue from 'vue'
import Vuex from 'vuex'
import util from '@/common/util.js'
Vue.use(Vuex)
let state = {
	collectionList: [],
	actionList: [],
	todoList: [],
	laterList: []
}

let mutations = {
	getList(state, name){
		let listStr = uni.getStorageSync(name)
		state[`${name}List`] = JSON.parse(listStr)
	},
	setList(state, { name, list }){
		console.log('setList')
		state[`${name}List`] = list
		uni.setStorageSync(name, JSON.stringify(list))
	},
	addItem(state, { name, index, item }){
		state[`${name}List`].splice(index, 0, item)
		uni.setStorageSync(name, JSON.stringify(state[`${name}List`]))
	},
	removeItem(state, { name, index }){
		state[`${name}List`].splice(index, 1)
		uni.setStorageSync(name, JSON.stringify(state[`${name}List`]))
	},
	addAction(state, { colIndex, action }){
		state.collectionList[colIndex].actionList.push(action)
		state.collectionList.splice()
		uni.setStorageSync('collection', JSON.stringify(state['collectionList']))
	},
	removeAction(state, { colIndex, actionIndex }){
		state.collectionList[colIndex].actionList.splice(actionIndex, 1)
		uni.setStorageSync('collection', JSON.stringify(state['collectionList']))
	}
}
const store = new Vuex.Store({
	state,
	mutations

})

export default store
