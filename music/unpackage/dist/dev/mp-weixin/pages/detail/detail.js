"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../iconfont.js");
var common_api = require("../../common/api.js");
require("../../common/config.js");
const musichead = () => "../../components/musichead/musichead.js";
const _sfc_main = {
  data() {
    return {
      songDetail: {
        al: {
          picUrl: ""
        }
      },
      songSimi: [],
      songComment: [],
      songLyric: [],
      lyricIndex: 0,
      iconPlay: "iconpause",
      isplayrotate: true,
      isLoading: true
    };
  },
  onLoad(options) {
    this.playMusic(options.songId);
  },
  onUnload() {
    clearInterval(this.timer);
  },
  onHide() {
    clearInterval(this.timer);
  },
  methods: {
    likedCount(value) {
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
    time(value) {
      var date = new Date(value);
      return date.getFullYear() + "\u5E74" + (date.getMonth() + 1) + "\u6708" + date.getDate() + "\u65E5";
    },
    handleToSimi(songId) {
      this.playMusic(songId);
    },
    playMusic(songId) {
      this.$store.commit("NEXT_ID", songId);
      this.isLoading = true;
      common_vendor.index.showLoading({
        title: "\u52A0\u8F7D\u4E2D"
      });
      Promise.all([common_api.songDetail(songId), common_api.songSimi(songId), common_api.songComment(songId), common_api.songLyric(songId), common_api.songUrl(songId)]).then((res) => {
        if (res[0].data.code == "200") {
          this.songDetail = res[0].data.songs[0];
        }
        if (res[1].data.code == "200") {
          this.songSimi = res[1].data.songs;
        }
        if (res[2].data.code == "200") {
          this.songComment = res[2].data.hotComments;
        }
        if (res[3].data.code == "200") {
          let lyric = res[3].data.lrc.lyric;
          let re = /\[([^\]]+)\]([^[]+)/g;
          var result = [];
          lyric.replace(re, ($0, $1, $2) => {
            result.push({
              "time": this.formatTimeToSec($1),
              "lyric": $2
            });
          });
          this.songLyric = result;
        }
        if (res[4].data.code == "200") {
          this.bgAudioManager = common_vendor.index.getBackgroundAudioManager();
          this.bgAudioManager.title = this.songDetail.name;
          this.bgAudioManager.src = res[4].data.data[0].url || "";
          this.bgAudioManager.onPlay(() => {
            this.iconPlay = "iconpause";
            this.isplayrotate = true;
            this.listenLyricIndex();
          });
          this.bgAudioManager.onPause(() => {
            this.iconPlay = "iconbofang1";
            this.isplayrotate = false;
            this.cancelLyricIndex();
          });
          this.bgAudioManager.onEnded(() => {
            this.playMusic(this.$store.state.nextId);
          });
        }
        common_vendor.index.hideLoading();
        this.isLoading = false;
      });
    },
    formatTimeToSec(value) {
      let arr = value.split(":");
      return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(2);
    },
    handleToPlay() {
      if (this.bgAudioManager.paused) {
        this.bgAudioManager.play();
      } else {
        this.bgAudioManager.pause();
      }
    },
    listenLyricIndex() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        for (var i = 0; i < this.songLyric.length; i++) {
          if (this.songLyric[this.songLyric.length - 1].time < this.bgAudioManager.currentTime) {
            this.lyricIndex = this.songLyric.length - 1;
            break;
          }
          if (this.songLyric[i].time < this.bgAudioManager.currentTime && this.songLyric[i + 1].time > this.bgAudioManager.currentTime) {
            this.lyricIndex = i;
          }
        }
      }, 500);
    },
    cancelLyricIndex() {
      clearInterval(this.timer);
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
  return {
    a: "url(" + $data.songDetail.al.picUrl + ")",
    b: common_vendor.p({
      title: $data.songDetail.name,
      icon: true,
      color: "white"
    }),
    c: $data.songDetail.al.picUrl,
    d: $data.isplayrotate ? 1 : "",
    e: common_vendor.n($data.iconPlay),
    f: common_vendor.o((...args) => $options.handleToPlay && $options.handleToPlay(...args)),
    g: common_vendor.f($data.songLyric, (item, index, i0) => {
      return {
        a: common_vendor.t(item.lyric),
        b: $data.lyricIndex == index ? 1 : "",
        c: index
      };
    }),
    h: "translateY(" + -($data.lyricIndex - 1) * 82 + "rpx)",
    i: common_vendor.f($data.songSimi, (item, index, i0) => {
      return common_vendor.e({
        a: item.album.picUrl,
        b: common_vendor.t(item.name),
        c: item.privilege.flag > 60 && item.privilege.flag < 70
      }, item.privilege.flag > 60 && item.privilege.flag < 70 ? {} : {}, {
        d: item.privilege.maxbr == 999e3
      }, item.privilege.maxbr == 999e3 ? {} : {}, {
        e: common_vendor.t(item.artists[0].name),
        f: common_vendor.t(item.name),
        g: index,
        h: common_vendor.o(($event) => $options.handleToSimi(item.id))
      });
    }),
    j: common_vendor.f($data.songComment, (item, index, i0) => {
      return {
        a: item.user.avatarUrl,
        b: common_vendor.t(item.user.nickname),
        c: common_vendor.t($options.time(item.time)),
        d: common_vendor.t($options.likedCount(item.likedCount)),
        e: common_vendor.t(item.content),
        f: index
      };
    }),
    k: !$data.isLoading
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3e159eb4"], ["__file", "C:/Users/Administrator/Desktop/\u5C0F\u7A0B\u5E8F\u7F51\u6613\u4E91\u97F3\u4E50/music/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
