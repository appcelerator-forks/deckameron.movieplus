
// Libs
var NappSlideMenu = require('dk.napp.slidemenu');
var Animator = require('com.animecyc.animator');
var Blur = require('bencoding.blur');
var Fader = require('alloy/animation');

// Controllers
var tmpNavController = Alloy.createController('tmp/tmpNav');
var nowPlayingController = Alloy.createController('hot/nowPlaying');

// Views
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
	// statusBarStyle: NappSlideMenu.STATUSBAR_WHITE,
	parallaxAmount: 0.3,
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

window.add( blurView );

winAnimation.trans3d.setM34( 1.0 / -1000 );
winAnimation.animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
winAnimation.animation.duration = 300;

nowPlayingController.initialize();
$.main.add( nowPlayingController.getView() );

$.hamburger.addEventListener('click', function() {
	window.toggleLeftView();
});

Ti.App.addEventListener('hot:movie:open', function() {
	
	var img = Blur.applyBlurTo({
		view: window,
    	blurLevel: 2, 
    	blurTintColor:"#CCCCCC"
	});
	
	blurView.image = img;
	Fader.fadeIn( blurView, 430 );

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


Ti.App.addEventListener('hot:movie:close', function() {
		
    Animator.animate(tmpNav, {
        duration: 530,
        easing: Animator.EXP_OUT,
        top: 768
    });
    
    Fader.fadeOut( blurView, 330 );
    
    winAnimation.animation.transform = winAnimation.trans3d.translate(0, 0, 0);
    Animator.animate(window, {
        duration: 430,
        easing: Animator.EXP_OUT,
        transform: winAnimation.animation.transform
    });

});

window.addEventListener('didChangeOffset', function(e) {
	// $.leftTable.left += ( e.offset / 50 );
	// Ti.API.info( $.leftTable.left );
	// if ( $.leftTable.left >= 0 ) $.leftTable.left = 0;
	if ( e.offset >= 0 ) {
		// $.leftTable.transform = $.leftTable.trans.translate( e.offset / 4 - 60, 0, 700 - e.offset * 3 );
		$.leftTable.opacity = e.offset / 240;
	}
});

window.open(); //open the app
