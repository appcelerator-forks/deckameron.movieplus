var args = arguments[0] || {};

var Animator = require('com.animecyc.animator');
var Fader = require('alloy/animation');

// Models
var movieDetailCollection = Alloy.Collections.instance('movieDetail');

// Controllers
var movieDetailTrailersController = null;
var movieDetailCastsController = null;
var movieDetailPostersController = null;

// model id
var id = null;

var currentPoster = {
	page: -1,
	area: -1
};
var posterBackFrame = {
	width: 100,
	height: 150,
	left: 0,
	top: 0
};

var movieDetailBtnClose = Ti.UI.createButton({
	backgroundImage: "/movieDetailBtnClose.png",
	width: 16.5,
	height: 16.5
});

var movieDetailBtnClosePosterPreview = Ti.UI.createButton({
	backgroundImage: "/back.png",
	width: 10,
	height: 19
});

$.movieDetailWin.setLeftNavButton( movieDetailBtnClose );

$.tmpNav.height = Ti.Platform.displayCaps.platformHeight - 69;
// $.posterPreviewCover.height = $.tmpNav.height;
$.posterPreviewCover.hide();

function createMovieDetailCover( image ) {
	
	var cover = Ti.UI.createImageView({
		image: image
	});
	
	var coverImg = cover.toImage();
	
	var h = parseInt( Ti.Platform.displayCaps.platformWidth ) / parseInt( coverImg.width ) * parseInt( coverImg.height );
	
	return Ti.UI.createImageView({
		width: Ti.Platform.displayCaps.platformWidth,
		height: h,
		image: image
	});

}

function createMovieDetailOverviewContent( content ) {
	
	var content = Ti.UI.createLabel({
		text: content,
		width: 288,
		height: "auto",
		verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		top: 20,
		color: "#CFCFCF",
		font: {
			fontSize: 12
		}
	});
	
	return content;
	
}

function createMovieDetailOverviewContentShowMoreButton() {
	
	return Ti.UI.createButton({
		title: "show more",
		width: "auto",
		height: 12,
		color: "#F5A623",
		tintColor: "#CFCFCF",
		font: {
			fontSize: 12
		},
		right: 34,
		bottom: 15
	});
	
}

function expandMovieDetailOverviewContent() {
	
	var movieDetailOverviewContent = $.movieDetailOverview.children[1];
	var movieDetailOverviewContentShowMoreButton = $.movieDetailOverview.children[2];
	
	var buttonHeight = parseInt( movieDetailOverviewContentShowMoreButton.height );
	var height = parseInt( movieDetailOverviewContent.height );
	var origHeight = movieDetailOverviewContent.origHeight;
	
	if ( origHeight && origHeight > height ) {
		var diff = origHeight - height - buttonHeight - 10;
		if ( diff > 0 ) {
				
			Fader.fadeOut( movieDetailOverviewContent, 200, function(){
				movieDetailOverviewContent.height = origHeight; 
				$.movieDetailOverview.height += diff;
				
				setTimeout(function() {
					Fader.fadeIn( movieDetailOverviewContent, 100 );
				}, 300);
			});

			movieDetailOverviewContentShowMoreButton.hide();
		}
	}
	
}

function posterPreviewScrollingCallback( e ) {
	
	$.movieDetailWin.title = ( e.currentPage + 1 ) + ' / ' + e.source.views.length;

	calcPostersScrollViewPosBasedOnPreviewerCurrentPage( e.source );;
	
}


function renderMovieDetailTrailers( trailersUrl ) {
	
	var views = [];
	movieDetailTrailersController = [];
	
	if ( trailersUrl && _.isArray( trailersUrl ) ) {
					
		_.each(trailersUrl, function( url ) {
						
			var _movieDetailTrailerController = Alloy.createController('tmp/hot/trailer', {
				url: url
			});
						
			views.push( _movieDetailTrailerController.getView() );
			movieDetailTrailersController.push( _movieDetailTrailerController ); 
						
		});
		
		$.movieDetailTrailersScrollView.add( views );			
	}
}


function renderMovieDetailCasts( model ) {
	
	var views = [];
	var casts = model.get('casts');
	movieDetailCastsController = [];
	
	if ( casts && _.isArray( casts ) ) {
					
		_.each(casts, function( cast, i ) {
						
			var _movieDetailCastController = Alloy.createController('tmp/hot/cast', {
				avatar: model.getCastAvatars( i ),
				name: cast.name
			});
						
			views.push( _movieDetailCastController.getView() );
			movieDetailCastsController.push( _movieDetailCastController ); 
						
		});
		
		$.movieDetailCastsScrollView.add( views );			
	}
}


