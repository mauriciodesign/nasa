import axios from 'axios'
import { apiKey } from '../index';

const apodUrl = 'https://api.nasa.gov/planetary/apod?'

export default {
    namespaced: true,
    state: {
        apods: [],
    },
    mutations: {
        GET_APOD(state, apods) { state.apods = apods },
    },

    actions: {
        getApod({ commit }, date) {
            commit('DISPLAY_OVERLAY', null, { root: true })
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
                    commit('HIDE_OVERLAY', null, { root: true })
                })
        },
    }
}
