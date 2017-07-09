// Vuex vault
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const myAppData = new Vuex.Store({
  state,
  mutations,
  actions,
});

// test
myAppData.commit('increment');

export { myAppData as default };
