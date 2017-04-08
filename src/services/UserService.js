import { SQLite } from 'ionic-native';
import { Users } from "../models/Users";
var UserService = (function () {
    function UserService() {
        this.users = [];
    }
    //verifUser(): Promise<boolean> {
    //  verifUser(codeClinique, userName, passWord): Promise<boolean> {
    UserService.prototype.verifUser = function (codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select count(*) as sum from Users where codeClinique like '" + codeClinique + "'", []).then(function (result) {
                    //    db.executeSql("select count(*) as sum from Users where userName like '" + userName + "' and passWord like '" + passWord + "'and codeClinique like '" + codeClinique + "'", []).then(result => {
                    //   db.executeSql("select count(*) as sum from Users ", []).then(result => {
                    if (result.rows.item(0).sum > 0) {
                        resolve(true);
                        return true;
                    }
                    else {
                        resolve(false);
                        return false;
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 0 Users  ' + error);
                    resolve(false);
                    return false;
                });
            });
            db.close();
            return _this;
        });
    };
    UserService.prototype.getUser = function (users, codeClinique) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                db.executeSql("select * from Users where codeClinique like '" + codeClinique + "'", []).then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertUser(users);
                        resolve(users[0]);
                    }
                    else {
                        var user;
                        for (var i = 0; i < result.rows.length; i++) {
                            user = new Users();
                            user.setmatricule(result.rows.item(0).matricule);
                            user.setpassWord(result.rows.item(0).passWord);
                            user.setuserName(result.rows.item(0).userName);
                            user.setcodeClinique(result.rows.item(0).codeClinique);
                            _this.users.push(user);
                        }
                        resolve(_this.users[0]);
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    alert('Error 1 Users  ' + error);
                });
            });
            db.close();
            return _this;
        });
    };
    UserService.prototype._insertUser = function (users) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            for (var key in users) {
                if (!users.hasOwnProperty(key)) {
                    continue;
                }
                var user = users[key];
                db.executeSql('insert into Users (matricule ,passWord ,userName ,codeClinique) values (?,?,?,?)', [
                    user.getmatricule(),
                    user.getpassWord(),
                    user.getuserName(),
                    user.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Users ' + error);
        });
        db.close();
    };
    UserService.prototype.deleteUsers = function (codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Users where codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                //     alert("Suppression de table User est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 3 User  ' + error);
            });
        });
        db.close();
        return this.users;
    };
    return UserService;
}());
export { UserService };
//# sourceMappingURL=UserService.js.map