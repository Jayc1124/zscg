"use strict";
var tmui_tool_lib_tmpinia = require("../tmui/tool/lib/tmpinia.js");
const tmStore = tmui_tool_lib_tmpinia.useTmpiniaStore();
const onChangeDark = () => {
  tmStore.setTmVuetifyDark(!tmStore.tmStore.dark);
};
const IsDark = () => {
  return tmStore.tmStore.dark;
};
exports.IsDark = IsDark;
exports.onChangeDark = onChangeDark;
