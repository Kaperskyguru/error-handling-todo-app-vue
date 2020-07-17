import Vue from "vue";
import App from "./App.vue";
import { ErrorService } from "./Services/ErrorService";
import store from "./store";

Vue.config.productionTip = false;

Vue.config.errorHandler = (error) => ErrorService.onError(error); // Handle all Vue errors

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
