import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import appUrl from "./appUrl";

Vue.use(Vuex);

const state = {
  // exam data
  examData: {
    courseId: "",
    duration: "",
    total_question: "",
    right_question: "",
    bad_question: 0,

  },
  editExam:false,
  //end exam
  subjects: [],
  question: [
    { value: 5 },
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
  ],
  time: [
    { value: 5 },
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
  ],
  goodMark: [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ],
  wrongAnwer: [
    { value: 0 },
  ],
};

const getters = {
  examData: (state) => state.examData,
  subjects: (state) => state.subjects,
  question: (state) => state.question,
  time: (state) => state.time,
  goodMark: (state) => state.goodMark,
  editExam:(state)=> state.editExam,
  wrongAnwer:(state)=> state.wrongAnwer,
};

const actions = {
  async getSubject({ commit }) {
    await axios
      .get(`${appUrl.state.apiBaseURL}/all_subject`)
      .then(({ data }) => {
        commit("SET_SUBJECT", data.data);
      })
      .catch((error) => console.log(error));
  },
};

const mutations = {
  SET_SUBJECT: (state, subjects) => (state.subjects = subjects),
};

const Exam = {
  state,
  getters,
  actions,
  mutations,
};
export default Exam;
