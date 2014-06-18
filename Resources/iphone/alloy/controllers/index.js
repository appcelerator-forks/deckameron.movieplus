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
    $.__views.menu = Ti.UI.createScrollView({
        top: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: 40,
        layout: "horizontal",
        backgroundColor: "#fff",
        zIndex: 999,
        id: "menu"
    });
    $.__views.main.add($.__views.menu);
    $.__views.menuSciFi = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 100,
        id: "menuSciFi"
    });
    $.__views.menu.add($.__views.menuSciFi);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        text: "Sci-Fi",
        id: "__alloyId0"
    });
    $.__views.menuSciFi.add($.__views.__alloyId0);
    $.__views.menuAnimation = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAnimation"
    });
    $.__views.menu.add($.__views.menuAnimation);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        text: "Animation",
        id: "__alloyId1"
    });
    $.__views.menuAnimation.add($.__views.__alloyId1);
    $.__views.menuComedy = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 120,
        id: "menuComedy"
    });
    $.__views.menu.add($.__views.menuComedy);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "Comedy",
        id: "__alloyId2"
    });
    $.__views.menuComedy.add($.__views.__alloyId2);
    $.__views.menuAdvanture = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAdvanture"
    });
    $.__views.menu.add($.__views.menuAdvanture);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        text: "Advanture",
        id: "__alloyId3"
    });
    $.__views.menuAdvanture.add($.__views.__alloyId3);
    $.__views.content = Ti.UI.createView({
        backgroundColor: "yellow",
        id: "content"
    });
    $.__views.main.add($.__views.content);
    $.__views.root = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.main,
        id: "root"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.sidebar = Ti.UI.createWindow({
        backgroundColor: "#2e2e2e",
        id: "sidebar"
    });
    $.__views.sidebar && $.addTopLevelView($.__views.sidebar);
    var __alloyId4 = [];
    $.__views.__alloyId5 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId5"
    });
    __alloyId4.push($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createImageView({
        left: 20,
        width: 22,
        image: "/movie.png",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "My Watchlist",
        id: "__alloyId7"
    });
    $.__views.__alloyId5.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId8"
    });
    __alloyId4.push($.__views.__alloyId8);
    $.__views.leftTableIconHot = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconHot",
        image: "/news.png"
    });
    $.__views.__alloyId8.add($.__views.leftTableIconHot);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Whats' hot",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId10"
    });
    __alloyId4.push($.__views.__alloyId10);
    $.__views.leftTableIconGenre = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconGenre",
        image: "/movie.png"
    });
    $.__views.__alloyId10.add($.__views.leftTableIconGenre);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movie Genre",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId12"
    });
    __alloyId4.push($.__views.__alloyId12);
    $.__views.leftTableIconNews = Ti.UI.createImageView({
        left: 20,
        width: 16,
        id: "leftTableIconNews",
        image: "/news.png"
    });
    $.__views.__alloyId12.add($.__views.leftTableIconNews);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movies News",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId14"
    });
    __alloyId4.push($.__views.__alloyId14);
    $.__views.leftTableIconTicket = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconTicket",
        image: "/ticket.png"
    });
    $.__views.__alloyId14.add($.__views.leftTableIconTicket);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Buy tickets",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId16"
    });
    __alloyId4.push($.__views.__alloyId16);
    $.__views.leftTableIconSetting = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconSetting",
        image: "/setting.png"
    });
    $.__views.__alloyId16.add($.__views.leftTableIconSetting);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Settings",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
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
        data: __alloyId4,
        id: "leftTable"
    });
    $.__views.sidebar.add($.__views.leftTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var NappSlideMenu = require("dk.napp.slidemenu");
    var Blur = require("bencoding.blur");
    var Animator = require("com.animecyc.animator");
    var winAnimation = {
        trans3d: Ti.UI.create3DMatrix(),
        animation: Ti.UI.createAnimation()
    };
    var posters = Alloy.createController("content/nowPlaying");
    var imgView = Blur.createGPUBlurImageView({
        height: "150%",
        width: "150%",
        top: 10,
        image: "/poster5.png",
        blur: {
            type: Blur.GAUSSIAN_BLUR,
            radiusInPixels: 4
        }
    });
    var window = NappSlideMenu.createSlideMenuWindow({
        centerWindow: $.root,
        leftWindow: $.sidebar,
        leftLedge: 140,
        statusBarStyle: NappSlideMenu.STATUSBAR_WHITE,
        parallaxAmount: .3
    });
    var tempWin = Ti.UI.createWindow({
        backgroundColor: "black",
        opacity: .95,
        width: "100%",
        height: "100%",
        top: "100%"
    });
    $.content.add(imgView);
    $.content.add(posters.getView());
    winAnimation.trans3d.setM34(-0.001);
    winAnimation.animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
    winAnimation.animation.duration = 300;
    $.hamburger.addEventListener("click", function() {
        window.toggleLeftView();
    });
    $.main.addEventListener("click", function() {
        tempWin.open();
        setTimeout(function() {
            Animator.animate(tempWin, {
                duration: 430,
                easing: Animator.EXP_OUT,
                top: 70
            });
        }, 200);
        winAnimation.animation.transform = winAnimation.trans3d.translate(0, 0, -100);
        setTimeout(function() {
            Animator.animate(window, {
                duration: 630,
                easing: Animator.BACK_OUT,
                transform: winAnimation.animation.transform
            });
        }, 200);
    });
    tempWin.addEventListener("click", function() {
        Animator.animate(tempWin, {
            duration: 530,
            easing: Animator.EXP_OUT,
            top: 768
        }, function() {
            tempWin.close();
        });
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