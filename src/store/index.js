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
    rovers: [],
    currentUser: null,
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.currentUser = user
    },
    GET_APOD(state, apods) { state.apods = apods },
    GET_ROVER(state, rovers) { state.rovers = rovers },
    GET_ROVER_LATEST(state, rovers) { state.rovers = rovers },
  },
  actions: {
    getApod({ commit }, date) {
      let queryDate =  new Date(new Date().getTime() - 1000 * 60 * 60 * 24).toISOString().substr(0, 10);

      axios.get(`${apodUrl}date=${date}&api_key=${apiKey}`)
        .then(response => {
          commit('GET_APOD', response.data)
        })
        .catch(() => {
          axios.get(`${apodUrl}date=${queryDate}&api_key=${apiKey}`)
            .then(response => {
              commit('GET_APOD', response.data)
            })
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

    getRover({ commit }, { selectRoverValue, dateEarth, dateSol, dateTypeValue }) {
      if (dateTypeValue == 'Earth Date') {
        axios.get(`${roverUrl}${selectRoverValue}/photos?earth_date=${dateEarth}&api_key=${apiKey}`)
          .then(response => {
            commit('GET_ROVER', response.data.photos)
          })
      }
      if (dateTypeValue == 'Sol Date') {
        axios.get(`${roverUrl}${selectRoverValue}/photos?sol=${dateSol}&api_key=${apiKey}`)
          .then(response => {
            commit('GET_ROVER', response.data.photos)
          })
      }
    },

    getRoverlatest({ commit }) {
      axios.get(`${roverlatestUrl}?&api_key=${apiKey}`)
        .then(response => {
          commit('GET_ROVER_LATEST', response.data.latest_photos)
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