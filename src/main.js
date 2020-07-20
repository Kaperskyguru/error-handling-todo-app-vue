import Vue from "vue";
import App from "./App.vue";
import { ErrorService } from "./Services/ErrorService";
import store from "./store";
import SweetAlert from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(SweetAlert);
Vue.config.productionTip = false;

// Handle all Vue errors
Vue.config.errorHandler = (error) => ErrorService.onError(error);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
