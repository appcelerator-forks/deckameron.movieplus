function Controller() {
    function toDegrees(angle) {
        return 180 * angle / Math.PI;
    }
    function addPosters(posters) {
        posters && _.each(posters, function(path) {
            var postersRow = Ti.UI.createView({
                width: 65,
                height: 92
            });
            var poster = Ti.UI.createImageView({
                image: path,
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
            $.nowPlaying.add(postersRow);
        });
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var radius = 320;
    var angle_gap = Math.PI / 16;
    var skipUnit = 65;
    var visibleRowsNum = 6;
    var paths = [];
    $.nowPlaying.addEventListener("scroll", function() {
        layoutCircleView();
    });
    exports.addPosters = addPosters;
    exports.layoutCircleView = layoutCircleView;
    exports.paths = paths;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;