function renderMovieDetailPosters( postersUrl ) {

	var views = [];
	movieDetailPostersController = [];
	
	if ( postersUrl && _.isArray( postersUrl ) ) {
		
		var posterPreview = Ti.UI.createScrollableView({
			showPagingControl: false,
			width: "100%",
			height: "100%",
			backgroundColor: "transparent"
		});
		
		posterPreview.hide();
		
		$.posterPreviewCover.add( posterPreview );
		
		posterPreview.addEventListener('scroll', posterPreviewScrollingCallback);
					
		_.each(postersUrl, function( url, i ) {
						
			var _movieDetailPosterController = Alloy.createController('tmp/hot/poster', {
				id: i,
				url: url,
				previewCover: $.posterPreviewCover
			});
			
			views.push( _movieDetailPosterController.getView() );
			movieDetailPostersController.push( _movieDetailPosterController ); 
						
		});
		
		$.movieDetailPostersScrollView.add( views );			
	}
}

function renderMovieDetail( model ) {

	var movieDetailCover = createMovieDetailCover( model.getBackdropPath() );
	var movieDetailOverviewContent = createMovieDetailOverviewContent( model.get('overview') );
	var movieDetailOverviewContentShowMoreButton = null;
	
	$.movieDetailWin.setTitle( model.get('title') );
	$.movieDetailTable.addParallaxWithView( movieDetailCover, parseInt( movieDetailCover.height ) - 40, true, "#4A4A4A");
	$.movieDetailOverviewTitle.hide();
	
	// render $.movieDetailOverviewContent
	$.movieDetailOverview.add( movieDetailOverviewContent );

	// render $.movieDetailRating
	$.movieDetailRatingNumber.setText( parseFloat( model.get('vote_average') ).toFixed( 1 ) );

	/*[IMPORTANT]
	 * navigation window MUST be opened after all views being added.
	 */
	$.tmpNav.open();
	
	if ( movieDetailOverviewContent.getText() 
		&& "" !== movieDetailOverviewContent.getText() ) {
			
		var movieDetailOverviewContentExpectedHeight = 0;
		var movieDetailOverviewHeight = 0;
		movieDetailOverviewContent.origHeight = movieDetailOverviewContent.toImage().height;
			
		$.movieDetailOverviewTitle.show();
		
		if ( movieDetailOverviewContent.origHeight > 63 ) {
			
			movieDetailOverviewContentExpectedHeight = 63;
			movieDetailOverviewHeight = movieDetailOverviewContentExpectedHeight + 54;
			
			movieDetailOverviewContentShowMoreButton = createMovieDetailOverviewContentShowMoreButton();
			$.movieDetailOverview.add( movieDetailOverviewContentShowMoreButton );
			
			movieDetailOverviewContentShowMoreButton.addEventListener('click', expandMovieDetailOverviewContent);
			
		} else {
			
			movieDetailOverviewContentExpectedHeight = movieDetailOverviewContent.origHeight;
			movieDetailOverviewHeight = movieDetailOverviewContentExpectedHeight + 30;
			
		}

		movieDetailOverviewContent.setHeight( movieDetailOverviewContentExpectedHeight );
		$.movieDetailOverview.setHeight( movieDetailOverviewHeight );

	} else {
		
		$.movieDetailOverviewTitle.hide();
		
		movieDetailOverviewContent = null;

	}
	
	Ti.App.fireEvent('hot:movie:open'); // open the tmpNavWin

}


