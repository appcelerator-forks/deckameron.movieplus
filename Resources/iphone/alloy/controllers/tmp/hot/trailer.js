function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tmp/hot/trailer";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.movieDetailTrailerWrapper = Ti.UI.createView({
        width: 163,
        height: 107,
        id: "movieDetailTrailerWrapper"
    });
    $.__views.movieDetailTrailerWrapper && $.addTopLevelView($.__views.movieDetailTrailerWrapper);
    $.__views.movieDetailTrailer = Ti.Media.createVideoPlayer({
        width: 150,
        height: 85,
        backgroundColor: "transparent",
        fullscreen: false,
        autoplay: false,
        mediaControlStyle: Ti.Media.VIDEO_CONTROL_HIDDEN,
        sourceType: Ti.Media.VIDEO_SOURCE_TYPE_STREAMING,
        shadow: {
            shadowOpacity: .35,
            shadowRadius: 5,
            shadowOffset: {
                x: 0,
                y: 0
            }
        },
        id: "movieDetailTrailer",
        ns: Ti.Media
    });
    $.__views.movieDetailTrailerWrapper.add($.__views.movieDetailTrailer);
    $.__views.movieDetailTrailerPlayBtn = Ti.UI.createButton({
        width: 28,
        height: 28,
        backgroundImage: "playBtn.png",
        tintColor: "#CFCFCF",
        id: "movieDetailTrailerPlayBtn"
    });
    $.__views.movieDetailTrailerWrapper.add($.__views.movieDetailTrailerPlayBtn);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var self = this;
    self.movieDetailTrailerPlayBtn.hide();
    self.movieDetailTrailer.media = args.url;
    self.movieDetailTrailer.addEventListener("loadstate", function(e) {
        if ((2 === e.loadState || 3 === e.loadState) && !self.inited) {
            self.inited = true;
            self.movieDetailTrailerPlayBtn.show();
        }
    });
    self.movieDetailTrailerPlayBtn.addEventListener("click", function() {
        self.movieDetailTrailer.setFullscreen(true);
    });
    self.movieDetailTrailer.addEventListener("fullscreen", function(e) {
        if (e.entering) {
            self.movieDetailTrailerPlayBtn.hide();
            self.movieDetailTrailer.play();
            self.movieDetailTrailer.setMediaControlStyle(Ti.Media.VIDEO_CONTROL_VOLUME_ONLY);
        } else {
            self.movieDetailTrailer.setMediaControlStyle(Ti.Media.VIDEO_CONTROL_HIDDEN);
            self.movieDetailTrailer.pause();
            self.movieDetailTrailerPlayBtn.show();
        }
    });
    self.movieDetailTrailer.addEventListener("complete", function() {
        self.movieDetailTrailer.setMediaControlStyle(Ti.Media.VIDEO_CONTROL_HIDDEN);
        self.movieDetailTrailer.setFullscreen(false);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;