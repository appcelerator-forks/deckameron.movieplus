
var theMovieDb = require('themoviedb');

exports.definition = {
	config: {
		adapter: {
			type: "properties",
			collection_name: "upComing"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			
			getBackdrop: function() {
				var self = this;
				return theMovieDb.common.getImage({ 
						size: 'w500',
						file: self.get('backdrop_path')
				});
			},

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
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			getList: function( page, success, error ) {
				
				var self = this;
				page = ( _.isNumber(page) && page >= 1 && page <= 1000 ) ? 1 : page;

                // fetching list of up coming movies from tmdb.
                theMovieDb.movies.getUpcoming({
                	
                	page: page
                	
                }, function( data ) {

					var d = JSON.parse( data ).results;
					self.add(d);
					
					if ( _.isFunction( success ) ) success.call( self );

                }, function( err ) {
                	
					if ( _.isFunction( error ) ) error( self, err );

                });
			}
		});

		return Collection;
	}
};