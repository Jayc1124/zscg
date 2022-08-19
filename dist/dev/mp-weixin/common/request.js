"use strict";
var common_vendor = require("./vendor.js");
const baseUrl = "https://wx.jaycao.com/";
const request = (opts, data) => {
  common_vendor.index.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      common_vendor.index.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let httpDefaultOpts = {
    url: opts.url,
    data,
    method: opts.method,
    header: opts.method == "get" ? {
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json; charset=UTF-8"
    },
    dataType: "json"
  };
  let promise = new Promise(function(resolve, reject) {
    common_vendor.index.request(httpDefaultOpts).then((res) => {
      resolve(res);
    }).catch((response) => {
      reject(response);
    });
  });
  return promise;
};
const httpRequest = (opts, data) => {
  common_vendor.index.showLoading({
    title: "\u52A0\u8F7D\u4E2D"
  });
  common_vendor.index.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      common_vendor.index.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let httpDefaultOpts = {
    url: baseUrl + opts.url,
    data,
    method: opts.method,
    header: opts.method == "get" ? {
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    } : {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json; charset=UTF-8"
    },
    dataType: "json"
  };
  let promise = new Promise(function(resolve, reject) {
    common_vendor.index.request(httpDefaultOpts).then((res) => {
      common_vendor.index.hideLoading();
      resolve(res);
    }).catch((response) => {
      common_vendor.index.hideLoading();
      reject(response);
    });
  });
  return promise;
};
const httpTokenRequest = (opts, data) => {
  common_vendor.index.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      common_vendor.index.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let token = common_vendor.index.getStorageSync("token");
  if (token == "" || token == void 0 || token == null) {
    common_vendor.index.showToast({
      title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
      icon: "none",
      complete: function() {
        common_vendor.index.setStorage({
          key: "login_id",
          data: false,
          success: () => {
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          }
        });
      }
    });
  } else {
    common_vendor.index.showLoading({});
    let httpDefaultOpts = {
      url: baseUrl + opts.url,
      data,
      method: opts.method,
      header: opts.method == "get" ? {
        "Authorization": "wx " + token,
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      } : {
        "Authorization": "wx " + token,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=UTF-8"
      },
      dataType: "json"
    };
    let promise = new Promise(function(resolve, reject) {
      common_vendor.index.request(httpDefaultOpts).then((res) => {
        if (res.data.code == 200) {
          common_vendor.index.hideLoading();
          resolve(res);
        } else {
          common_vendor.index.hideLoading();
          if (res.data.code == 401) {
            common_vendor.index.showToast({
              title: "Token\u5DF2\u8FC7\u671F",
              icon: "none"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/login/login"
              });
              common_vendor.index.setStorageSync("login_id", false);
            }, 1e3);
          } else {
            common_vendor.index.hideLoading();
            resolve(res);
          }
        }
      }).catch((response) => {
        common_vendor.index.hideLoading();
        reject(response);
      });
    });
    return promise;
  }
};
const httpupload = (opts, data) => {
  common_vendor.index.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      common_vendor.index.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let token = common_vendor.index.getStorageSync("token");
  if (token == "" || token == void 0 || token == null) {
    common_vendor.index.showToast({
      title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
      icon: "none",
      complete: function() {
        common_vendor.index.setStorage({
          key: "login_id",
          data: false,
          success: () => {
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          }
        });
      }
    });
  } else {
    let httpDefaultOpts = {
      url: baseUrl + opts.url,
      filePath: opts.filePath,
      name: "image",
      formData: {},
      header: {
        "Authorization": "wx " + token,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    let promise = new Promise(function(resolve, reject) {
      common_vendor.index.uploadFile(httpDefaultOpts).then((res) => {
        if (res[1].data.code == 200) {
          resolve(res[1]);
        } else {
          if (res[1].data.code == 401) {
            common_vendor.index.showToast({
              title: "Token\u5DF2\u8FC7\u671F",
              icon: "none"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/login/login"
              });
              common_vendor.index.setStorageSync("login_id", false);
            }, 1e3);
          } else {
            resolve(res[1]);
          }
        }
      }).catch((response) => {
        reject(response);
      });
    });
    return promise;
  }
};
const httpJwRequest = (opts, data) => {
  common_vendor.index.onNetworkStatusChange(function(res) {
    if (!res.isConnected) {
      common_vendor.index.showToast({
        title: "\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528\uFF01",
        icon: "none"
      });
    }
    return false;
  });
  let token = common_vendor.index.getStorageSync("jwToken");
  console.log("token:" + token);
  if (token == "" || token == void 0 || token == null) {
    common_vendor.index.showToast({
      title: "\u670D\u52A1\u5C1A\u672A\u5F00\u542F",
      icon: "none"
    });
  } else {
    common_vendor.index.showLoading({});
    let httpDefaultOpts = {
      url: "https://jw.jaycao.com/cdgyxyhd/" + opts.url,
      data,
      method: opts.method,
      header: opts.method == "get" ? {
        "token": token,
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      } : {
        "token": token,
        "Content-Type": "application/json; charset=UTF-8"
      },
      dataType: "json"
    };
    let promise = new Promise(function(resolve, reject) {
      common_vendor.index.request(httpDefaultOpts).then((res) => {
        if (res.data.code == 200) {
          common_vendor.index.hideLoading();
          resolve(res);
        } else {
          common_vendor.index.hideLoading();
          if (res.data.code == 401) {
            common_vendor.index.showToast({
              title: "\u670D\u52A1\u672A\u5F00\u542F",
              icon: "none"
            });
          } else {
            common_vendor.index.hideLoading();
            resolve(res);
          }
        }
      }).catch((response) => {
        common_vendor.index.hideLoading();
        reject(response);
      });
    });
    return promise;
  }
};
const hadToken = () => {
  let token = common_vendor.index.getStorageSync("token");
  if (token == "" || token == void 0 || token == null) {
    common_vendor.index.showToast({
      title: "\u8D26\u53F7\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55",
      icon: "none",
      complete: function() {
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
      }
    });
    return false;
  }
  return true;
};
var request$1 = {
  baseUrl,
  httpJwRequest,
  httpRequest,
  httpTokenRequest,
  hadToken,
  request,
  httpupload
};
exports.request = request$1;
