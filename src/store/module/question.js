import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
// import appUrl from "./appUrl";

Vue.use(Vuex);
const state = {
  // exam data
  examId:''
};

const getters = {
    examId: (state) => state.examId,
};

const actions = {
 
};

const mutations = {
 
};

const Question = {
  state,
  getters,
  actions,
  mutations,
};
export default Question;
