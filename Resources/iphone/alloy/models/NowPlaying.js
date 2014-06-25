var theMovieDb = require("themoviedb");

exports.definition = {
    config: {
        adapter: {
            type: "properties",
            collection_name: "nowPlaying"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            getPoster: function() {
                var self = this;
                return theMovieDb.common.getImage({
                    size: "w500",
                    file: self.get("poster_path")
                });
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            getList: function(page, success, error) {
                var self = this;
                page = _.isNumber(page) && page >= 1 && 1e3 >= page ? 1 : page;
                theMovieDb.movies.getNowPlaying({
                    page: page
                }, function(data) {
                    var d = JSON.parse(data).results;
                    self.add(d);
                    _.isFunction(success) && success.call(self);
                }, function(err) {
                    _.isFunction(error) && error.call(self, err);
                });
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("nowPlaying", exports.definition, []);

collection = Alloy.C("nowPlaying", exports.definition, model);

exports.Model = model;

exports.Collection = collection;