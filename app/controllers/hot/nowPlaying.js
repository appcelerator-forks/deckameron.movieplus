var args = arguments[0] || {};
var collectionView;
var Blur = require('bencoding.blur');
var nowPlayingCollection = Alloy.Collections.instance('nowPlaying');
var page = 1;

function addPosters( collection ) {

	if ( collection.length ) {
		collection.each(function( model ) {
			var poster = model.getSmallPoster();
			poster = poster || "default.png";
			collectionView.addItem(poster);
		});
	}
	
}

function initialize() {
	nowPlayingCollection.getList(
	page,
	function() { /* success */
		
		var posterImage = this.at(0).getPoster();

        var nowPlayingPoster = Alloy.createController('hot/nowPlayingPoster', {
                posterImage: posterImage
        });
		$.content.add( nowPlayingPoster.getView() );
		var self = this;
		setTimeout(function(){
			addPosters( self );
		}, 50);
		
	}, function( err ) { /* error */
		
		alert( err );

	});
	var circleMenu = require("cn.ld.circlemenu");
	
	collectionView = circleMenu.createView();
	$.postersWheel.add(collectionView);
}
exports.initialize = initialize;