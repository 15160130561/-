"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/list/list.js";
  "./pages/detail/detail.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Desktop/\u5C0F\u7A0B\u5E8F\u7F51\u6613\u4E91\u97F3\u4E50/music/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App).use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
