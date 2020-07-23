import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

const apiKey = 'RnuWmkUgVsu5BvZixeZBH8xjqAdjhQezfA1kZYRg'
const apodUrl = 'https://api.nasa.gov/planetary/apod?'
const roverUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
const roverlatestUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos'

export default new Vuex.Store({
  state: {
    apods: [],
    rovers: [],
    currentUser: getFromStorage('user') || undefined,
    dateTypeValue: '',
    search: {
      selectRoverValue: null,
      dateEarth: '',
      dateSol: ''
    }
  },
  mutations: {
    SET_CURRENT_USER(state, email) {
      state.currentUser = email
    },
    UPDATE_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },
    GET_APOD(state, apods) { state.apods = apods },
    GET_ROVER(state, rovers) { state.rovers = rovers },
    GET_ROVER_LATEST(state, rovers) { state.rovers = rovers },
    SEND_DATE_TYPE(state, dateTypeValue) { state.dateTypeValue = dateTypeValue },
    SEND_SELECT_ROVER(state, selectRoverValue) { state.search.selectRoverValue = selectRoverValue },
    SEND_DATE_EARTH_ROVER(state, dateEarth) { state.search.dateEarth = dateEarth },
    SEND_DATE_SOL_ROVER(state, dateSol) { state.search.dateSol = dateSol },
  },
  actions: {
    getApod({ commit }, date) {
      // let queryDate = date ? date : new Date().toISOString().substr(0, 10);
      // console.log(queryDate)
      axios.get(`${apodUrl}date=${date}&api_key=${apiKey}`)
        .then(response => {
          commit('GET_APOD', response.data)
        })
        .catch(() => {
          console.log('algo malio sal')
        })
    },
    updateUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_USER', user)
          resolve(user)
        } catch (e) { reject(e) }
      })
    },
    setCurrentUser({ commit }, email) {
      commit('SET_CURRENT_USER', email)
    },
    sendDateType({ commit }, dateTypeValue) {
      commit('SEND_DATE_TYPE', dateTypeValue)
      console.log(this.state.dateTypeValue)
    },
    sendSelectRover({ commit }, selectRoverValue) {
      commit('SEND_SELECT_ROVER', selectRoverValue)
    },
    sendDateEarthRover({ commit }, dateEarth) {
      commit('SEND_DATE_EARTH_ROVER', dateEarth)
    },
    sendDateSolRover({ commit }, dateSol) {
      commit('SEND_DATE_SOL_ROVER', dateSol)
    },
    getRover({ commit, state }) {
      if (state.dateTypeValue == 'Earth Date') {
        axios.get(`${roverUrl}${state.search.selectRoverValue}/photos?earth_date=${state.search.dateEarth}&api_key=${apiKey}`)
          .then(response => {
            console.log(response)
            commit('GET_ROVER', response.data.photos)
            console.log(response.data.photos)
          })
      }
      if (state.dateTypeValue == 'Sol Date') {
        axios.get(`${roverUrl}${state.search.selectRoverValue}/photos?sol=${state.search.dateSol}&api_key=${apiKey}`)
          .then(response => {
            console.log(response)
            commit('GET_ROVER', response.data.photos)
            console.log(response.data.photos)
          })
      }
    },
    getRoverlatest({ commit }) {
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