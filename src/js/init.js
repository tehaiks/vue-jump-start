// dependencies
require('script!jquery');
let APP = {};
window.APP = APP

var Vue = require('vue');
window.Vue = Vue;
var Vuex = require('vuex');
window.Vuex = Vuex;

// cfg 
Vue.config.debug = true;
Vue.config.devtools = true;

//components
require('./vue/states.js');
require('./vue/app.js');
require('bulma/css/bulma.css');
require('./../less/styles.less');

// ready event
$(document).ready(function() {
    console.log('webSpring-Vue ready!');
});

//custom code
//
//
//