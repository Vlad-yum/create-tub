window.addEventListener('DOMContentLoaded',function(){
    "use strict";
    let tabs  = require('../js/parts/tabs.js'),
        timer = require('../js/parts/timer.js'),
        form = require('../js/parts/form.js'),
        slider = require('../js/parts/slider.js'),
        calc = require('../js/parts/calc.js'),
        modal  = require('../js/parts/modal.js');

    tabs();
    calc();
    timer();
    form();
    slider();
    modal();


});
