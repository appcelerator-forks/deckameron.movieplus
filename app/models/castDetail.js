
var theMovieDb = require('themoviedb');

exports.definition = {
	config: {

		adapter: {
			type: "properties",
			collection_name: "castDetail"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here

			getInfo: function( success, error ) {
				
				var self = this;
				
				theMovieDb.people.getById({
					
					"id": self.id
				
				}, function ( data ) {
					
					data = JSON.parse( data );
					if ( data.id === self.id ) self.set( data );
					else self.clear();
					
					if ( _.isFunction( success ) ) success.call( self );

				}, function ( err ) {
					
					if ( _.isFunction( error ) ) error.call( self, err );

				});
				
			},
			
			getAvatar: function() {
				
				var self = this;
				
				if ( self.has('profile_path') && "" !== self.get('profile_path') ) {
					
					return theMovieDb.common.getImage({ 
								size: 'w500',
								file: self.get('profile_path')
						   });
					
				} else {
					
					return null;
					
				}
				
			},

			getActings: function( success, error ) {
				
				var self = this;
				
				theMovieDb.people.getMovieCredits({
					
					"id": self.id
				
				}, function ( data ) {
					
					data = JSON.parse( data );
					if ( data.id === self.id && data.cast ) self.set( 'actings', data.cast );
					
					if ( _.isFunction( success ) ) success.call( self );

				}, function ( err ) {
					
					if ( _.isFunction( error ) ) error.call( self, err );

				});
				
			},

			getPosters: function() {
				
				var self = this;
				
				if ( self.has('actings') && "" !== self.get('actings') ) {
					
					var posterPaths = [];
					
					_.each( self.get('actings'), function( act ) {
						
						if ( null !== act && null !== act.poster_path && "" !== act.poster_path ) {
							
							var path = theMovieDb.common.getImage({ 
											size: 'w500',
											file: act.poster_path
						   			   });
						   					 
						   	if ( null !== path ) posterPaths.push( path );
							
						}
						
					});
					
					return posterPaths;

				} else return null;
				
			},
			
			getBackdrop: function( idx, success, error ) {
				
				var _idx = 0, self = this;
				
				if ( null !== idx && _.isNumber( idx ) ) _idx = idx;
					
				if ( null !== self.get('actings') && null !== self.get('actings')[ _idx ] ) {
						
					var acting = self.get('actings')[ _idx ],
						_mid = acting.id;
						
					theMovieDb.movies.getImages(
					acting,

					function( data ) {
							
						data = JSON.parse( data );

						if ( data.id === _mid && null !== data.backdrops ) {
								
							if ( null !== data.backdrops[0] && null !== data.backdrops[0].file_path ) {
									
								var backdrop = theMovieDb.common.getImage({ 
									size: 'w500',
									file: data.backdrops[0].file_path
								});  

								if ( _.isFunction( success ) ) success.call( self, backdrop );
								
							} else error.call( self );
								
						} else error.call( self );
								
					}, function() {
							
						error.call( self );
							
					});
						
				} else error.call( self );

			}

		});

		return Model;

	},
	
	
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};