"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (tmIcon + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-waterfall",
  props: {
    width: {
      type: Number,
      default: 750
    },
    gutter: {
      type: Number,
      default: 12
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const _containerWidth = common_vendor.computed$1(() => props.width);
    const _itemRealWidth = common_vendor.computed$1(() => {
      return (_containerWidth.value - props.gutter) / 2;
    });
    const parentNameId = "tmWaterfallId";
    const _cacheList = common_vendor.ref([]);
    const _totalSort = common_vendor.ref([[], []]);
    const _list = common_vendor.ref([]);
    const _totalNum = common_vendor.ref([]);
    const _containerHeight = common_vendor.computed$1(() => {
      let lh = _totalSort.value[0].map((el) => el.height);
      let l_height = lh.length == 0 ? 0 : lh.reduce((a, b) => a + b);
      let rh = _totalSort.value[1].map((el) => el.height);
      let r_height = rh.length == 0 ? 0 : rh.reduce((a, b) => a + b);
      return { left: l_height, right: r_height, maxHeight: Math.max(r_height, l_height), minHeight: Math.min(r_height, l_height) };
    });
    common_vendor.provide("tmWaterFallItemRealWidth", common_vendor.computed$1(() => common_vendor.index.upx2px(_itemRealWidth.value)));
    function sumTotal(id) {
      _totalNum.value.push(id);
    }
    async function pushKey(n) {
      let index = _cacheList.value.findIndex((el) => el.id == n.id);
      let item = n;
      if (index > -1) {
        _cacheList.value[index] = item;
        return item;
      } else {
        _cacheList.value.push(item);
        return countPushSort(item);
      }
    }
    function countPushSort(item) {
      var _a, _b;
      let dir = _containerHeight.value.left > _containerHeight.value.right ? 1 : 0;
      let bottom = (_b = (_a = _totalSort.value[dir][_totalSort.value[dir].length - 1]) == null ? void 0 : _a.bottom) != null ? _b : 0;
      item.top = bottom + common_vendor.index.upx2px(props.gutter);
      item.bottom = item.top + item.height;
      item.left = dir == 0 ? 0 : common_vendor.index.upx2px(_itemRealWidth.value) + common_vendor.index.upx2px(props.gutter);
      let index = _list.value.findIndex((el) => el.id == item.id);
      _totalSort.value[dir].push(item);
      if (index > -1) {
        _list.value[index] = item;
      } else {
        _list.value.push(item);
      }
      return item;
    }
    expose({ parentNameId, pushKey, sumTotal });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s({
          width: common_vendor.unref(_containerWidth) + "rpx",
          height: common_vendor.unref(_containerHeight).maxHeight + 50 + "px"
        }),
        b: _totalNum.value.length != _list.value.length
      }, _totalNum.value.length != _list.value.length ? {
        c: common_vendor.p({
          name: "tmicon-loading",
          spin: true
        }),
        d: common_vendor.p({
          _class: "flex flex-center",
          margin: [0, 0],
          padding: [0, 0]
        })
      } : {});
    };
  }
});
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Code/app/tmui-cli-zscg/src/tmui/components/tm-waterfall/tm-waterfall.vue"]]);
qq.createComponent(Component);
