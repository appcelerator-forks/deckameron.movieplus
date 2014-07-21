function Controller() {
    function addPosters(collection) {
        if (collection.length) {
            collection.each(function(model) {
                collectionView.addItem(model.getPoster());
            });
            isReachTail = true;
        }
    }
    function initialize() {
        nowPlayingCollection.getList(page, function() {
            var posterImage = this.at(0).getPoster();
            var nowPlayingPoster = Alloy.createController("hot/nowPlayingPoster", {
                posterImage: posterImage
            });
            $.content.add(nowPlayingPoster.getView());
            addPosters(this);
        }, function(err) {
            alert(err);
        });
        var circleMenu = require("cn.ld.circlemenu");
        collectionView = circleMenu.createView();
        $.postersWheel.add(collectionView);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hot/nowPlaying";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
    $.__views.postersWheel = Ti.UI.createView({
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
    var nowPlayingCollection = Alloy.Collections.instance("nowPlaying");
    Math.PI / 16;
    var isReachTail = false;
    var page = 1;
    Ti.UI.create3DMatrix();
    exports.initialize = initialize;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;