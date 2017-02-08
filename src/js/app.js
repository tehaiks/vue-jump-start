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
        result() {
            return appData.state.result;
        },
    },
    methods: {
        increment() {
            appData.dispatch('increment');
        },
        decrement() {
            appData.dispatch('decrement');
        }
    }
});