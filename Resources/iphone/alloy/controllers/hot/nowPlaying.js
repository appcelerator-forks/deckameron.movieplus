function Controller() {
    function toDegrees(angle) {
        return 180 * angle / Math.PI;
    }
    function getAngleAndSkipForXOffset(xOffset) {
        var shift = xOffset % skipUnit;
        skip = parseInt(xOffset / skipUnit);
        var percentage = shift / skipUnit;
        return {
            angle: Math.abs(angle_gap * (1 - percentage)),
            skip: skip
        };
    }
    function layoutCircleView(xOffset) {
        var angleAndSkipForXOffset = getAngleAndSkipForXOffset(xOffset);
        var firstCellAngle = angleAndSkipForXOffset.angle + 5 * angle_gap;
        for (var i = skip; skip + visibleRowsNum > i; i++) {
            var angle = firstCellAngle;
            firstCellAngle += angle_gap;
            var y = radius * Math.sin(angle);
            $.postersWheel.children[i] && $.postersWheel.children[i].setTransform(trans.translate(0, 330 - y, 0).rotate(toDegrees(angle) - 90, 0, 0, 1));
        }
    }
    function addPosters(collection) {
        var posters = [];
        if (collection.length) {
            collection.each(function(model) {
                if (!model.get("isShown")) {
                    var posterRow = Ti.UI.createView({
                        width: 65,
                        height: 92
                    });
                    var poster = Ti.UI.createImageView({
                        image: model.getPoster(),
                        width: 57,
                        height: 84,
                        shadow: {
                            shadowOpacity: .6,
                            shadowRadius: 2,
                            shadowOffset: {
                                x: 0,
                                y: 0
                            }
                        }
                    });
                    posterRow.add(poster);
                    posters.push(posterRow);
                    model.set("isShown", true);
                }
            });
            posters.length && $.postersWheel.add(posters);
            $.postersWheel.setDecelerationRate(Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST);
            isReachTail = true;
        }
    }
    function initialize() {
        $.postersWheel.setDecelerationRate(Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST);
        nowPlayingCollection.getList(page, function() {
            var posterImage = this.at(0).getPoster();
            var nowPlayingPoster = Alloy.createController("hot/nowPlayingPoster", {
                posterImage: posterImage
            });
            $.content.add(nowPlayingPoster.getView());
            addPosters(this);
            layoutCircleView(0);
        }, function(err) {
            alert(err);
        });
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
    require("bencoding.blur");
    var nowPlayingCollection = Alloy.Collections.instance("nowPlaying");
    var radius = 320;
    var angle_gap = Math.PI / 16;
    var skipUnit = 65;
    var visibleRowsNum = 6;
    var skip = 0;
    var isReachTail = false;
    var page = 1;
    var fetchingCompleted = false;
    var trans = Ti.UI.create3DMatrix();
    $.postersWheel.addEventListener("scroll", function(e) {
        if (skip >= nowPlayingCollection.length - 5 && isReachTail) {
            isReachTail = false;
            nowPlayingCollection.getList(++page, function() {
                fetchingCompleted = true;
            }, function(err) {
                alert(err);
            });
        }
        layoutCircleView(e.source.contentOffset.x);
    });
    $.postersWheel.addEventListener("scrollend", function(e) {
        if (fetchingCompleted) {
            fetchingCompleted = false;
            addPosters(nowPlayingCollection);
        }
        var n = Math.floor(e.source.contentOffset.x / 65);
        var delta = e.source.contentOffset.x - 65 * n;
        if (0 === delta) return;
        delta > 32.5 ? $.postersWheel.scrollTo(e.source.contentOffset.x + 65 - delta, 0) : $.postersWheel.scrollTo(e.source.contentOffset.x - delta, 0);
    });
    $.postersWheel.addEventListener("dragend", function(e) {
        if (false === e.decelerate) {
            var n = Math.floor(e.source.contentOffset.x / 65);
            var delta = e.source.contentOffset.x - 65 * n;
            if (0 === delta) return;
            delta > 32.5 ? $.postersWheel.scrollTo(e.source.contentOffset.x + 65 - delta, 0) : $.postersWheel.scrollTo(e.source.contentOffset.x - delta, 0);
        }
    });
    exports.initialize = initialize;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;