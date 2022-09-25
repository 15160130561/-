"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../iconfont.js");
var common_api = require("../../common/api.js");
require("../../common/config.js");
const musichead = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  data() {
    return {
      playList: {
        coverImgUrl: "",
        trackCount: "",
        creator: ""
      },
      isLoading: true
    };
  },
  methods: {
    formatCount(value) {
      if (value >= 1e4 && value < 1e8) {
        value /= 1e4;
        return value.toFixed(1) + "\u4E07";
      } else if (value >= 1e8) {
        value /= 1e8;
        return value.toFixed(1) + "\u4EBF";
      } else {
        return value;
      }
    },
    handleToDetail(songId) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?songId=" + songId
      });
    }
  },
  onLoad(options) {
    common_vendor.index.showLoading({
      title: "\u52A0\u8F7D\u4E2D"
    });
    common_api.list(options.listId).then((res) => {
      if (res.data.code == "200") {
        this.playList = res.data.playlist;
        this.$store.commit("INIT_CHANGE", res.data.playlist.trackIds);
        this.isLoading = false;
        common_vendor.index.hideLoading();
      }
    });
  },
  comments: {
    musichead
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
    a: "url(" + $data.playList.coverImgUrl + ")",
    b: common_vendor.p({
      title: "\u6B4C\u5355",
      icon: true,
      color: "white"
    }),
    c: $data.playList.coverImgUrl,
    d: common_vendor.t($options.formatCount($data.playList.playCount)),
    e: common_vendor.t($data.playList.name),
    f: common_vendor.t($data.playList.description),
    g: common_vendor.t($data.playList.trackCount),
    h: common_vendor.f($data.playList.tracks, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.ar[0].name),
        d: common_vendor.t(item.name),
        e: index,
        f: common_vendor.o(($event) => $options.handleToDetail(item.id))
      };
    }),
    i: !$data.isLoading
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7d5e07c6"], ["__file", "C:/Users/Administrator/Desktop/\u5C0F\u7A0B\u5E8F\u7F51\u6613\u4E91\u97F3\u4E50/music/pages/list/list.vue"]]);
wx.createPage(MiniProgramPage);
