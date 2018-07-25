// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "common/css/normalize.css";
// import "common/css/reset.css";
// import "common/css/common.css";

import Vue from 'vue'
import App from './App.vue'

// import image from "assets/image/cursor.png"


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})