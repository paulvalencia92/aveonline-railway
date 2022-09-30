import router from "./src/router";
import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast);

require('./bootstrap');

window.Vue = require('vue');

Vue.component('app-component', require('./components/AppComponent.vue').default);

require("bootstrap-css-only/css/bootstrap.min.css");
require("mdbvue/lib/css/mdb.min.css");
require("@fortawesome/fontawesome-free/css/all.min.css");

const app = new Vue({
    el: '#app',
    router
});