function calcPostersScrollViewPosBasedOnPreviewerCurrentPage( posterPreview ) {
	
	if ( 0 === currentPoster.area ) {
		
		if ( currentPoster.page === posterPreview.currentPage ) {

			$.movieDetailPostersScrollView.scrollTo( currentPoster.page * 120, 0 );
			// set backpoint
			posterBackFrame.left = 15;
			
		} else if ( ( currentPoster.page + 1 ) === posterPreview.currentPage ) {
			
			$.movieDetailPostersScrollView.scrollTo( currentPoster.page * 120 + 20, 0 );
			// set backpoint
			posterBackFrame.left = 115;
			
		} else if ( ( currentPoster.page + 2 ) === posterPreview.currentPage ) {
			
			$.movieDetailPostersScrollView.scrollTo( currentPoster.page * 120 + 40, 0 );
			// set backpoint
			posterBackFrame.left = 215;

		} else {
			
			if ( posterPreview.currentPage === posterPreview.views.length - 1 ) {
				
				$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 2 ) * 120 + 40, 0 );
				// set backpoint
				posterBackFrame.left = 215;

			} else if ( posterPreview.currentPage === posterPreview.views.length - 2 ) {
				
				$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 1 ) * 120 + 20, 0 );
				// set backpoint
				posterBackFrame.left = 115;

			} else {
				
				$.movieDetailPostersScrollView.scrollTo( posterPreview.currentPage * 120 , 0 );
				// set backpoint
				posterBackFrame.left = 15;

			}
 
		}
		
	} else if ( 1 === currentPoster.area ) {
		
		if ( currentPoster.page === posterPreview.currentPage ) {
			
			$.movieDetailPostersScrollView.scrollTo( ( currentPoster.page - 1 ) * 120 + 20, 0 );
			// set backpoint
			posterBackFrame.left = 115;

		} else if ( ( currentPoster.page + 1 ) === posterPreview.currentPage ) {
			
			$.movieDetailPostersScrollView.scrollTo( ( currentPoster.page - 1 ) * 120 + 40, 0 );
			// set backpoint
			posterBackFrame.left = 215;
			
		} else if ( ( currentPoster.page - 1 ) === posterPreview.currentPage ) {
			
			$.movieDetailPostersScrollView.scrollTo( ( currentPoster.page - 1 ) * 120, 0 );
			// set backpoint
			posterBackFrame.left = 15;

		} else {
			
			if ( posterPreview.currentPage === posterPreview.views.length - 1 ) {
				
				$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 2 ) * 120 + 40, 0 );
				// set backpoint
				posterBackFrame.left = 215;

			} else if ( posterPreview.currentPage === posterPreview.views.length - 2 ) {
				
				$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 1 ) * 120 + 20, 0 );
				// set backpoint
				posterBackFrame.left = 115;

			} else {
				
				$.movieDetailPostersScrollView.scrollTo( posterPreview.currentPage * 120 , 0 );
				// set backpoint
				posterBackFrame.left = 15;

			}

		}
		
	} else if ( 2 === currentPoster.area ) {

		if ( currentPoster.page === posterPreview.currentPage ) {

			$.movieDetailPostersScrollView.scrollTo( ( currentPoster.page - 2 ) * 120 + 40, 0 );
			// set backpoint
			posterBackFrame.left = 215;
			
		} else if ( ( currentPoster.page - 1 ) === posterPreview.currentPage ) {
			
			$.movieDetailPostersScrollView.scrollTo( ( currentPoster.page - 2 ) * 120 + 20, 0 );
			// set backpoint
			posterBackFrame.left = 115;
			
		} else if ( ( currentPoster.page - 2 ) === posterPreview.currentPage ) {
			
			$.movieDetailPostersScrollView.scrollTo( ( currentPoster.page - 2 ) * 120, 0 );
			// set backpoint
			posterBackFrame.left = 15;

		} else {
			
			if ( posterPreview.currentPage === posterPreview.views.length - 1 ) {
				
				$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 2 ) * 120 + 40, 0 );
				// set backpoint
				posterBackFrame.left = 215;

			} else if ( posterPreview.currentPage === posterPreview.views.length - 2 ) {
				
				$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 1 ) * 120 + 20, 0 );
				// set backpoint
				posterBackFrame.left = 115;

			} else {
				
				$.movieDetailPostersScrollView.scrollTo( posterPreview.currentPage * 120 , 0 );
				// set backpoint
				posterBackFrame.left = 15;

			}

		}
		
	} else {

		if ( posterPreview.currentPage === posterPreview.views.length - 1 ) {
				
			$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 2 ) * 120 + 40, 0 );
			// set backpoint
			posterBackFrame.left = 215;

		} else if ( posterPreview.currentPage === posterPreview.views.length - 2 ) {
				
			$.movieDetailPostersScrollView.scrollTo( ( posterPreview.currentPage - 1 ) * 120 + 20, 0 );
			// set backpoint
			posterBackFrame.left = 115;

		} else {
				
			$.movieDetailPostersScrollView.scrollTo( posterPreview.currentPage * 120 , 0 );
			// set backpoint
			posterBackFrame.left = 15;

		}
		
	}

}


