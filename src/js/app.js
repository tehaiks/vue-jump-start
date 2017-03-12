import Vue from 'vue';
Vue.config.debug = true;
Vue.config.devtools = true;

import { myAppData } from './vuex/store';

export const myApp = new Vue({
    name: 'myApp',
    template: '#myApp',
    el: '#app',
    data: function() {
        return {

        }
    },
    computed: {
        result() {
            return myAppData.state.result;
        }
    },
    methods: {
        increment() {
            myAppData.dispatch('increment');
        },
        decrement() {
            myAppData.dispatch('decrement');
        }
    }
});