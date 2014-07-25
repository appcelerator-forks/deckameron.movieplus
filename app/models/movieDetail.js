

var theMovieDb = require('themoviedb');

exports.definition = {
	config: {
		adapter: {
			type: "properties",
			collection_name: "movieDetail"
		}
	},

	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			
			getInfo: function( success, error ) {
				
				var self = this;
				
				theMovieDb.movies.getById({
					
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
			
			getTrailers: function( success, error ) {
				
				var self = this;
				
				theMovieDb.movies.getTrailers({
					
					"id": self.id
					
				}, function( data ) {
					
					data = JSON.parse( data );
					if ( data.id === self.id && data.youtube ) self.set( 'trailers', data.youtube );

					if ( _.isFunction( success ) ) success.call( self );
					
				}, function( err ) {
					
					if ( _.isFunction( error ) ) error.call( self, err );
					
				});
			},
			
			getTrailerUrl: function( id ) {
				
				var self = this;
				
				if ( self.has( 'trailers' ) ) {

					var trailers = self.get( 'trailers' ); 
					
					if ( _.isArray( trailers ) ) {
						
						if ( id && _.isNumber( id ) ) {
							return ( trailers[id] && trailers[id].source && "" !== trailers[id].source ) ? ( "www.youtube.com/embed/" + trailers[id].source ) : null;
						} else {
							// return url of all trailers as an array
							var trailersUrl = [];
							_.each(trailers, function( trailer ) {
								if ( trailer && trailer.source && "" !== trailer.source ) trailersUrl.push( "www.youtube.com/embed/" + trailer.source );
							});
							return trailersUrl;
						}

					} 
					
				}
				
				return null;
			},
			
			getCasts: function( success, error ) {
				
				var self = this;
				
				theMovieDb.movies.getCredits({
					
					"id": self.id
					
				}, function( data ) {
					
					data = JSON.parse( data );
					if ( data.id === self.id && data.cast ) self.set( 'casts', data.cast );

					if ( _.isFunction( success ) ) success.call( self );
					
				}, function( err ) {
					
					if ( _.isFunction( error ) ) error.call( self, err );
					
				});
			},
			
			getPosters: function( success, error ) {
				
				var self = this;
				
				theMovieDb.movies.getImages({
					
					"id": self.id
					
				}, function( data ) {
					
					data = JSON.parse( data );

					if ( data.id === self.id ) {

						if ( ( !self.has('backdrop_path')
							 || "" === self.get('backdrop_path') )
						     && data.backdrops ) {
						     	
						     	self.set( 'backdrops', data.backdrops );
						     	
						}
						
						if ( data.posters ) self.set( 'posters', data.posters );
						
					}

					if ( _.isFunction( success ) ) success.call( self );
					
				}, function( err ) {
					
					if ( _.isFunction( error ) ) error.call( self, err );
					
				});
			},
			
			
			getBackdropPath: function( id ) {
				
				var self = this;
				
				if ( self.has('backdrop_path') && "" !== self.get('backdrop_path') ) {
					
					return theMovieDb.common.getImage({ 
						size: 'w500',
						file: self.get('backdrop_path')
					});
					
				} else if ( self.has('backdrops') ) {
					
					var backdrops = self.get('backdrops');
					
					if ( _.isArray( backdrops ) ) {
						
						var _id = ( undefined !== id && _.isNumber( id ) ) ? id : 0;

						return ( backdrops[_id] && backdrops[_id].file_path && "" !== backdrops[_id].file_path ) ? 
							theMovieDb.common.getImage({ 
								size: 'w1000',
								file: backdrops[_id].file_path
							}) : null;

					}
					
				}
				
				return null;
				
			},
			
			getPosterPath: function( id ) {
				
				var self = this;

				if ( self.has('posters') ) {
					
					var posters = self.get('posters');
					
					if ( _.isArray( posters ) ) {
						
						if ( undefined !== id && _.isNumber( id ) ) {
							
							return ( posters[id] && posters[id].file_path ) ? 
							theMovieDb.common.getImage({ 
								size: 'w500',
								file: posters[id].file_path
							}) : null;
							
						} else {
							
							var folder = [];
							
							_.each(posters, function( poster ) {
								if ( poster && poster.file_path ) {
									var file = theMovieDb.common.getImage({ 
											size: 'w500',
											file: poster.file_path
									});  
									folder.push( file );
								}	
							});
							
							return folder;
							
						}
						
					}
					
				}
				
				return null;
				
			},
			
			getCover: function( id ) {
				
				var self = this;
				
				if ( self.has('poster_path') ) {
					
					return theMovieDb.common.getImage({ 
						size: 'w1000',
						file: self.get('poster_path')
					});
					
				}
				
				return null;
			},

			
			getCastAvatars: function( id ) {
				
				var self = this;
				
				if ( self.has('casts') ) {
					
					var casts = self.get('casts');
					
					if ( _.isArray( casts ) ) {
						
						if ( undefined !== id && _.isNumber( id ) ) {
							
							return ( casts[id] && casts[id].profile_path ) ? 
							theMovieDb.common.getImage({ 
								size: 'w500',
								file: casts[id].profile_path
							}) : null;
							
						} else {
							
							var avatars = [];
							
							_.each(casts, function( cast ) {
								if ( cast && cast.profile_path ) {
									var profile = theMovieDb.common.getImage({ 
											size: 'w500',
											file: cast.profile_path
									});  
									avatars.push( profile );
								}	
							});
							
							return avatars;
							
						}
						
					}
					
				}
				
				return null;
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