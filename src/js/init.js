// dependencies
require('script!jquery');
var Vue = require('vue');
window.Vue = Vue;
var Vuex = require('vuex');
window.Vuex = Vuex;

// cfg 
Vue.config.debug = true;
Vue.config.devtools = true;

//components
require('./vue/app.js');
require('./vue/states.js');
require('./../less/styles.less');

// ready event
$(document).ready(function() {
    console.log('originatePack ready!');
});

//custom code
//
//
//