"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../iconfont.js");
var common_api = require("../../common/api.js");
require("../../common/config.js");
const musichead = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  data() {
    return {
      searchHot: [],
      searchWord: "",
      searchHistory: [],
      searchType: 1,
      searchList: [],
      suggestList: []
    };
  },
  onLoad() {
    common_api.searchHot().then((res) => {
      if (res.data.code == "200") {
        this.searchHot = res.data.data;
      }
    });
    common_vendor.index.getStorage({
      key: "searchHistory",
      success: (res) => {
        this.searchHistory = res.data;
      }
    });
  },
  methods: {
    handleToWord(word) {
      this.searchWord = word;
      this.handleToSearch(word);
    },
    handleToSearch(word) {
      this.searchHistory.unshift(word);
      this.searchHistory = [...new Set(this.searchHistory)];
      if (this.searchHistory.length > 10) {
        this.searchHistory.length = 10;
      }
      common_vendor.index.setStorage({
        key: "searchHistory",
        data: this.searchHistory
      });
      this.getSearchList(word);
    },
    handleToClear() {
      common_vendor.index.removeStorage({
        key: "searchHistory",
        success: () => {
          this.searchHistory = [];
        }
      });
    },
    getSearchList(word) {
      common_api.searchWord(word).then((res) => {
        if (res.data.code == "200") {
          this.searchList = res.data.result.songs;
          this.searchType = 2;
        }
      });
    },
    handleToClose() {
      this.searchWord = "";
      this.searchType = 1;
    },
    handleToDetail(songId) {
      common_vendor.index.navigateTo({
        url: "/pages/detail/detail?songId=" + songId
      });
    },
    handleToSuggest(event) {
      let value = event.detail.value;
      if (!value) {
        this.searchType = 1;
      }
      common_api.searchSuggest(value).then((res) => {
        if (res.data.code == "200") {
          this.suggestList = res.data.result.allMatch;
          this.searchType = 3;
        }
      });
    }
  },
  components: {
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
  return common_vendor.e({
    a: common_vendor.p({
      title: "\u641C\u7D22",
      icon: true,
      iconBlack: true
    }),
    b: common_vendor.o(($event) => $options.handleToSearch($data.searchWord)),
    c: common_vendor.o([($event) => $data.searchWord = $event.detail.value, (...args) => $options.handleToSuggest && $options.handleToSuggest(...args)]),
    d: $data.searchWord,
    e: $data.searchType != 1,
    f: common_vendor.o((...args) => $options.handleToClose && $options.handleToClose(...args)),
    g: $data.searchType == 1
  }, $data.searchType == 1 ? {
    h: common_vendor.o((...args) => $options.handleToClear && $options.handleToClear(...args)),
    i: common_vendor.f($data.searchHistory, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.handleToWord(item))
      };
    }),
    j: common_vendor.f($data.searchHot, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.searchWord),
        c: item.iconUrl,
        d: common_vendor.t(item.content),
        e: common_vendor.t(item.score),
        f: index,
        g: common_vendor.o(($event) => $options.handleToWord(item.searchWord))
      };
    })
  } : $data.searchType == 2 ? {
    l: common_vendor.f($data.searchList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.al.name),
        c: common_vendor.t(item.ar[0].name),
        d: index,
        e: common_vendor.o(($event) => $options.handleToDetail(item.id))
      };
    })
  } : $data.searchType == 3 ? {
    n: common_vendor.t(this.searchWord),
    o: common_vendor.f($data.suggestList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.keyword),
        b: index,
        c: common_vendor.o(($event) => $options.handleToWord(item.keyword))
      };
    })
  } : {}, {
    k: $data.searchType == 2,
    m: $data.searchType == 3
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cedc0c6"], ["__file", "C:/Users/Administrator/Desktop/\u5C0F\u7A0B\u5E8F\u7F51\u6613\u4E91\u97F3\u4E50/music/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
