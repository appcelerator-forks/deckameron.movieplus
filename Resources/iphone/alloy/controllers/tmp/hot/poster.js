function Controller() {
    function calcImageHeightWithFullscreenWidth(width, height) {
        return parseInt(Ti.Platform.displayCaps.platformWidth) / parseInt(width) * height;
    }
    function calcImageWidthWithFullscreenHeight(width, height) {
        return winHeight / parseInt(height) * width;
    }
    function calcProperImageSize(width, height) {
        var h = calcImageHeightWithFullscreenWidth(width, height);
        if (h > winHeight) {
            var w = calcImageWidthWithFullscreenHeight(width, height);
            return {
                width: parseInt(w),
                height: winHeight
            };
        }
        return {
            width: parseInt(Ti.Platform.displayCaps.platformWidth),
            height: parseInt(h)
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tmp/hot/poster";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.movieDetailPosterWrapper = Ti.UI.createView({
        width: 120,
        height: 174,
        shadow: {
            shadowOpacity: .35,
            shadowRadius: 5,
            shadowOffset: {
                x: 0,
                y: 0
            }
        },
        id: "movieDetailPosterWrapper"
    });
    $.__views.movieDetailPosterWrapper && $.addTopLevelView($.__views.movieDetailPosterWrapper);
    $.__views.movieDetailPoster = Ti.UI.createImageView({
        width: 100,
        height: 150,
        id: "movieDetailPoster"
    });
    $.__views.movieDetailPosterWrapper.add($.__views.movieDetailPoster);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var self = this;
    var Animator = require("com.animecyc.animator");
    var winHeight = parseInt(Ti.Platform.displayCaps.platformHeight) - 70;
    self.movieDetailPoster.image = args.url;
    self.movieDetailPoster.addEventListener("touchstart", function() {
        var view = Ti.UI.createImageView({
            image: args.url
        });
        var img = view.toImage();
        var size = calcProperImageSize(img.width, img.height);
        view.width = 120;
        view.height = 174;
        args.win.add(view);
        var trans = Ti.UI.create2DMatrix().translate(0, 0);
        Animator.animate(view, {
            duration: 330,
            width: size.width,
            height: size.height,
            easing: Animator.BACK_OUT,
            transform: trans
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;