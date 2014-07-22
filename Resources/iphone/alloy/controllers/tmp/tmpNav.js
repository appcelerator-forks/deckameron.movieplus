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
    this.__controllerPath = "tmp/tmpNav";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.movieDetailWin = Alloy.createController("tmp/hot/index", {
        id: "movieDetailWin",
        __parentSymbol: __parentSymbol
    });
    $.__views.tmpNav = Ti.UI.iOS.createNavigationWindow({
        backgroundColor: "#4A4A4A",
        width: "100%",
        top: "100%",
        tintColor: "#979797",
        navTintColor: "white",
        window: $.__views.movieDetailWin.getViewEx({
            recurse: true
        }),
        id: "tmpNav"
    });
    $.__views.tmpNav && $.addTopLevelView($.__views.tmpNav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.tmpNav.height = Ti.Platform.displayCaps.platformHeight - 69;
    Ti.App.addEventListener("hot:movie:prepare:open", function() {
        $.tmpNav.open();
    });
    Ti.App.addEventListener("cast:detail:open", function(e) {
        var castDetail = Alloy.createController("tmp/hot/castDetail/index", {
            id: e.id
        });
        $.tmpNav.openWindow(castDetail.getView(), {
            animated: true
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;