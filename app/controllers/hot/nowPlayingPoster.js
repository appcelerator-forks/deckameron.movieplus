var args = arguments[0] || {};
var posterImage = args.posterImage;
var nowPlayingCollection = Alloy.Collections.instance('nowPlaying');

var Blur = require('bencoding.blur');
var i = 0;

$.posterBlurBg.image = posterImage;
$.posterBlurBg.blur = {
	type: Blur.GAUSSIAN_BLUR,
	radiusInPixels: 5
};

$.posterImage.backgroundImage = posterImage;

$.posterImage.addEventListener('click', function() {
	
	if ( i < 18 ) {
		Ti.App.fireEvent('hot:movie:prepare:open', {
			id: nowPlayingCollection.at(i++).id
		});
	} else {
		i = 0;
	}

});
