module.exports = {
    _getExtension: function(fn) {
        var re = /(?:\.([^.]+))?$/;
        var tmpext = re.exec(fn)[1];
        return tmpext ? tmpext : "";
    },
    load: function(a, success, error) {
        a = a || {};
        var md5;
        var needsToSave = false;
        var savedFile;
        if (a.filePath) {
            md5 = Ti.Utils.md5HexDigest(a.filePath) + this._getExtension(a.filePath);
            savedFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, md5);
            savedFile.exists() ? success(savedFile) : needsToSave = true;
        }
        if (true === needsToSave) {
            var xhr = Titanium.Network.createHTTPClient();
            xhr.onload = function(e) {
                4 === xhr.readyState ? 200 === xhr.status ? _.isFunction(success) && success(e.source.responseData) : _.isFunction(error) && (xhr.onerror = error) : _.isFunction(error) && (xhr.onerror = error);
            };
            _.isFunction(error) && (xhr.onerror = error);
            xhr.setTimeout(3e4);
            xhr.open("GET", a.filePath);
            xhr.send();
        }
    }
};