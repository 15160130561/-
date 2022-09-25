import {
	createStore
} from "vuex";

const store = createStore({
	state() {
		return {
			topIdList: [],
			nextId: ''
		}
	},
	//提交状态（数据）改变的方法
	mutations: {
		INIT_CHANGE(state, payload) {
			state.topIdList = payload;
		},
		NEXT_ID(state, payload) {
			for (var i = 0; i < state.topIdList.length; i++) {
				if (state.topIdList[i].id == payload) {
					state.nextId = state.topIdList[i + 1].id;
				}
			}
		}
	},
	actions: {

	},
	//计算属性
	getters: {

	},
	//数据模块
	modules: {

	}
})


export default store