function destoryMovieDetail() {
	
	Ti.App.fireEvent('hot:movie:close');

	id = null;

	currentPoster = {
		page: -1,
		area: -1
	};

 	posterBackFrame = {
		width: 100,
		height: 150,
		left: 0,
		top: 0
	};

	var movieDetailOverviewContent = $.movieDetailOverview.children[1];
	var movieDetailOverviewContentShowMoreButton = $.movieDetailOverview.children[2];
	if ( movieDetailOverviewContent ) {
		$.movieDetailOverview.remove( movieDetailOverviewContent );
	}
	if ( movieDetailOverviewContentShowMoreButton ) {
		movieDetailOverviewContentShowMoreButton.removeEventListener('click', expandMovieDetailOverviewContent);
		$.movieDetailOverview.remove( movieDetailOverviewContentShowMoreButton );
	}
	movieDetailOverviewContent = null;
	movieDetailOverviewContentShowMoreButton = null;
	
	$.movieDetailTrailersScrollView.removeAllChildren();
	_.each(movieDetailTrailersController, function( controller ) {
		controller.destroy();
	});

	$.movieDetailCastsScrollView.removeAllChildren();
	_.each(movieDetailCastsController, function( controller ) {
		controller.destroy();
	});
	
	$.movieDetailPostersScrollView.removeAllChildren();
	_.each(movieDetailPostersController, function( controller ) {
		controller.destroy();
	});
	
	var posterPreview = $.posterPreviewCover.children[0];
	_.each(posterPreview.views, function( view ) {
		posterPreview.removeView( view );
	});
	posterPreview.removeEventListener('scroll', posterPreviewScrollingCallback);
	
	$.posterPreviewCover.removeAllChildren();
	$.posterPreviewCover.backgroundColor = "transparent";
	$.posterPreviewCover.hide();

	$.movieDetailWin.setLeftNavButton( movieDetailBtnClose );
	
	movieDetailTrailersController = null;
	movieDetailCastsController = null;
	movieDetailPostersController = null;
	posterPreview = null;
	
}


Ti.App.addEventListener('hot:movie:prepare:open', function( param ) {
		
	id = param.id;

	if ( ! movieDetailCollection.get( id ) ) {
		
		var movieDetailModel = Alloy.createModel('movieDetail', {
			id: id
		});
		
		movieDetailCollection.add( movieDetailModel );

		movieDetailModel.getInfo(
		function() { // 1. get the basic information of a movie
			
			var self = this;

			renderMovieDetail( self );
		
			self.getTrailers(
			function() { // 1.1. get trailers of the movie
				
				renderMovieDetailTrailers( self.getTrailerUrl() );
				
			}, function( err ) {
					
				alert( "get trailers error " + err );

			});

			self.getCasts(
			function() { // 1.2. get cast of the movie
				
				renderMovieDetailCasts( self );
				
			}, function( err ) {
				
				alert( "get cast error " + err );

			});

			self.getPosters(
			function() { // 1.3. get poster of the movie
				
				renderMovieDetailPosters( self.getPosterPath() );
			
			}, function( err ) {
			
				alert( "get posters error " + err );

			});
			
		}, function( err ) {
		
			alert( "get info error " + err );
		
		});
		
	} else {

		renderMovieDetail( movieDetailCollection.get( id ) );
		// renderMovieDetailTrailers( movieDetailCollection.get( id ).getTrailerUrl() );

	}
		
});


Ti.App.addEventListener('hot:movie:open:poster:preview', function( e ) {

	var posterPreview = $.posterPreviewCover.children[0];
	currentPoster.page = posterPreview.getCurrentPage();
	currentPoster.area = e.area;
	posterBackFrame.top = e.top;
	
	Fader.fadeOut( movieDetailBtnClose, 300, function() {
		
		$.movieDetailWin.setLeftNavButton( movieDetailBtnClosePosterPreview );
		
		Fader.fadeOut( movieDetailBtnClosePosterPreview, 1, function() {
			Fader.fadeIn( movieDetailBtnClosePosterPreview, 300 );
		});

	});
	
	$.movieDetailWin.title = ( currentPoster.page + 1 ) + ' / ' + posterPreview.views.length;
	
	calcPostersScrollViewPosBasedOnPreviewerCurrentPage( posterPreview );

});


movieDetailBtnClosePosterPreview.addEventListener('touchend', function() {

	var posterPreview = $.posterPreviewCover.children[0];

	Fader.fadeOut( movieDetailBtnClosePosterPreview, 300, function() {
		$.movieDetailWin.setLeftNavButton( movieDetailBtnClose );
		Fader.fadeOut( movieDetailBtnClose, 1, function() {
			Fader.fadeIn( movieDetailBtnClose, 300 );
		});
	});
	
	$.movieDetailWin.title = movieDetailCollection.get( id ).get('title');

	var tmp = Ti.UI.createView( _.clone( posterPreview.views[ parseInt( posterPreview.getCurrentPage() ) ] ) );
	$.posterPreviewCover.add( tmp );
	posterPreview.hide();

	Animator.animate($.posterPreviewCover, {
        duration: 280,
        easing: Animator.EXP_OUT,
        backgroundColor: "transparent"
    });
	
	Animator.animate(tmp, {
        duration: 400,
        easing: Animator.EXP_OUT,
        width: posterBackFrame.width,
        height: posterBackFrame.height,
        left: posterBackFrame.left,
        top: posterBackFrame.top
    }, function() {
    	$.posterPreviewCover.remove( tmp );
    	tmp = null;
    	$.posterPreviewCover.hide();
    });

});

movieDetailBtnClose.addEventListener('touchend', function() {
	destoryMovieDetail();
});

