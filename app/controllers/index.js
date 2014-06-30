
var NappSlideMenu = require('dk.napp.slidemenu');
var Animator = require('com.animecyc.animator');
// var Fade = require('alloy/animation');
var winAnimation = {
	trans3d: Ti.UI.create3DMatrix(),
	animation: Ti.UI.createAnimation()
};
var nowPlaying = Alloy.createController('hot/nowPlaying');
var detail = Alloy.createController('detail');

var window = NappSlideMenu.createSlideMenuWindow({
	centerWindow: $.root,
	leftWindow: $.sidebar,
	leftLedge: 140,
	statusBarStyle: NappSlideMenu.STATUSBAR_WHITE,
	parallaxAmount: 0.3
});

var tempWin = Ti.UI.createWindow({
    backgroundColor: '#4A4A4A',
    width: "100%",
    height: "100%",
    top: "100%"
});

winAnimation.trans3d.setM34( 1.0 / -1000 );
winAnimation.animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
winAnimation.animation.duration = 300;

nowPlaying.initialize();
$.main.add( nowPlaying.getView() );

$.hamburger.addEventListener('click', function() {
	window.toggleLeftView();
});

$.main.addEventListener('click', function() {
	
	tempWin.add(detail.getView());
    tempWin.open();
	setTimeout(function() {
    	Animator.animate(tempWin, {
        	duration: 430,
        	easing: Animator.EXP_OUT,
        	top: 90
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


tempWin.addEventListener('click', function() {
		
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
