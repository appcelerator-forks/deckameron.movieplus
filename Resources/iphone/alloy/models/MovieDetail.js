var theMovieDb = require("themoviedb");

exports.definition = {
    config: {
        adapter: {
            type: "properties",
            collection_name: "movieDetail"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            getInfo: function(success, error) {
                var self = this;
                theMovieDb.movies.getById({
                    id: self.id
                }, function(data) {
                    data = JSON.parse(data);
                    data.id === self.id ? self.set(data) : self.clear();
                    _.isFunction(success) && success.call(self);
                }, function(err) {
                    _.isFunction(error) && error.call(self, err);
                });
            },
            getTrailers: function(success, error) {
                var self = this;
                theMovieDb.movies.getTrailers({
                    id: self.id
                }, function(data) {
                    data = JSON.parse(data);
                    data.id === self.id && data.youtube && self.set("trailers", data.youtube);
                    _.isFunction(success) && success.call(self);
                }, function(err) {
                    _.isFunction(error) && error.call(self, err);
                });
            },
            getTrailerUrl: function(id) {
                var self = this;
                if (self.has("trailers")) {
                    var trailers = self.get("trailers");
                    if (_.isArray(trailers)) {
                        if (id && _.isNumber(id)) return trailers[id] && trailers[id].source && "" !== trailers[id].source ? "www.youtube.com/embed/" + trailers[id].source : null;
                        var trailersUrl = [];
                        _.each(trailers, function(trailer) {
                            trailer && trailers.source && "" !== trailers.source && trailersUrl.push("www.youtube.com/embed/" + trailers[id].source);
                        });
                        return trailersUrl;
                    }
                }
                return null;
            },
            getCast: function(success, error) {
                var self = this;
                theMovieDb.movies.getCredits({
                    id: self.id
                }, function(data) {
                    data = JSON.parse(data);
                    data.id === self.id && data.cast && self.set("cast", data.cast);
                    _.isFunction(success) && success.call(self);
                }, function(err) {
                    _.isFunction(error) && error.call(self, err);
                });
            },
            getPosters: function(success, error) {
                var self = this;
                theMovieDb.movies.getImages({
                    id: self.id
                }, function(data) {
                    data = JSON.parse(data);
                    if (data.id === self.id) {
                        self.has("backdrop_path") && "" !== self.get("backdrop_path") || !data.backdrops || self.set("backdrops", data.backdrops);
                        data.posters && self.set("posters", data.posters);
                    }
                    _.isFunction(success) && success.call(self);
                }, function(err) {
                    _.isFunction(error) && error.call(self, err);
                });
            },
            getBackdropPath: function(id) {
                var self = this;
                if (self.has("backdrop_path") && "" !== self.get("backdrop_path")) return theMovieDb.common.getImage({
                    size: "w500",
                    file: self.get("backdrop_path")
                });
                if (self.has("backdrops")) {
                    var backdrops = self.get("backdrops");
                    if (_.isArray(backdrops)) {
                        var _id = id && _.isNumber(id) ? id : 0;
                        return backdrops[_id] && backdrops[_id].file_path && "" !== backdrops[_id].file_path ? theMovieDb.common.getImage({
                            size: "w1000",
                            file: backdrops[_id].file_path
                        }) : null;
                    }
                }
                return null;
            },
            getPosterPath: function(id) {
                var self = this;
                if (self.has("posters")) {
                    var posters = self.get("posters");
                    if (_.isArray(posters)) {
                        var _id = id && _.isNumber(id) ? id : 0;
                        return posters[_id] && posters[_id].file_path && "" !== posters[_id].file_path ? theMovieDb.common.getImage({
                            size: "w500",
                            file: posters[_id].file_path
                        }) : null;
                    }
                }
                return null;
            },
            getCover: function() {
                var self = this;
                if (self.has("poster_path") && "" !== self.get("poster_path")) return theMovieDb.common.getImage({
                    size: "w1000",
                    file: self.get("poster_path")
                });
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("movieDetail", exports.definition, []);

collection = Alloy.C("movieDetail", exports.definition, model);

exports.Model = model;

exports.Collection = collection;