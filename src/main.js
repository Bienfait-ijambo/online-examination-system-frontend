import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./vuetify";
import http from "./mixin/http";
import helper from "./mixin/helper";
import Toasted from "vue-toasted";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
Vue.use(Toasted);

Vue.config.productionTip = false;
Vue.mixin(http);
Vue.mixin(helper);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
