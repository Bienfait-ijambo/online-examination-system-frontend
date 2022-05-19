import Vue from "vue";
import Vuex from "vuex";
import Exam from "./module/exam";
import loginData from './module/loginData'
import Question from './module/question'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { loginData:loginData,Exam:Exam,Question:Question},
});
