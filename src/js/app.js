import Vue from 'vue';
Vue.config.debug = true;
Vue.config.devtools = true;
Vue.productionTip = false;

import Meta from 'vue-meta';
Vue.use(Meta);

import { myAppData } from './vuex/store';
import myComponent from './../components/component.vue';

export const myApp = new Vue({
    name: 'myApp',
    template: '#myApp',
    el: '#app', // instance startig container
    components: {
        'my-component': myComponent
    },
    metaInfo: {
        title: 'New App',
        titleTemplate: '%s | Webspring',
        meta: [
            {
                charset: 'utf-8'
            }, 
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ]
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