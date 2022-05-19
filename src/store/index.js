import Vue from "vue";
import Vuex from "vuex";
import Exam from "./module/exam";
import loginData from './module/loginData'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { loginData:loginData,Exam:Exam },
});
