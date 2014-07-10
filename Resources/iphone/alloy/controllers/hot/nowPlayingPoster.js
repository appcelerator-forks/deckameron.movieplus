function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hot/nowPlayingPoster";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.posterBlurBg = require("bencoding.blur").createGPUBlurImageView({
        height: "150%",
        width: "150%",
        top: 10,
        id: "posterBlurBg",
        ns: "require('bencoding.blur')"
    });
    $.__views.posterBlurBg && $.addTopLevelView($.__views.posterBlurBg);
    $.__views.posterImage = Ti.UI.createView({
        width: 170,
        height: 255,
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
        top: 130,
        id: "posterImage"
    });
    $.__views.posterBlurBg.add($.__views.posterImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var posterImage = args.posterImage;
    var nowPlayingCollection = Alloy.Collections.instance("nowPlaying");
    var Blur = require("bencoding.blur");
    var i = 0;
    $.posterBlurBg.image = posterImage;
    $.posterBlurBg.blur = {
        type: Blur.GAUSSIAN_BLUR,
        radiusInPixels: 5
    };
    $.posterImage.backgroundImage = posterImage;
    $.posterImage.addEventListener("click", function() {
        18 > i ? Ti.App.fireEvent("hot:movie:prepare:open", {
            id: nowPlayingCollection.at(i++).id
        }) : i = 0;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;