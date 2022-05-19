import Vue from "vue";
import Vuex from "vuex";
import { isNull } from "lodash";
Vue.use(Vuex);

const state = {
  userData: isNull(localStorage.getItem("userData"))
    ? "null"
    : JSON.parse(localStorage.getItem("userData")),
};
const getters = {
  userData: (state) => state.userData,
};

const actions = {
  logout() {
    localStorage.removeItem("userData");
    window.location.reload();
  },
};

const loginData={
    state,
    getters,
    actions
}

export default loginData