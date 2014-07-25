var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

var theMovieDb = require("themoviedb");

exports.definition = {
    config: {
        adapter: {
            type: "properties",
            collection_name: "castDetail"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            getInfo: function(success, error) {
                var self = this;
                theMovieDb.people.getById({
                    id: self.id
                }, function(data) {
                    data = JSON.parse(data);
                    data.id === self.id ? self.set(data) : self.clear();
                    _.isFunction(success) && success.call(self);
                }, function(err) {
                    _.isFunction(error) && error.call(self, err);
                });
            },
            getAvatar: function() {
                var self = this;
                return self.has("profile_path") && "" !== self.get("profile_path") ? theMovieDb.common.getImage({
                    size: "w500",
                    file: self.get("profile_path")
                }) : null;
            },
            getActings: function(success, error) {
                var self = this;
                theMovieDb.people.getMovieCredits({
                    id: self.id
                }, function(data) {
                    data = JSON.parse(data);
                    data.id === self.id && data.cast && self.set("actings", data.cast);
                    _.isFunction(success) && success.call(self);
                }, function(err) {
                    _.isFunction(error) && error.call(self, err);
                });
            },
            getPosters: function() {
                var self = this;
                if (self.has("actings") && "" !== self.get("actings")) {
                    var posterPaths = [];
                    _.each(self.get("actings"), function(act) {
                        if (null !== act && null !== act.poster_path && "" !== act.poster_path) {
                            var path = theMovieDb.common.getImage({
                                size: "w500",
                                file: act.poster_path
                            });
                            null !== path && posterPaths.push(path);
                        }
                    });
                    return posterPaths;
                }
                return null;
            },
            getBackdrop: function(idx, success, error) {
                var _idx = 0, self = this;
                null !== idx && _.isNumber(idx) && (_idx = idx);
                if (null !== self.get("actings") && null !== self.get("actings")[_idx]) {
                    var acting = self.get("actings")[_idx], _mid = acting.id;
                    theMovieDb.movies.getImages(acting, function(data) {
                        data = JSON.parse(data);
                        if (data.id === _mid && null !== data.backdrops) if (null !== data.backdrops[0] && null !== data.backdrops[0].file_path) {
                            var backdrop = theMovieDb.common.getImage({
                                size: "w500",
                                file: data.backdrops[0].file_path
                            });
                            _.isFunction(success) && success.call(self, backdrop);
                        } else error.call(self); else error.call(self);
                    }, function() {
                        error.call(self);
                    });
                } else error.call(self);
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("castDetail", exports.definition, []);

collection = Alloy.C("castDetail", exports.definition, model);

exports.Model = model;

exports.Collection = collection;