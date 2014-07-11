function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.main = Ti.UI.createWindow({
        width: "100%",
        height: "100%",
        translucent: false,
        title: "Hello World",
        barColor: "#4a4a4a",
        backgroundColor: "#4a4a4a",
        id: "main"
    });
    $.__views.hamburger = Ti.UI.createButton({
        backgroundImage: "/hamburger.png",
        width: 16,
        height: 14,
        id: "hamburger"
    });
    $.__views.main.leftNavButton = $.__views.hamburger;
    $.__views.root = Ti.UI.iOS.createNavigationWindow({
        clipMode: Titanium.UI.iOS.CLIP_MODE_DISABLED,
        window: $.__views.main,
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.sidebar = Ti.UI.createWindow({
        backgroundColor: "#2e2e2e",
        id: "sidebar"
    });
    $.__views.sidebar && $.addTopLevelView($.__views.sidebar);
    var __alloyId0 = [];
    $.__views.__alloyId1 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId1"
    });
    __alloyId0.push($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        left: 20,
        width: 22,
        image: "/movie.png",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "My Watchlist",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId4"
    });
    __alloyId0.push($.__views.__alloyId4);
    $.__views.leftTableIconHot = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconHot",
        image: "/news.png"
    });
    $.__views.__alloyId4.add($.__views.leftTableIconHot);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Whats' hot",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId6"
    });
    __alloyId0.push($.__views.__alloyId6);
    $.__views.leftTableIconGenre = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconGenre",
        image: "/movie.png"
    });
    $.__views.__alloyId6.add($.__views.leftTableIconGenre);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movie Genre",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId8"
    });
    __alloyId0.push($.__views.__alloyId8);
    $.__views.leftTableIconNews = Ti.UI.createImageView({
        left: 20,
        width: 16,
        id: "leftTableIconNews",
        image: "/news.png"
    });
    $.__views.__alloyId8.add($.__views.leftTableIconNews);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movies News",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId10"
    });
    __alloyId0.push($.__views.__alloyId10);
    $.__views.leftTableIconTicket = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconTicket",
        image: "/ticket.png"
    });
    $.__views.__alloyId10.add($.__views.leftTableIconTicket);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Buy tickets",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId12"
    });
    __alloyId0.push($.__views.__alloyId12);
    $.__views.leftTableIconSetting = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconSetting",
        image: "/setting.png"
    });
    $.__views.__alloyId12.add($.__views.leftTableIconSetting);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Settings",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.leftTable = Ti.UI.createTableView({
        backgroundColor: "#2e2e2e",
        opacity: 0,
        scrollable: false,
        rowHeight: 70,
        width: 210,
        left: 5,
        top: 30,
        height: 417,
        separatorColor: "#979797",
        data: __alloyId0,
        id: "leftTable"
    });
    $.__views.sidebar.add($.__views.leftTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var NappSlideMenu = require("dk.napp.slidemenu");
    var Animator = require("com.animecyc.animator");
    var Blur = require("bencoding.blur");
    var Fader = require("alloy/animation");
    var tmpNavController = Alloy.createController("tmp/tmpNav");
    var nowPlayingController = Alloy.createController("hot/nowPlaying");
    var tmpNav = tmpNavController.getView();
    var winAnimation = {
        trans3d: Ti.UI.create3DMatrix(),
        trans2d: Ti.UI.create2DMatrix(),
        animation: Ti.UI.createAnimation()
    };
    var window = NappSlideMenu.createSlideMenuWindow({
        centerWindow: $.root,
        leftWindow: $.sidebar,
        leftLedge: 140,
        parallaxAmount: .3,
        clipMode: Titanium.UI.iOS.CLIP_MODE_DISABLED,
        viewShadowRadius: 10,
        viewShadowColor: "#000000",
        viewShadowOffset: {
            x: 0,
            y: 0
        }
    });
    var blurView = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        opacity: 0,
        viewShadowRadius: 10,
        viewShadowColor: "#000000",
        viewShadowOffset: {
            x: 0,
            y: 0
        },
        zIndex: 999,
        clipMode: Titanium.UI.iOS.CLIP_MODE_DISABLED
    });
    window.add(blurView);
    winAnimation.trans3d.setM34(-0.001);
    winAnimation.animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
    winAnimation.animation.duration = 300;
    nowPlayingController.initialize();
    $.main.add(nowPlayingController.getView());
    $.hamburger.addEventListener("click", function() {
        window.toggleLeftView();
    });
    Ti.App.addEventListener("hot:movie:open", function() {
        var img = Blur.applyBlurTo({
            view: window,
            blurLevel: 3,
            blurTintColor: "#BFBFBF"
        });
        blurView.image = img;
        Fader.fadeIn(blurView, 430);
        setTimeout(function() {
            Animator.animate(tmpNav, {
                duration: 530,
                easing: Animator.QUINT_OUT,
                top: 70
            });
        }, 100);
        winAnimation.animation.transform = winAnimation.trans3d.translate(0, 0, -100);
        setTimeout(function() {
            Animator.animate(window, {
                duration: 630,
                easing: Animator.QUINT_OUT,
                transform: winAnimation.animation.transform
            });
        }, 60);
    });
    Ti.App.addEventListener("hot:movie:close", function() {
        Animator.animate(tmpNav, {
            duration: 530,
            easing: Animator.EXP_OUT,
            top: 768
        });
        Fader.fadeOut(blurView, 330);
        winAnimation.animation.transform = winAnimation.trans3d.translate(0, 0, 0);
        Animator.animate(window, {
            duration: 430,
            easing: Animator.EXP_OUT,
            transform: winAnimation.animation.transform
        });
    });
    window.addEventListener("didChangeOffset", function(e) {
        e.offset >= 0 && ($.leftTable.opacity = e.offset / 240);
    });
    window.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;