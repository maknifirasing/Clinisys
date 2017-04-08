var Users = (function () {
    function Users() {
    }
    Users.prototype.getmatricule = function () {
        return this._matricule;
    };
    Users.prototype.setmatricule = function (value) {
        this._matricule = value;
    };
    Users.prototype.getpassWord = function () {
        return this._passWord;
    };
    Users.prototype.setpassWord = function (value) {
        this._passWord = value;
    };
    Users.prototype.getuserName = function () {
        return this._userName;
    };
    Users.prototype.setuserName = function (value) {
        this._userName = value;
    };
    Users.prototype.getcodeClinique = function () {
        return this._codeClinique;
    };
    Users.prototype.setcodeClinique = function (value) {
        this._codeClinique = value;
    };
    return Users;
}());
export { Users };
//# sourceMappingURL=Users.js.map