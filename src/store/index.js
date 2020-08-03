import Vue from 'vue'
import Vuex from 'vuex'
import apod from './modules/apod.js';
import rover from './modules/rover.js';

Vue.use(Vuex)

export const apiKey = 'RnuWmkUgVsu5BvZixeZBH8xjqAdjhQezfA1kZYRg'

export default new Vuex.Store({
    modules: {
        apod,
        rover,
    },
    state: {
        overlay: false,
        currentUser: null,
    },
    mutations: {
        UPDATE_USER(state, user) { state.currentUser = user },

        DISPLAY_OVERLAY(state) { state.overlay = true },
        HIDE_OVERLAY(state) { state.overlay = false },
    },
    actions: {
        updateUser({ commit }, user) {
            return new Promise((resolve, reject) => {
                try {
                    commit('UPDATE_USER', user)
                    resolve(user)
                } catch (e) { reject(e) }
            })
        },
    },
})
