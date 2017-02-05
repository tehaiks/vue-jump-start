// Vuex vault

APP.vault = new Vuex.Store({
    state: {
        result: 0
    },
    mutations: {
        increment(state) {
            state.result++
        },
        decrement(state) {
            state.result--
        }
    }
})

APP.vault.commit('increment');