function Controller() {
    function toDegrees(angle) {
        return 180 * angle / Math.PI;
    }
    function getAngleAndSkipForXOffset() {
        var shift = $.nowPlaying.getContentOffset().x % skipUnit;
        var skip = parseInt($.nowPlaying.getContentOffset().x / skipUnit);
        var percentage = shift / skipUnit;
        return {
            angle: Math.abs(angle_gap * (1 - percentage)),
            skip: skip
        };
    }
    function layoutCircleView() {
        var angleAndSkipForXOffset = getAngleAndSkipForXOffset($.nowPlaying.getContentOffset().x);
        var firstCellAngle = angleAndSkipForXOffset.angle + 5 * angle_gap;
        var skip = angleAndSkipForXOffset.skip;
        for (var i = skip; skip + visibleRowsNum > i; i++) {
            var angle = firstCellAngle;
            firstCellAngle += angle_gap;
            var y = radius * Math.sin(angle);
            $.nowPlaying.children[i] && ($.nowPlaying.children[i].transform = $.nowPlaying.children[i].trans.translate(0, 330 - y).rotate(toDegrees(angle) - 90));
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "content/nowPlaying";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.nowPlaying = Ti.UI.createScrollView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: "30%",
        backgroundColor: "transparent",
        layout: "horizontal",
        bottom: 0,
        zIndex: 999,
        id: "nowPlaying"
    });
    $.__views.nowPlaying && $.addTopLevelView($.__views.nowPlaying);
    $.__views.__alloyId18 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId18"
    });
    $.__views.nowPlaying.add($.__views.__alloyId18);
    $.__views.poster1 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster1",
        image: "/poster1.png"
    });
    $.__views.__alloyId18.add($.__views.poster1);
    $.__views.__alloyId19 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId19"
    });
    $.__views.nowPlaying.add($.__views.__alloyId19);
    $.__views.poster2 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster2",
        image: "/poster2.png"
    });
    $.__views.__alloyId19.add($.__views.poster2);
    $.__views.__alloyId20 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId20"
    });
    $.__views.nowPlaying.add($.__views.__alloyId20);
    $.__views.poster3 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster3",
        image: "/poster3.png"
    });
    $.__views.__alloyId20.add($.__views.poster3);
    $.__views.__alloyId21 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId21"
    });
    $.__views.nowPlaying.add($.__views.__alloyId21);
    $.__views.poster4 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster4",
        image: "/poster4.png"
    });
    $.__views.__alloyId21.add($.__views.poster4);
    $.__views.__alloyId22 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId22"
    });
    $.__views.nowPlaying.add($.__views.__alloyId22);
    $.__views.poster5 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster5",
        image: "/poster4.png"
    });
    $.__views.__alloyId22.add($.__views.poster5);
    $.__views.__alloyId23 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId23"
    });
    $.__views.nowPlaying.add($.__views.__alloyId23);
    $.__views.poster6 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster6",
        image: "/poster5.png"
    });
    $.__views.__alloyId23.add($.__views.poster6);
    $.__views.__alloyId24 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId24"
    });
    $.__views.nowPlaying.add($.__views.__alloyId24);
    $.__views.poster7 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster7",
        image: "/poster3.png"
    });
    $.__views.__alloyId24.add($.__views.poster7);
    $.__views.__alloyId25 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId25"
    });
    $.__views.nowPlaying.add($.__views.__alloyId25);
    $.__views.poster8 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster8",
        image: "/poster1.png"
    });
    $.__views.__alloyId25.add($.__views.poster8);
    $.__views.__alloyId26 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId26"
    });
    $.__views.nowPlaying.add($.__views.__alloyId26);
    $.__views.poster9 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster9",
        image: "/poster5.png"
    });
    $.__views.__alloyId26.add($.__views.poster9);
    $.__views.__alloyId27 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId27"
    });
    $.__views.nowPlaying.add($.__views.__alloyId27);
    $.__views.poster10 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster10",
        image: "/poster3.png"
    });
    $.__views.__alloyId27.add($.__views.poster10);
    $.__views.__alloyId28 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId28"
    });
    $.__views.nowPlaying.add($.__views.__alloyId28);
    $.__views.poster11 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster11",
        image: "/poster1.png"
    });
    $.__views.__alloyId28.add($.__views.poster11);
    $.__views.__alloyId29 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId29"
    });
    $.__views.nowPlaying.add($.__views.__alloyId29);
    $.__views.poster12 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster12",
        image: "/poster4.png"
    });
    $.__views.__alloyId29.add($.__views.poster12);
    $.__views.__alloyId30 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId30"
    });
    $.__views.nowPlaying.add($.__views.__alloyId30);
    $.__views.poster13 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster13",
        image: "/poster5.png"
    });
    $.__views.__alloyId30.add($.__views.poster13);
    $.__views.__alloyId31 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId31"
    });
    $.__views.nowPlaying.add($.__views.__alloyId31);
    $.__views.poster14 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster14",
        image: "/poster3.png"
    });
    $.__views.__alloyId31.add($.__views.poster14);
    $.__views.__alloyId32 = Ti.UI.createView({
        width: 65,
        height: 92,
        id: "__alloyId32"
    });
    $.__views.nowPlaying.add($.__views.__alloyId32);
    $.__views.poster15 = Ti.UI.createImageView({
        width: 57,
        height: 84,
        top: 0,
        id: "poster15",
        image: "/poster1.png"
    });
    $.__views.__alloyId32.add($.__views.poster15);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var radius = 320;
    var angle_gap = Math.PI / 16;
    var skipUnit = 65;
    var visibleRowsNum = 6;
    var allPosters = $.nowPlaying.getChildren();
    for (var j = 0; allPosters.length > j; j++) allPosters[j].trans = Ti.UI.create2DMatrix();
    layoutCircleView();
    $.nowPlaying.addEventListener("scroll", function() {
        layoutCircleView();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;