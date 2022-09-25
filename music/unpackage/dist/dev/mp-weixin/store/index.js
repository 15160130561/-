"use strict";
var common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state() {
    return {
      topIdList: [],
      nextId: ""
    };
  },
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
  actions: {},
  getters: {},
  modules: {}
});
exports.store = store;
