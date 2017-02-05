// Vue Instance

APP.myAppArch = Vue.extend({
    name: 'my-app',
    template: '#myApp-template',
    data: function() {
        return {

        }
    },
    computed: {
        result: function() {
            return APP.vault.state.result;
        },
    },
    methods: {
    	increment:function() {
    		APP.vault.commit('increment');
    	},
    	decrement:function() {
    		APP.vault.commit('decrement');
    	}
    }
});

Vue.component('my-app', APP.myAppArch);

new Vue({
    el: '#app',
});