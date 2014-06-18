
var NappSlideMenu = require('dk.napp.slidemenu');
var Blur = require('bencoding.blur');
var Animator = require('com.animecyc.animator');
var theMovieDb = require('themoviedb');
// var Fade = require('alloy/animation');
var winAnimation = {
	trans3d: Ti.UI.create3DMatrix(),
	animation: Ti.UI.createAnimation()
};
var nowPlaying = Alloy.createController('content/nowPlaying');
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

<<<<<<< HEAD
// fetching movie information from tmdb.
theMovieDb.movies.getNowPlaying(
{}, function( data ) {
	var d = JSON.parse( data );
	_.each(d.results, function( result ) {
		nowPlaying.paths.push( theMovieDb.common.getImage({ 
			size: 'w500',
			file: result.poster_path
		}) );
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
	
	imgView.add( posterView );

	$.content.add( imgView );
	nowPlaying.addPosters( nowPlaying.paths );
	nowPlaying.layoutCircleView();
	$.content.add( nowPlaying.getView() );

}, function( err ) {
	alert( err );
});
=======
$.content.add(imgView);
$.content.add( posters.getView() );
>>>>>>> FETCH_HEAD

winAnimation.trans3d.setM34( 1.0 / -1000 );
winAnimation.animation.curve = Ti.UI.ANIMATION_CURVE_EASE_OUT;
winAnimation.animation.duration = 300;

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
