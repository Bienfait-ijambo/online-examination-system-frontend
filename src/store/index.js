import Vue from 'vue'
import Vuex from 'vuex'
import { isNull } from "lodash"
Vue.use(Vuex)

const state={
  api:'http://localhost:3030/api',//unsafe
  safeApi:'http://localhost:3030/sapi',//sapi==safe api
  userData:isNull(localStorage.getItem('userData')) ? "null":JSON.parse(localStorage.getItem('userData'))
}
const getters={
  api:(state)=>state.api,
  safeApi:(state)=>state.safeApi,
  userData:(state)=>state.userData

}
const actions={
  logout(){
    localStorage.removeItem('userData')
   window.location.reload()
  }
}
const mutations={
  
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
