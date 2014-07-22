var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

require("com.logicdesign.TiParallaxTableViewHeader");

Array.prototype.insert = function(index) {
    index = Math.min(index, this.length);
    arguments.length > 1 && this.splice.apply(this, [ index, 0 ].concat([].pop.call(arguments))) && this.insert.apply(this, arguments);
    return this;
};

Array.prototype.prepend = function() {
    var args = [ 0 ];
    for (var i = 0; arguments.length > i; i++) args.push(arguments[i]);
    return this.insert.apply(this, args);
};

Array.prototype.append = function() {
    var args = [ this.length ];
    for (var i = 0; arguments.length > i; i++) args.push(arguments[i]);
    return this.insert.apply(this, args);
};

Ti.UI.createImageView();

Alloy.Collections.instance("nowPlaying");

Alloy.Collections.instance("upComing");

Alloy.Collections.instance("movieDetail");

Alloy.Collections.instance("castDetail");

Alloy.createController("index");