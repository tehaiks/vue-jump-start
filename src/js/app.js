import Vue from 'vue';
import Meta from 'vue-meta';
import myAppData from './vuex/store';
import myComponent from './../components/component.vue';

Vue.config.debug = true;
Vue.config.devtools = true;
Vue.productionTip = false;

Vue.use(Meta);

const myApp = new Vue({
  name: 'myApp',
  template: '#myApp',
  el: '#app', // instance startig container
  components: {
    'my-component': myComponent,
  },
  metaInfo: {
    title: 'New App',
    titleTemplate: '%s | Vue Jump Start',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
  },
  data() {
    return {};
  },
  computed: {
    result() {
      return myAppData.state.result;
    },
  },
  methods: {
    increment() {
      myAppData.dispatch('increment');
    },
    decrement() {
      myAppData.dispatch('decrement');
    },
  },
});

export { myApp as default };
