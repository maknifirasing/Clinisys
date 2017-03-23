var Document = (function () {
    function Document() {
    }
    Document.prototype.geturl = function () {
        return this._url;
    };
    Document.prototype.seturl = function (value) {
        this._url = value;
    };
    Document.prototype.getobserv = function () {
        return this._observ;
    };
    Document.prototype.setobserv = function (value) {
        this._observ = value;
    };
    Document.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    Document.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return Document;
}());
export { Document };
//# sourceMappingURL=Document.js.map