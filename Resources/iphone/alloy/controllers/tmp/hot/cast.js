function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tmp/hot/cast";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.movieDetailCastWrapper = Ti.UI.createView({
        width: 100,
        height: "100%",
        id: "movieDetailCastWrapper"
    });
    $.__views.movieDetailCastWrapper && $.addTopLevelView($.__views.movieDetailCastWrapper);
    $.__views.movieDetailCastAvatarWrapper = Ti.UI.createView({
        width: 66,
        height: 66,
        borderRadius: 33,
        shadow: {
            shadowOpacity: .35,
            shadowRadius: 5,
            shadowOffset: {
                x: 0,
                y: 0
            }
        },
        top: 20,
        id: "movieDetailCastAvatarWrapper"
    });
    $.__views.movieDetailCastWrapper.add($.__views.movieDetailCastAvatarWrapper);
    $.__views.movieDetailCastAvatar = Ti.UI.createImageView({
        width: 66,
        height: 66,
        top: 0,
        borderRadius: 33,
        id: "movieDetailCastAvatar"
    });
    $.__views.movieDetailCastAvatarWrapper.add($.__views.movieDetailCastAvatar);
    $.__views.movieDetailCastName = Ti.UI.createLabel({
        width: "100%",
        height: 13,
        color: "white",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 12
        },
        bottom: 0,
        id: "movieDetailCastName"
    });
    $.__views.movieDetailCastWrapper.add($.__views.movieDetailCastName);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var self = this;
    var baseImage = Titanium.UI.createImageView({
        image: args.avatar,
        width: 500,
        height: "auto"
    });
    var croppedImage = baseImage.toImage().imageAsCropped({
        width: 500,
        height: 500,
        x: 0,
        y: 0
    });
    self.movieDetailCastAvatar.image = croppedImage;
    self.movieDetailCastName.text = args.name;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;