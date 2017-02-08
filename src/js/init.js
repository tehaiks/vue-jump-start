// jquery
require('script!jquery');

// Global Variables
let APP = {};
window.APP = APP;

// Components
require('./vuex/store.js');
require('./app.js');

// Styles
require('bulma/css/bulma.css');
require('./../less/styles.less');

// Eeady event
$(document).ready(function() {
    // console.log('ready!');
});

// Custom code
//
//