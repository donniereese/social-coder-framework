const stringLength = require('string-length');



module.exports = box_model = function() {
    var content_watch = {};
    var content_groups = {};
    var content_blocks = {};
};



box_model.prototype.draw = function(what) {
    if ( !what )
        return false;

    if (typeof what != Object) {
        // what = {name: what, type: 'block'}

    }

    // for(var i = 0; i < this.content_blocks[what.name])
};



box_model.prototype.update = function() {};



box_model.prototype.create = function(blockProps) {
    bname = ( !blockProps.name ) ? "block" + content_blocks.length.toString() : blockProps.name;

    temp_block = {
        parent          : 'terminal',
        name            : 'block',
        content         : [],
        content_raw     : "",
        border: {
            tl  : ' ',
            tr  : ' ',
            bl  : ' ',
            br  : ' ',
            top     : ' ',
            right   : ' ',
            bottom  : ' ',
            left    : ' '
        },
        dimensions  : {
            width:  0,
            height: 0
        },
        position    : {
            top     : null,
            right   : null,
            bottom  : null,
            left    : null
        }
    };

    var bpKeys = Object.keys(blockProps);
    bpKeys.forEach(function(key) {
        temp_block[key] = blockProps[key];
    });

    this.content_blocks[bname] = temp_block;

    return bname;

};



box_model.prototype.content = function(block) {


};



box_model.prototype.process_content = function(content) {

};
