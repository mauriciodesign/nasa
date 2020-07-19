import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiKey = 'RnuWmkUgVsu5BvZixeZBH8xjqAdjhQezfA1kZYRg'
const baseUrl = 'https://api.nasa.gov/planetary/apod?'
export default new Vuex.Store({
  state: {
    apods: [],
    currentUser: null,
  },
  mutations: {
    SET_CURRENT_USER(state, email) {
      state.currentUser = email
    },
    GET_APOD(state, apods) { state.apods = apods },
    SET_PIKER(state, apods) { state.apods = apods }
  },
  actions: {
    getApod({ commit }) {
      axios.get(`${baseUrl}api_key=${apiKey}`)
        .then(response => {
          commit('GET_APOD', response.data)
        })
    },
    setCurrentUser({ commit }, email) {
      commit('SET_CURRENT_USER', email)
    },
    setPiker({ commit }, date){
      axios.get(`${baseUrl}date=${date}&api_key=${apiKey}`)
      .then(response => {
        commit('SET_PIKER', response.data)
      })
    }
  },
  modules: {
  }
})
