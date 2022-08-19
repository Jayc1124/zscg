"use strict";
var common_vendor = require("../../common/vendor.js");
var common_request = require("../../common/request.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      name: null,
      number: "",
      dept: "",
      plateNo: "",
      plateShow: false,
      inputDisabled: true,
      PageCur: 1,
      res: [{
        name: "",
        mphone: "",
        depname: ""
      }]
    };
  },
  onLoad() {
  },
  methods: {
    getinfo() {
      let opts = {
        url: `getInfo/teacher/${this.name}`,
        method: "get"
      };
      console.log(this.name);
      common_request.request.httpTokenRequest(opts).then((res) => {
        if (res.data.data == 500) {
          this.$refs.toast.show({
            model: "info",
            label: res.data.data.msg
          });
        }
        if (res.data.code == 200) {
          this.res = res.data.data;
          this.number = res.data.data.mphone;
          this.dept = res.data.data.depname;
          common_vendor.index.hideLoading();
        }
        if (res.data.data.length == 0) {
          console.log("213");
          this.$refs.toast.show({ model: "info", label: "\u67E5\u8BE2\u8001\u5E08\u4E0D\u5B58\u5728", wait: 500 });
        }
        common_vendor.index.hideLoading();
      });
    },
    setPlate(plate) {
      console.log(plate);
      if (plate.length >= 7)
        this.plateNo = plate;
      this.plateShow = false;
    },
    typeChange(e) {
      console.log(e);
      this.PageCur = e;
      this.plateNo = "";
    },
    close() {
      this.PageCur = 1;
    }
  },
  filters: {
    plateNoF(val) {
      if (val == "") {
        return "\u8BF7\u5148\u586B\u5199\u6559\u5E08\u59D3\u540D";
      } else {
        let arr = val.split("");
        arr.splice(2, 0, " \xB7 ");
        return arr.join("");
      }
    }
  }
};
if (!Array) {
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  _easycom_tm_input2();
}
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
if (!Math) {
  _easycom_tm_input();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.plateShow = true),
    b: common_vendor.o(($event) => $data.name = $event),
    c: common_vendor.p({
      prefixLabel: "\u59D3\u540D",
      margin: [0, 24],
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.name
    }),
    d: common_vendor.o((...args) => $options.getinfo && $options.getinfo(...args)),
    e: common_vendor.f($data.res, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t$1(item.name),
        b: common_vendor.t$1(item.depname),
        c: common_vendor.t$1(item.mphone)
      }, $data.res.length >= 2 ? {} : {});
    }),
    f: $data.res.length >= 2
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-76b103d8"], ["__file", "D:/Code/app/tmui-cli-zscg/src/pages/tool/getTeacherNumber.vue"]]);
wx.createPage(MiniProgramPage);
