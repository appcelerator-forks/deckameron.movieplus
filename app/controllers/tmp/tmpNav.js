var args = arguments[0] || {};

// Models
var movieDetailCollection = Alloy.Collections.instance('movieDetail');

// Controllers
var movieDetailTrailersController = null;
var movieDetailCastsController = null;
var movieDetailPostersController = null;

$.tmpNav.height = Ti.Platform.displayCaps.platformHeight - 69;

function createMovieDetailOverview() {
	
	 return Ti.UI.createView({
		width: "100%",
		height: "auto",
		backgroundGradient: {
        	type: 'linear',
        	startPoint: { 
        		x: 0, 
        		y: 0 
        	},
        	endPoint: { 
        		x: 0, 
        		y: "100%" 
        	},
        	colors: [{ 
        		color: 'transparent', 
        		offset: 0.0
        	}, {
        		color: '#4A4A4A', 
        		offset: 0.67
        	}, { 
        		color: '#4A4A4A', 
        		offset: 1.0 
        	}]
    	},
    	zIndex: 999,
		bottom: 0
	});

}

function createMovieDetailOverviewTitle() {
	
	return Ti.UI.createLabel({
		text: "Story",
		color: '#F5A623',
		width: 288,
		height: "auto",
		top: 80,
		font: {
			fontSize: 14,
			fontWeight: "bold"
		}
	});
	
}

function createMovieDetailOverviewContent( content ) {
	
	return Ti.UI.createLabel({
		text: content,
		width: 288,
		height: "auto",
		verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		top: 100,
		color: "#CFCFCF",
		font: {
			fontSize: 12
		}
	});
	
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

function expandMovieDetailOverviewContent( movieDetailOverviewHeight ) {
	
	var movieDetailOverview = $.movieDetailHeader.children[1];
	var movieDetailOverviewContent = movieDetailOverview.children[1];
	var movieDetailOverviewContentShowMoreButton = movieDetailOverview.children[2];
	
	var buttonHeight = parseInt( movieDetailOverviewContentShowMoreButton.height );
	var height = parseInt( movieDetailOverviewContent.height );
	var actualHeight = movieDetailOverviewContent._actualHeight + 5 /* some breathing space */;
	
	if ( actualHeight && actualHeight > height ) {
		var diff = actualHeight - height - buttonHeight - 8;
		if ( diff > 0 ) {
			movieDetailOverviewContent.height = actualHeight; 
			movieDetailOverview.height += diff;
			$.movieDetailHeader.height += diff;

			movieDetailOverviewContentShowMoreButton.hide();
		}
	}
	
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
					
		_.each(postersUrl, function( url ) {
						
			var _movieDetailPosterController = Alloy.createController('tmp/hot/poster', {
				url: url,
				win: $.movieDetailWin,
				view: $.movieDetailTable
			});
						
			views.push( _movieDetailPosterController.getView() );
			movieDetailPostersController.push( _movieDetailPosterController ); 
						
		});
		
		$.movieDetailPostersScrollView.add( views );			
	}
}

function renderMovieDetail( model ) {

	var movieDetailOverview = createMovieDetailOverview();
	var movieDetailOverviewTitle = createMovieDetailOverviewTitle();
	var movieDetailOverviewContent = createMovieDetailOverviewContent( model.get('overview') );
	var movieDetailOverviewContentShowMoreButton = null;
	
	movieDetailOverview.add( movieDetailOverviewTitle );
	movieDetailOverview.add( movieDetailOverviewContent );
	
	$.movieDetailWin.setTitle( model.get('title') );
	
	// render $.movieDetailHeader
	$.movieDetailCover.setImage( model.getBackdropPath() );
	$.movieDetailHeader.add( movieDetailOverview );
	
	// render $.movieDetailRating
	$.movieDetailRatingNumber.setText( parseFloat( model.get('vote_average') ).toFixed( 1 ) );
	
	
	/*[IMPORTANT]
	 * navigation window MUST be opened after all views being added.
	 */
	$.tmpNav.open();
	
	var movieDetailCoverHeight = parseInt( $.movieDetailCover.height );
	var movieDetailOverviewContentHeight = parseInt( movieDetailOverviewContent.toImage().height );
	var movieDetailOverviewContentExpectedHeight = 0;
	var movieDetailOverviewHeight = 0;

	if ( movieDetailOverviewContent.getText() 
		&& "" !== movieDetailOverviewContent.getText()
		&& movieDetailOverviewContentHeight ) {
			
		movieDetailOverviewContent._actualHeight = movieDetailOverviewContentHeight;
		
		if ( movieDetailOverviewContentHeight > 63 ) {
			
			movieDetailOverviewContentExpectedHeight = 63;
			movieDetailOverviewHeight = movieDetailOverviewContentExpectedHeight + 130;
			
			movieDetailOverviewContentShowMoreButton = createMovieDetailOverviewContentShowMoreButton();
			movieDetailOverview.add( movieDetailOverviewContentShowMoreButton );
			
			movieDetailOverviewContentShowMoreButton.addEventListener('click', expandMovieDetailOverviewContent);
			
		} else {
			
			movieDetailOverviewContentExpectedHeight = movieDetailOverviewContentHeight;
			movieDetailOverviewHeight = movieDetailOverviewContentExpectedHeight + 114;
			
		}

		movieDetailOverviewContent.setHeight( movieDetailOverviewContentExpectedHeight );
		movieDetailOverview.setHeight( movieDetailOverviewHeight );
		$.movieDetailHeader.setHeight( movieDetailCoverHeight + movieDetailOverviewHeight * 0.2 );

	} else {
		
		movieDetailOverview.remove( movieDetailOverviewTitle );
		movieDetailOverview.remove( movieDetailOverviewContent );
		$.movieDetailHeader.remove( movieDetailOverview );
		
		movieDetailOverviewTitle = null;
		movieDetailOverviewContent = null;
		movieDetailOverview = null;

	}
	
	Ti.App.fireEvent('hot:movie:open'); // open the tmpNavWin

}

function destoryMovieDetail() {
	
	var movieDetailOverview = $.movieDetailHeader.children[1];

	Ti.App.fireEvent('hot:movie:close');

	if ( movieDetailOverview ) {
		var movieDetailOverviewContentShowMoreButton = movieDetailOverview.children[2];
		if ( movieDetailOverviewContentShowMoreButton ) {
			movieDetailOverviewContentShowMoreButton.removeEventListener('click', expandMovieDetailOverviewContent);
		}
		movieDetailOverview.removeAllChildren();
		$.movieDetailHeader.remove( movieDetailOverview );
	
		movieDetailOverviewContentShowMoreButton = null;
		movieDetailOverview = null;
	}
	
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
	
	movieDetailTrailersController = null;
	movieDetailCastsController = null;
	movieDetailPostersController = null;
}

Ti.App.addEventListener('hot:movie:prepare:open', function( param ) {
		
	var id = param.id;

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

$.movieDetailBtnClose.addEventListener('click', function() {
	destoryMovieDetail();
});
