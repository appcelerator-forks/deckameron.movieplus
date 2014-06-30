
var theMovieDb = require('themoviedb');

exports.definition = {
	config: {
		defaults: {
			isShown: false
		},
		adapter: {
			type: "properties",
			collection_name: "nowPlaying"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			
			getPoster: function() {
				var self = this;
				return theMovieDb.common.getImage({ 
						size: 'w500',
						file: self.get('poster_path')
				});
			}
		});

		return Model;
	},
	extendCollection: function( Collection ) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			
			getList: function( page, success, error ) {
				
				var self = this;
				page = ( _.isNumber(page) && page >= 1 && page <= 1000 ) ? page : 1;

                // fetching list of now playing from tmdb.
                theMovieDb.movies.getNowPlaying({
                	
                	page: page
                	
                }, function( data ) {

					var d = JSON.parse( data ).results;
					self.add(d);
					
					if ( _.isFunction( success ) ) success.call( self );

                }, function( err ) {
                	
					if ( _.isFunction( error ) ) error.call( self, err );

                });
			}
			
		});

		return Collection;
	}
};