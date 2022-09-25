"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../iconfont.js");
var common_api = require("../../common/api.js");
require("../../common/config.js");
const musichead = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  data() {
    return {
      topList: []
    };
  },
  onLoad() {
    common_api.topList().then((res) => {
      if (res.length) {
        this.topList = res;
      }
    });
  },
  components: {
    musichead
  },
  methods: {
    handleToList(id) {
      common_vendor.index.navigateTo({
        url: "/pages/list/list?listId=" + id
      });
    },
    handleSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_musichead2 = common_vendor.resolveComponent("musichead");
  _easycom_musichead2();
}
const _easycom_musichead = () => "../../components/musichead/musichead.js";
if (!Math) {
  _easycom_musichead();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "\u7F51\u6613\u4E91\u97F3\u4E50",
      icon: false
    }),
    b: common_vendor.o(($event) => $options.handleSearch()),
    c: common_vendor.f($data.topList, (item, index, i0) => {
      return {
        a: item.coverImgUrl,
        b: common_vendor.t(item.updateFrequency),
        c: common_vendor.f(item.tracks, (items, indexs, i1) => {
          return {
            a: common_vendor.t(indexs + 1),
            b: common_vendor.t(items.first),
            c: common_vendor.t(items.second)
          };
        }),
        d: index,
        e: index,
        f: common_vendor.o(($event) => $options.handleToList(item.id))
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57280228"], ["__file", "C:/Users/Administrator/Desktop/\u5C0F\u7A0B\u5E8F\u7F51\u6613\u4E91\u97F3\u4E50/music/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
