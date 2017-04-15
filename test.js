var box_model = require('./box-model.js');

var bm = new box_model;

tb = {
    parent          : 'terminal',
    name            : 'block',
    content         : [],
    content_raw     : "This is some raw content.  It's pretty mundane, but you know how it goes. I don't know if I spelled that right, though.  I might not have.  Who knows. It's pretty mundane.",
    border: {
        tl  : '/',
        tr  : '\\',
        bl  : '\\',
        br  : '/',
        top     : '=',
        right   : '|',
        bottom  : '-',
        left    : '|'
    },
    padding: {
        top     : 2,
        right   : 20,
        bottom  : 6,
        left    : 20
    },
    margin: {
        top     : 0,
        right   : 0,
        bottom  : 0,
        left    : 0
    },
    dimensions  : {
        width:  null,
        height: null
    },
    position    : {
        top     : null,
        right   : null,
        bottom  : null,
        left    : null
    }
};

var ourBlock = bm.create(tb);

bm.draw(ourBlock);
