import Vue from 'vue';
Vue.config.debug = true;
Vue.config.devtools = true;

import { myAppData } from './vuex/store';
import myComponent from './../components/component.vue';

export const myApp = new Vue({
    name: 'myApp',
    template: '#myApp',
    el: '#app', // instance startig container
    components: {
        'my-component': myComponent
    },
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
