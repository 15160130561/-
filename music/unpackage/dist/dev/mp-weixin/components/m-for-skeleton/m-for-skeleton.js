"use strict";
var common_vendor = require("../../common/vendor.js");
var animation = common_vendor.index.createAnimation({
  duration: 1e3,
  timingFunction: "linear"
});
const _sfc_main = {
  data() {
    return {
      animationData: {},
      imgType: ["circular", "square"],
      displayType: ["vertical", "horizontal"],
      show: true
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    title: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: true
    },
    avatarSize: {
      type: Number | String,
      default: 100
    },
    isarc: {
      type: String,
      default: "square"
    },
    titleSize: {
      type: Number | String,
      default: "50%"
    },
    titleStyle: {
      type: Object,
      default: {}
    },
    row: {
      type: Number,
      default: 1
    },
    rowData: {
      type: Array | String,
      default: "80%"
    },
    display: {
      type: String,
      default: "horizontal"
    }
  },
  created() {
    this.animationData = animation;
  },
  watch: {
    loading(loading) {
      if (!loading) {
        animation.opacity(0).step();
        this.animationData = animation.export();
        const time = setTimeout(() => {
          this.show = false;
          clearTimeout(time);
        }, 1e3);
      }
    }
  },
  computed: {
    rowDataInfo() {
      let rowArr = [];
      for (let index = 0; index < this.row; index++) {
        rowArr.push(index);
      }
      return rowArr;
    },
    titleInfo() {
      let titlData = "";
      for (const key in this.titleStyle) {
        titlData += `${key}:${this.titleStyle[key]};`;
      }
      return titlData;
    },
    imgsize() {
      switch (typeof this.avatarSize) {
        case "number":
          return `${common_vendor.index.upx2px(this.avatarSize)}px`;
        default:
          return `${common_vendor.index.upx2px(parseFloat(this.avatarSize))}px`;
      }
    },
    titlwidth() {
      switch (typeof this.titleSize) {
        case "number":
          return `${common_vendor.index.upx2px(this.titleSize)}px`;
        default:
          return `${common_vendor.index.upx2px(parseFloat(this.titleSize))}px`;
      }
    },
    imgarc() {
      if (this.imgType.includes(this.isarc)) {
        if (this.isarc == "square") {
          return "0%";
        }
        return "50%";
      }
      console.error(`\u8F93\u5165\u9519\u8BEF${this.isarc}`);
      return "0%";
    },
    displayInfo() {
      if (this.displayType.includes(this.display)) {
        return this.display;
      }
      console.error(`\u8F93\u5165\u9519\u8BEF${this.display}`);
      return "horizontal";
    }
  },
  methods: {
    rowInfo(key) {
      const rowTypeof = typeof this.rowData;
      switch (rowTypeof) {
        case "string":
          return this.rowData;
        case "object":
          if (!this.rowData[0]) {
            return "80%";
          }
          if (!this.rowData[key]) {
            key = 0;
          }
          return this.rowData[key].indexOf("%") > -1 ? this.rowData[key] : `${common_vendor.index.upx2px(parseFloat(this.rowData[key]))}px`;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? common_vendor.e({
    b: $props.avatar
  }, $props.avatar ? {
    c: $options.imgsize,
    d: $options.imgsize,
    e: $options.imgarc
  } : {}, {
    f: $props.title
  }, $props.title ? {
    g: common_vendor.s($options.titleInfo)
  } : {}, {
    h: common_vendor.f($options.rowDataInfo, (item, key, i0) => {
      return {
        a: key,
        b: $options.rowInfo(key)
      };
    }),
    i: common_vendor.n($options.displayInfo),
    j: $data.animationData
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-292d9f24"], ["__file", "C:/Users/Administrator/Desktop/\u5C0F\u7A0B\u5E8F\u7F51\u6613\u4E91\u97F3\u4E50/music/components/m-for-skeleton/m-for-skeleton.vue"]]);
wx.createComponent(Component);
