import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./tmui"
import App from "./App.vue";
import uView from "./uni_modules/vk-uview-ui";
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia());
  app.use(tmui)
  // app.use(uView)
  return {
    app,
    Pinia
  };
}
