const stringLength = require('string-length');
const term = require('window-size');


module.exports = box_model = function() {
    this.content_watch = {};
    this.content_groups = {};
    this.blocks = {};
};


box_model.prototype.computeContentWidth = function(block, width = term.width) {
    return term.width - ( this.blocks[block].border.bl.length + this.blocks[block].border.br.length +
                        this.blocks[block].padding.left + this.blocks[block].padding.right +
                        this.blocks[block].margin.left + this.blocks[block].margin.right );
};


box_model.prototype.draw = function(what) {
    if ( !what )
        return false;

    if (typeof what != Object) {
        // what = {name: what, type: 'block'}
        var tbm = this;

        console.log(this.blocks[what].border.tl +
                    this.repeatStr(this.blocks[what].border.top, term.width - 2) +
                    this.blocks[what].border.tr
                );

        if( this.blocks[what].padding.top != 0 ) {
            for(var t = 0; t < this.blocks[what].padding.top; t++) {
                console.log(tbm.blocks[what].border.left +
                            tbm.repeatStr(' ', term.width - 2) +
                            tbm.blocks[what].border.right
                );
            }
        }

        this.blocks[what].content.forEach(function(line, index) {
            if(index != tbm.blocks[what].content.length - 1) {
                console.log(tbm.blocks[what].border.left +
                            tbm.repeatStr(' ', tbm.blocks[what].padding.left) +
                            line +
                            tbm.repeatStr(' ', tbm.blocks[what].padding.right) +
                            tbm.blocks[what].border.right
                        );
            } else {
                var lineWidth = tbm.computeContentWidth(what);

                console.log(tbm.blocks[what].border.left +
                            tbm.repeatStr(' ', tbm.blocks[what].padding.left) +
                            tbm.pad(line, ' ', lineWidth) +
                            tbm.repeatStr(' ', tbm.blocks[what].padding.right) +
                            tbm.blocks[what].border.right
                        );
            }
        });

        if( this.blocks[what].padding.bottom != 0 ) {
            for(var t = 0; t < this.blocks[what].padding.bottom; t++) {
                console.log(tbm.blocks[what].border.left +
                            tbm.repeatStr(' ', term.width - 2) +
                            tbm.blocks[what].border.right
                );
            }
        }

        console.log(this.blocks[what].border.bl +
                    this.repeatStr(this.blocks[what].border.top, term.width - 2) +
                    this.blocks[what].border.br
                );
    }

    // for(var i = 0; i < this.blocks[what.name])
};


box_model.prototype.update = function(content) {};


box_model.prototype.format = function(block, dim) {
    if( typeof block != 'string' )
        return false;

    var tb = this.blocks[block];

    var contentWidth = this.computeContentWidth(block, dim.width);

    var tempContent = tb.content_raw;

    var index = contentWidth;

    while( tempContent.length > 0 ) {
        if(tempContent.length <= contentWidth) {
            tb.content.push(tempContent);
            tempContent = "";
        } else {
            tb.content.push(tempContent.substring(0, contentWidth));
            tempContent = tempContent.substring(contentWidth);
        }
    }

    this.blocks[block] = tb;

    return true;
};


box_model.prototype.create = function(blockProps) {
    bname = ( !blockProps.name ) ? "block" + this.blocks.length.toString() : blockProps.name;

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
        padding: {
            top     : 0,
            right   : 0,
            bottom  : 0,
            left    : 0
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

    var bpKeys = Object.keys(blockProps);
    bpKeys.forEach(function(key) {
        temp_block[key] = blockProps[key];
    });

    this.blocks[bname] = temp_block;

    this.format(bname, term);

    return bname;

};



box_model.prototype.content = function(block) {


};



box_model.prototype.repeatStr = function(str, len) {
    var rs = "";
    for(var i = 0; i <len; i++) {
        rs += str;
    }

    return rs;
};

box_model.prototype.pad = function(thing, pad, len) {
    if( len - thing.length == 0 )
        return thing;

    var padding = this.repeatStr( pad, len - thing.length );

    return thing + padding;
};
