import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiKey = 'RnuWmkUgVsu5BvZixeZBH8xjqAdjhQezfA1kZYRg'
const apodUrl = 'https://api.nasa.gov/planetary/apod?'
const roverUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
const roverlatestUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos'

export default new Vuex.Store({
  state: {
    apods: [],
    rovers:[],
    currentUser: null,
    search:{
      dateSol: '',
      selectRover:''
    }
  },
  mutations: {
    SET_CURRENT_USER(state, email) {
      state.currentUser = email
    },
    GET_APOD(state, apods) { state.apods = apods },
    SET_PIKER(state, apods) { state.apods = apods },
    GET_ROVER(state, rovers){ state.rovers = rovers},
    GET_ROVER_LATEST(state, rovers){ state.rovers = rovers},
    SEND_SOL(state, sol) { state.search.dateSol = sol},
    SEND_SELECT(state, select) { state.search.selectRover = select}
  },
  actions: {
    getApod({ commit }) {
      axios.get(`${apodUrl}api_key=${apiKey}`)
        .then(response => {
          commit('GET_APOD', response.data)
        })
    },
    setCurrentUser({ commit }, email) {
      commit('SET_CURRENT_USER', email)
    },
    setPiker({ commit }, date){
      axios.get(`${apodUrl}date=${date}&api_key=${apiKey}`)
      .then(response => {
        commit('SET_PIKER', response.data)
      })
      .catch(()=>{
        alert('No hay contenido con esta fecha')
      })
    },
    sendSol({commit}, sol){
      commit('SEND_SOL', sol)
    },
    sendSelect({commit}, select){
      commit('SEND_SELECT', select)
    },
    getRover({ commit, state }){
      axios.get(`${roverUrl}${state.search.selectRover}/photos?earth_date=${state.search.dateSol}&api_key=${apiKey}`)
      .then(response => {
        commit('GET_ROVER', response.data.photos)
      })
    },
    getRoverlatest({ commit }){
      axios.get(`${roverlatestUrl}?&api_key=${apiKey}`)
      .then(response => {
        commit('GET_ROVER_LATEST', response.data.latest_photos)
        console.log(response.data.latest_photos)
      })
    }
  },
  modules: {
  }
})
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY
// https://api.nasa.gov/planetary/apod?

//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos&api_key=RnuWmkUgVsu5BvZixeZBH8xjqAdjhQezfA1kZYRg

// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=RnuWmkUgVsu5BvZixeZBH8xjqAdjhQezfA1kZYRg