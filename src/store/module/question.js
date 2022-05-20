import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
  // exam data
  
  examName:'',
  questionData:{
    examId:'',
    question_title:'',
    answer_option:0
  }
};

const getters = {
    examId: (state) => state.questionData.examId,
    examName: (state) => state.examName,
    questionData: (state) => state.questionData,


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
