var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Ti.UI.createImageView();

Alloy.Collections.instance("nowPlaying");

var upComing = Alloy.Collections.instance("upComing");

upComing.getList(1, function() {
    var poster_path = this.at(0).getBackdrop();
    alert(poster_path);
}, function(err) {
    alert(err);
});

Alloy.createController("index");