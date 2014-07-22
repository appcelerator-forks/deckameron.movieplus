function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addPosters(collection) {
        collection.length && collection.each(function(model) {
            var poster = model.getSmallPoster();
            poster = poster || "default.png";
            collectionView.addItem(poster);
        });
    }
    function initialize() {
        nowPlayingCollection.getList(page, function() {
            var posterImage = this.at(0).getPoster();
            var nowPlayingPoster = Alloy.createController("hot/nowPlayingPoster", {
                posterImage: posterImage
            });
            $.content.add(nowPlayingPoster.getView());
            var self = this;
            setTimeout(function() {
                addPosters(self);
            }, 50);
        }, function(err) {
            alert(err);
        });
        collectionView = circleMenu.createView();
        $.postersWheel.add(collectionView);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hot/nowPlaying";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.nowPlaying = Ti.UI.createView({
        id: "nowPlaying"
    });
    $.__views.nowPlaying && $.addTopLevelView($.__views.nowPlaying);
    $.__views.menu = Ti.UI.createScrollView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: 40,
        layout: "horizontal",
        backgroundColor: "#fff",
        zIndex: 10,
        id: "menu"
    });
    $.__views.nowPlaying.add($.__views.menu);
    $.__views.menuSciFi = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 100,
        id: "menuSciFi"
    });
    $.__views.menu.add($.__views.menuSciFi);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        text: "Sci-Fi",
        id: "__alloyId14"
    });
    $.__views.menuSciFi.add($.__views.__alloyId14);
    $.__views.menuAnimation = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAnimation"
    });
    $.__views.menu.add($.__views.menuAnimation);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        text: "Animation",
        id: "__alloyId15"
    });
    $.__views.menuAnimation.add($.__views.__alloyId15);
    $.__views.menuComedy = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 120,
        id: "menuComedy"
    });
    $.__views.menu.add($.__views.menuComedy);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        text: "Comedy",
        id: "__alloyId16"
    });
    $.__views.menuComedy.add($.__views.__alloyId16);
    $.__views.menuAdvanture = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAdvanture"
    });
    $.__views.menu.add($.__views.menuAdvanture);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        text: "Advanture",
        id: "__alloyId17"
    });
    $.__views.menuAdvanture.add($.__views.__alloyId17);
    $.__views.content = Ti.UI.createView({
        backgroundColor: "white",
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.Platform.displayCaps.platformHeight,
        id: "content"
    });
    $.__views.nowPlaying.add($.__views.content);
    $.__views.postersWheel = Ti.UI.createScrollView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: "30%",
        backgroundColor: "transparent",
        layout: "horizontal",
        bottom: 0,
        zIndex: 10,
        cacheSize: 20,
        id: "postersWheel"
    });
    $.__views.nowPlaying.add($.__views.postersWheel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var collectionView;
    require("bencoding.blur");
    var circleMenu = require("cn.ld.circlemenu");
    var nowPlayingCollection = Alloy.Collections.instance("nowPlaying");
    var page = 1;
    exports.initialize = initialize;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;