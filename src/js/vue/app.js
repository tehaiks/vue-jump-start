// Vue Instance

const myAppArch = Vue.extend({
    name: 'my-app',
    template: '#myApp-template',
    data: function() {
        return {

        }
    }
});

Vue.component('my-app', myAppArch);

new Vue({
    el: '#app',
});