import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiKey = 'RnuWmkUgVsu5BvZixeZBH8xjqAdjhQezfA1kZYRg'
const apodUrl = 'https://api.nasa.gov/planetary/apod?'
const roverUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
const roverlatestUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos'
const manifests = 'https://api.nasa.gov/mars-photos/api/v1/manifests/'

export default new Vuex.Store({
    state: {
        apods: [],
        rovers: [],
        manifest: [],
        overlay: false,
        lastPhotoRover: true,
        emptyPhotoAlert: false,
        currentUser: null,
    },
    mutations: {
        UPDATE_USER(state, user) { state.currentUser = user },
        GET_APOD(state, apods) { state.apods = apods },
        GET_ROVER(state, rovers) { state.rovers = rovers },
        GET_ROVER_LATEST(state, rovers) { state.rovers = rovers },
        GET_DATE_GLOBAL(state, manifest) { state.manifest = manifest },
        DISPLAY_OVERLAY(state) { state.overlay = true },
        HIDE_OVERLAY(state) { state.overlay = false },
        DISPLAY_LAST_PHOTO(state) { state.lastPhotoRover = true },
        HIDE_LAST_PHOTO(state) { state.lastPhotoRover = false },
        ALERT_MESAJE(state) { state.emptyPhotoAlert = true },
        HIDE_ALERT_MESAJE(state) { state.emptyPhotoAlert = false },
    },
    actions: {
        getApod({ commit }, date) {
            commit('DISPLAY_OVERLAY')
            let queryDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24).toISOString().substr(0, 10);

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
                .finally(() => {
                    commit('HIDE_OVERLAY')
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

        getRover({ commit, state }, { selectRoverValue, dateEarth, dateSol, dateTypeValue }) {
            commit('DISPLAY_OVERLAY')
            if (dateTypeValue == 'Earth Date') {
                axios.get(`${roverUrl}${selectRoverValue}/photos?earth_date=${dateEarth}&api_key=${apiKey}`)
                    .then(response => {
                        commit('GET_ROVER', response.data.photos)
                        commit('HIDE_LAST_PHOTO')
                        state.rovers.length === 0 ? commit('ALERT_MESAJE') : commit('HIDE_ALERT_MESAJE')
                    })
                    .finally(() => {
                        commit('HIDE_OVERLAY')
                    })
            }
            if (dateTypeValue == 'Sol Date') {
                axios.get(`${roverUrl}${selectRoverValue}/photos?sol=${dateSol}&api_key=${apiKey}`)
                    .then(response => {
                        commit('GET_ROVER', response.data.photos)
                        commit('HIDE_LAST_PHOTO')
                        state.rovers.length === 0 ? commit('ALERT_MESAJE') : commit('HIDE_ALERT_MESAJE')
                    })
                    .finally(() => {
                        commit('HIDE_OVERLAY')
                    })
            }
        },

        getRoverlatest({ commit }) {
            commit('DISPLAY_OVERLAY')
            commit('HIDE_ALERT_MESAJE')
            axios.get(`${roverlatestUrl}?&api_key=${apiKey}`)
                .then(response => {
                    commit('GET_ROVER_LATEST', response.data.latest_photos)
                    commit('DISPLAY_LAST_PHOTO')
                })
                .finally(() => {
                    commit('HIDE_OVERLAY')
                })
        },

        getdateglobal({ commit }, value) {
            axios.get(`${manifests}${value}?&api_key=${apiKey}`)
                .then(response => {
                    commit('GET_DATE_GLOBAL', response.data.photo_manifest)
                })
        },
    },
    getters: {
        cameras(state) {
            return state.rovers.map((photo) => {
                return photo.camera.name
            })
        }
    },
    modules: {
    }
})
