import axios from 'axios'
import { apiKey } from '../index';

const roverUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
const roverlatestUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos'
const manifests = 'https://api.nasa.gov/mars-photos/api/v1/manifests/'

export default {
    namespaced: true,
    state: {
        rovers: [],
        manifest: [],
        lastPhotoRover: true,
        emptyPhotoAlert: false,
    },
    mutations: {
        GET_ROVER(state, rovers) { state.rovers = rovers },
        GET_ROVER_LATEST(state, rovers) { state.rovers = rovers },
        GET_DATE_GLOBAL(state, manifest) { state.manifest = manifest },
        DISPLAY_LAST_PHOTO(state) { state.lastPhotoRover = true },
        HIDE_LAST_PHOTO(state) { state.lastPhotoRover = false },
        ALERT_MESAJE(state) { state.emptyPhotoAlert = true },
        HIDE_ALERT_MESAJE(state) { state.emptyPhotoAlert = false },
    },

    actions: {
        getRover({ commit, state }, { selectRoverValue, dateEarth, dateSol, dateTypeValue }) {
            commit('DISPLAY_OVERLAY', null, { root: true })

            if (dateTypeValue == 'Earth Date') {
                axios.get(`${roverUrl}${selectRoverValue}/photos?earth_date=${dateEarth}&api_key=${apiKey}`)
                    .then(response => {
                        commit('GET_ROVER', response.data.photos)
                        commit('HIDE_LAST_PHOTO')
                        state.rovers.length === 0 ? commit('ALERT_MESAJE') : commit('HIDE_ALERT_MESAJE')
                    })
                    .finally(() => {
                        commit('HIDE_OVERLAY', null, { root: true })
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
                        commit('HIDE_OVERLAY', null, { root: true })
                    })
            }
        },

        getRoverlatest({ commit }) {
            commit('DISPLAY_OVERLAY', null, { root: true })
            commit('HIDE_ALERT_MESAJE')
            axios.get(`${roverlatestUrl}?&api_key=${apiKey}`)
                .then(response => {
                    commit('GET_ROVER_LATEST', response.data.latest_photos)
                    commit('DISPLAY_LAST_PHOTO')
                })
                .finally(() => {
                    commit('HIDE_OVERLAY', null, { root: true })
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
}
