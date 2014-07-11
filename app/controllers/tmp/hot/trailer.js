var args = arguments[0] || {};
var self = this;

self.movieDetailTrailerPlayBtn.hide();
self.movieDetailTrailer.media = args.url;

self.movieDetailTrailer.addEventListener('loadstate', function(e) {
	if ( ( 2 === e.loadState || 3 === e.loadState ) && !self.inited ) {
		self.inited = true;
		self.movieDetailTrailerPlayBtn.show();
	}
});

self.movieDetailTrailerPlayBtn.addEventListener('click', function() {
	self.movieDetailTrailer.setFullscreen( true );
});

self.movieDetailTrailer.addEventListener('fullscreen', function(e) {
	if ( e.entering ) {
		self.movieDetailTrailerPlayBtn.hide();
		self.movieDetailTrailer.play();
		self.movieDetailTrailer.setMediaControlStyle( Ti.Media.VIDEO_CONTROL_VOLUME_ONLY );
	} else {
		self.movieDetailTrailer.setMediaControlStyle( Ti.Media.VIDEO_CONTROL_HIDDEN );
		self.movieDetailTrailer.pause();
		self.movieDetailTrailerPlayBtn.show();
	}
});

self.movieDetailTrailer.addEventListener('complete', function(e) {
	self.movieDetailTrailer.setMediaControlStyle( Ti.Media.VIDEO_CONTROL_HIDDEN );
	self.movieDetailTrailer.setFullscreen( false );
});
