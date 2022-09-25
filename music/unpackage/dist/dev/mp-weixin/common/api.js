"use strict";
var common_vendor = require("./vendor.js");
var common_config = require("./config.js");
function topList() {
  let listIds = ["3", "0", "2", "1"];
  return new Promise(function(reslove, reject) {
    common_vendor.index.request({
      url: `${common_config.baseUrl}/toplist/detail`,
      method: "GET",
      data: {},
      success: (res) => {
        let result = res.data.list;
        result.length = 4;
        for (var i = 0; i < listIds.length; i++) {
          result[i].listId = listIds[i];
        }
        reslove(result);
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    });
  });
}
function list(listId) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/playlist/detail?id=${listId}`,
    method: "GET"
  });
}
function songDetail(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/detail?ids=${id}`,
    method: "GET"
  });
}
function songUrl(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/song/url?id=${id}`,
    method: "GET"
  });
}
function songLyric(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/lyric?id=${id}`,
    method: "GET"
  });
}
function songSimi(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/simi/song?id=${id}`,
    method: "GET"
  });
}
function songComment(id) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/comment/music?id=${id}`,
    method: "GET"
  });
}
function searchHot() {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/hot/detail`,
    method: "GET"
  });
}
function searchWord(word) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search?keywords=${word}`,
    method: "GET"
  });
}
function searchSuggest(word) {
  return common_vendor.index.request({
    url: `${common_config.baseUrl}/search/suggest?keywords=${word}&type=mobile`,
    method: "GET"
  });
}
exports.list = list;
exports.searchHot = searchHot;
exports.searchSuggest = searchSuggest;
exports.searchWord = searchWord;
exports.songComment = songComment;
exports.songDetail = songDetail;
exports.songLyric = songLyric;
exports.songSimi = songSimi;
exports.songUrl = songUrl;
exports.topList = topList;
