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
    $.__views.__alloyId13 = Ti.UI.createLabel({
        text: "Sci-Fi",
        id: "__alloyId13"
    });
    $.__views.menuSciFi.add($.__views.__alloyId13);
    $.__views.menuAnimation = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAnimation"
    });
    $.__views.menu.add($.__views.menuAnimation);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        text: "Animation",
        id: "__alloyId14"
    });
    $.__views.menuAnimation.add($.__views.__alloyId14);
    $.__views.menuComedy = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 120,
        id: "menuComedy"
    });
    $.__views.menu.add($.__views.menuComedy);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        text: "Comedy",
        id: "__alloyId15"
    });
    $.__views.menuComedy.add($.__views.__alloyId15);
    $.__views.menuAdvanture = Ti.UI.createView({
        height: 40,
        backgroundColor: "#fff",
        width: 160,
        id: "menuAdvanture"
    });
    $.__views.menu.add($.__views.menuAdvanture);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        text: "Advanture",
        id: "__alloyId16"
    });
    $.__views.menuAdvanture.add($.__views.__alloyId16);
    $.__views.content = Ti.UI.createView({
        backgroundColor: "white",
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
    var __alloyId17 = [];
    $.__views.__alloyId18 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId18"
    });
    __alloyId17.push($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createImageView({
        left: 20,
        width: 22,
        image: "/movie.png",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "My Watchlist",
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId21"
    });
    __alloyId17.push($.__views.__alloyId21);
    $.__views.leftTableIconHot = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconHot",
        image: "/news.png"
    });
    $.__views.__alloyId21.add($.__views.leftTableIconHot);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Whats' hot",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId23"
    });
    __alloyId17.push($.__views.__alloyId23);
    $.__views.leftTableIconGenre = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconGenre",
        image: "/movie.png"
    });
    $.__views.__alloyId23.add($.__views.leftTableIconGenre);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movie Genre",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId25"
    });
    __alloyId17.push($.__views.__alloyId25);
    $.__views.leftTableIconNews = Ti.UI.createImageView({
        left: 20,
        width: 16,
        id: "leftTableIconNews",
        image: "/news.png"
    });
    $.__views.__alloyId25.add($.__views.leftTableIconNews);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Movies News",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId27"
    });
    __alloyId17.push($.__views.__alloyId27);
    $.__views.leftTableIconTicket = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconTicket",
        image: "/ticket.png"
    });
    $.__views.__alloyId27.add($.__views.leftTableIconTicket);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Buy tickets",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#F5A623",
        id: "__alloyId29"
    });
    __alloyId17.push($.__views.__alloyId29);
    $.__views.leftTableIconSetting = Ti.UI.createImageView({
        left: 20,
        width: 22,
        id: "leftTableIconSetting",
        image: "/setting.png"
    });
    $.__views.__alloyId29.add($.__views.leftTableIconSetting);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        color: "white",
        left: 65,
        text: "Settings",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
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
        data: __alloyId17,
        id: "leftTable"
    });
    $.__views.sidebar.add($.__views.leftTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var NappSlideMenu = require("dk.napp.slidemenu");
    var Blur = require("bencoding.blur");
    var Animator = require("com.animecyc.animator");
    var theMovieDb = require("themoviedb");
    var winAnimation = {
        trans3d: Ti.UI.create3DMatrix(),
        animation: Ti.UI.createAnimation()
    };
    var nowPlaying = Alloy.createController("content/nowPlaying");
    var detail = Alloy.createController("detail");
    var window = NappSlideMenu.createSlideMenuWindow({
        centerWindow: $.root,
        leftWindow: $.sidebar,
        leftLedge: 140,
        statusBarStyle: NappSlideMenu.STATUSBAR_WHITE,
        parallaxAmount: .3
    });
    var tempWin = Ti.UI.createWindow({
        backgroundColor: "#4A4A4A",
        width: "100%",
        height: "100%",
        top: "100%"
    });
    theMovieDb.movies.getNowPlaying({}, function(data) {
        var d = JSON.parse(data);
        _.each(d.results, function(result) {
            nowPlaying.paths.push(theMovieDb.common.getImage({
                size: "w500",
                file: result.poster_path
            }));
        });
        var imgView = Blur.createGPUBlurImageView({
            height: "150%",
            width: "150%",
            top: 10,
            image: nowPlaying.paths[0],
            blur: {
                type: Blur.GAUSSIAN_BLUR,
                radiusInPixels: 6
            }
        });
        var posterView = Ti.UI.createImageView({
            width: 170,
            height: 255,
            image: nowPlaying.paths[0],
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
            top: 100
        });
        imgView.add(posterView);
        $.content.add(imgView);
        nowPlaying.addPosters(nowPlaying.paths);
        nowPlaying.layoutCircleView();
        $.content.add(nowPlaying.getView());
    }, function(err) {
        alert(err);
    });
    winAnimation.trans3d.setM34(-0.001);
    winAnimation.animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
    winAnimation.animation.duration = 300;
    $.hamburger.addEventListener("click", function() {
        window.toggleLeftView();
    });
    $.main.addEventListener("click", function() {
        tempWin.add(detail.getView());
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