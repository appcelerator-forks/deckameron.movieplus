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