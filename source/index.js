
import Vue from "vue";
import App from "./app.vue";
import KintoneVueComponent from 'kintone-vue-component';
import 'kintone-vue-component/dist/kintone-vue-component.css';
Vue.use(KintoneVueComponent);

kintone.events.on('app.record.index.show', function (event) {
  Vue.set(KintoneVueComponent);
  if (event.viewName === '一覧1') {
    const vm = new Vue(App).$mount('#app');
    vm.$data.event = event
  }
});