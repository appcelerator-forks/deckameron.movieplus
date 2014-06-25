function Controller() {
    function toDegrees(angle) {
        return 180 * angle / Math.PI;
    }
    function getAngleAndSkipForXOffset() {
        var shift = $.postersWheel.getContentOffset().x % skipUnit;
        var skip = parseInt($.postersWheel.getContentOffset().x / skipUnit);
        var percentage = shift / skipUnit;
        return {
            angle: Math.abs(angle_gap * (1 - percentage)),
            skip: skip
        };
    }
    function layoutCircleView() {
        var angleAndSkipForXOffset = getAngleAndSkipForXOffset($.postersWheel.getContentOffset().x);
        var firstCellAngle = angleAndSkipForXOffset.angle + 5 * angle_gap;
        var skip = angleAndSkipForXOffset.skip;
        for (var i = skip; skip + visibleRowsNum > i; i++) {
            var angle = firstCellAngle;
            firstCellAngle += angle_gap;
            var y = radius * Math.sin(angle);
            $.postersWheel.children[i] && ($.postersWheel.children[i].transform = $.postersWheel.children[i].trans.translate(0, 330 - y).rotate(toDegrees(angle) - 90));
        }
    }
    function addPosters(collection) {
        collection.length && collection.each(function(model) {
            var postersRow = Ti.UI.createView({
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
            postersRow.trans = Ti.UI.create2DMatrix();
            postersRow.add(poster);
            $.postersWheel.add(postersRow);
        });
    }
    function initialize() {
        nowPlayingCollection.getList(1, function() {
            var posterImage = this.at(0).getPoster();
            var imgView = Blur.createGPUBlurImageView({
                height: "150%",
                width: "150%",
                top: 10,
                image: posterImage,
                blur: {
                    type: Blur.GAUSSIAN_BLUR,
                    radiusInPixels: 6
                },
                zIndex: 50
            });
            var posterView = Ti.UI.createImageView({
                id: "poster",
                width: 170,
                height: 255,
                image: posterImage,
                borderWidth: 1,
                borderColor: "#C7C7C7",
                shadow: {
                    shadowOpacity: 1,
                    shadowRadius: 9,
                    shadowOffset: {
                        x: 0,
                        y: 0
                    }
                },
                top: 130
            });
            $.content.add(imgView);
            imgView.add(posterView);
            addPosters(this);
            layoutCircleView();
        }, function(err) {
            alert(err);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "content/nowPlaying";
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
    $.__views.__alloyId27 = Ti.UI.createLabel({
        text: "Sci-Fi",
        id: "__alloyId27"
    });
    $.__views.menuSciFi.add($.__views.__alloyId27);
    $.__views.menuAnimation = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAnimation"
    });
    $.__views.menu.add($.__views.menuAnimation);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        text: "Animation",
        id: "__alloyId28"
    });
    $.__views.menuAnimation.add($.__views.__alloyId28);
    $.__views.menuComedy = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 120,
        id: "menuComedy"
    });
    $.__views.menu.add($.__views.menuComedy);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        text: "Comedy",
        id: "__alloyId29"
    });
    $.__views.menuComedy.add($.__views.__alloyId29);
    $.__views.menuAdvanture = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAdvanture"
    });
    $.__views.menu.add($.__views.menuAdvanture);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        text: "Advanture",
        id: "__alloyId30"
    });
    $.__views.menuAdvanture.add($.__views.__alloyId30);
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
        id: "postersWheel"
    });
    $.__views.nowPlaying.add($.__views.postersWheel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var Blur = require("bencoding.blur");
    var nowPlayingCollection = Alloy.Collections.instance("nowPlaying");
    var radius = 320;
    var angle_gap = Math.PI / 16;
    var skipUnit = 65;
    var visibleRowsNum = 6;
    $.postersWheel.addEventListener("scroll", function() {
        layoutCircleView();
    });
    $.postersWheel.addEventListener("scrollend", function() {
        var n = Math.floor($.postersWheel.contentOffset.x / 65);
        var delta = $.postersWheel.contentOffset.x - 65 * n;
        if (0 === delta) return;
        delta > 32.5 ? $.postersWheel.scrollTo($.postersWheel.contentOffset.x + 65 - delta, 0) : $.postersWheel.scrollTo($.postersWheel.contentOffset.x - delta, 0);
    });
    $.postersWheel.addEventListener("dragend", function(e) {
        if (false === e.decelerate) {
            var n = Math.floor($.postersWheel.contentOffset.x / 65);
            var delta = $.postersWheel.contentOffset.x - 65 * n;
            if (0 === delta) return;
            delta > 32.5 ? $.postersWheel.scrollTo($.postersWheel.contentOffset.x + 65 - delta, 0) : $.postersWheel.scrollTo($.postersWheel.contentOffset.x - delta, 0);
        }
    });
    exports.initialize = initialize;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;