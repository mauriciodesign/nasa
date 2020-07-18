import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  mutations: {
    SET_CURRENT_USER(state, email) {
      state.currentUser = email
    },
  },
  actions: {
    setCurrentUser({ commit }, email) {
      commit('SET_CURRENT_USER', email)
    },
  },
  modules: {
  }
})
