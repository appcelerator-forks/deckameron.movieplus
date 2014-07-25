var args = arguments[0] || {};
var self = this;

var Blur = require('bencoding.blur');
var Fader = require('alloy/animation');
var RemoteImageView = require('remoteImage');

// Models
var castDetailCollection = Alloy.Collections.instance('castDetail');

$.fg.init({
    columns: 3,
    space: 5,
    gridBackgroundColor: '#4A4A4A',
    itemHeightDelta: 0,
    itemBackgroundColor: '#4A4A4A',
    itemBorderColor: 'transparent',
    itemBorderWidth: 0,
    itemBorderRadius: 0
});


function createCastDetailBiographyContent( content ) {
	
	return Ti.UI.createLabel({
		text: content,
		width: 288,
		height: "auto",
		verticalAlign : Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		top: 42,
		color: "#CFCFCF",
		font: {
			fontSize: 12
		}
	});
	
}

function createCastDetailBiographyContentShowMoreButton() {
	
	return Ti.UI.createButton({
		title: "show more",
		width: "auto",
		height: 12,
		color: "#F5A623",
		tintColor: "#CFCFCF",
		font: {
			fontSize: 12
		},
		right: 14,
		bottom: 15
	});
	
}

function expandCastDetailBiographyContent() {
	
	var castDetailBiographyContent = $.castDetailBiography.children[1];
	var castDetailBiographyContentShowMoreButton = $.castDetailBiography.children[2];
	
	var buttonHeight = parseInt( castDetailBiographyContentShowMoreButton.height );
	var height = parseInt( castDetailBiographyContent.height );
	var origHeight = castDetailBiographyContent.origHeight;
	
	if ( origHeight && origHeight > height ) {
		var diff = origHeight - height - buttonHeight;
				
		Fader.fadeOut( castDetailBiographyContent, 200, function() {
			castDetailBiographyContent.height = origHeight; 
			$.castDetailBiography.height += diff;
				
			setTimeout(function() {
				Fader.fadeIn( castDetailBiographyContent, 100 );
			}, 300);
		});

		castDetailBiographyContentShowMoreButton.hide();
	}
	
}

function createCastDetailCover( image ) {
	
	var h = parseInt( Ti.Platform.displayCaps.platformWidth ) / parseInt( image.width ) * parseInt( image.height );

	return  Blur.createGPUGrayscaleImageView({
        		image: image,
    			width: Ti.Platform.displayCaps.platformWidth,
    			height: h,
    			grayscale: true
			});
	
}

function renderCastDetailCover( model ) {
	
	model.getBackdrop(
	0,
	function( file ) {

		RemoteImageView.load({
			
			filePath: file

		}, function( image ) {
			
        	var castDetailCover = createCastDetailCover( image );

			$.castDetailTable.addParallaxWithView( castDetailCover, parseInt( castDetailCover.height ) - 40, true, "#4A4A4A" );
			
		}, function() {
			
			alert("error get remote image");

		});
	
	}, function() {
		
		alert("error get cast detail movie backdrop!");
		
	});
	
}


function renderCastDetailInfo( model ) {
	
	var croppedImage = Ti.UI.createImageView({ image: model.getAvatar() })
					   .toImage()
					   .imageAsCropped({width:500, height:500, x:0, y:0}); 
	
	$.castDetailAvatar.image = croppedImage;
	
	$.castDetailBirthday.text = model.get('birthday');
	$.castDetailPlace.text = model.get('place_of_birth');

}


function renderCastDetailBiography( model ) {

	var castDetailBiographyContent = createCastDetailBiographyContent( model.get('biography') );
	var castDetailBiographyContentShowMoreButton = null;
	
	// render $.castDetailBiography
	$.castDetailBiography.add( castDetailBiographyContent );
	
	if ( castDetailBiographyContent.getText() 
		&& "" !== castDetailBiographyContent.getText() ) {
			
		var castDetailBiographyContentExpectedHeight = 0;
		var castDetailBiographyContentHeight = 0;
		castDetailBiographyContent.origHeight = castDetailBiographyContent.toImage().height;
			
		if ( castDetailBiographyContent.origHeight > 75 ) {
			
			castDetailBiographyContentExpectedHeight = 75;
			castDetailBiographyContentHeight = castDetailBiographyContentExpectedHeight + 77;
			
			castDetailBiographyContentShowMoreButton = createCastDetailBiographyContentShowMoreButton();
			$.castDetailBiography.add( castDetailBiographyContentShowMoreButton );
			
			castDetailBiographyContentShowMoreButton.addEventListener('click', expandCastDetailBiographyContent);
			
		} else {
			
			castDetailBiographyContentExpectedHeight = castDetailBiographyContent.origHeight;
			castDetailBiographyContentHeight = castDetailBiographyContentExpectedHeight + 60;
			
		}

		castDetailBiographyContent.setHeight( castDetailBiographyContentExpectedHeight );
		$.castDetailBiography.setHeight( castDetailBiographyContentHeight );

	} else {
		
		$.castDetailBiography.hide();
		
		castDetailBiographyContent = null;

	}

}


function renderCastDetailActings( model ) {
	
	var items = [];
	var posters = model.getPosters();
	
	if ( posters ) {

		_.each( posters, function( poster ) {
			
    		var view = Ti.UI.createImageView({
    				width: 77,
    				height: 127,
    				image: poster
    		});
    		
    		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS

    		var values = {
        		image: poster
			};

    		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
    		items.push({
        		view: view,
        		data: values
    		});

		});

		//ADD ALL THE ITEMS TO THE GRID
		$.fg.addGridItems(items);

	}

}


Ti.App.addEventListener('cast:detail:open', function( e ) {

	$.castDetailWin.title = e.name;
	
	if ( ! castDetailCollection.get( e.id ) ) {
		
		var castDetailModel = Alloy.createModel('castDetail', {
			id: e.id
		});
	
		castDetailCollection.add( castDetailModel );

		castDetailModel.getActings(
				
		function() {
				
			renderCastDetailCover( this );
			renderCastDetailActings( this );
				
		}, function( err ) {
				
			alert( "get cast actings error: " + err );

		});

		castDetailModel.getInfo(
		function() {
			
			renderCastDetailInfo( this );
			renderCastDetailBiography( this );
			
		}, function( err ) {
		
			alert( "get cast detail error: " + err );
		
		});

	}
	
});
