import Vue from 'vue';
Vue.config.debug = true;
Vue.config.devtools = true;

import { appData } from './vuex/store';

const welcomeApp = new Vue({
    name: 'welcomeApp',
    template: '#welcomeApp',
    el: '#app',
    data: function() {
        return {

        }
    },
    computed: {
        result: function() {
            // console.log(vault)
            return appData.state.result;
        },
    },
    methods: {
        increment:function() {
            appData.commit('increment');
        },
        decrement:function() {
            appData.commit('decrement');
        }
    }
});