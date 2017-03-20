import { SQLite } from 'ionic-native';
import { Users } from "../models/Users";
var UserService = (function () {
    function UserService() {
        this.users = [];
    }
    //verifUser(codeClinique,userName,passWord): Promise<boolean> {
    UserService.prototype.verifUser = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                //    db.executeSql("select count(*) as sum from Users where userName like '" + userName + "' and passWord like '" + passWord + "'and codeClinique like '" + codeClinique + "'", []).then(result => {
                db.executeSql("select count(*) as sum from Users ", []).then(function (result) {
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
    // public getUser(users: any,userName, passWord,codeClinique) {
    UserService.prototype.getUser = function (users) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                //   db.executeSql("select * from Users where userName like '" + userName + "' and passWord like '" + passWord + "'and codeClinique like '" + codeClinique + "'", []).then(result => {
                db.executeSql("select * from Users ", []).then(function (result) {
                    if (result.rows.length === 0) {
                        _this._insertUser(users);
                        resolve(users[0]);
                    }
                    else {
                        var user;
                        for (var i = 0; i < result.rows.length; i++) {
                            user = new Users();
                            user.setactif(result.rows.item(0).actif);
                            user.setchStat(result.rows.item(0).chStat);
                            user.setcodeMedecinInfirmier(result.rows.item(0).codeMedecinInfirmier);
                            user.setcodePin(result.rows.item(0).codePin);
                            user.setdateModPwd(result.rows.item(0).dateModPwd);
                            user.setdernierDateCnx(result.rows.item(0).dernierDateCnx);
                            user.setdescription(result.rows.item(0).description);
                            user.setgrp(result.rows.item(0).grp);
                            user.setmatricule(result.rows.item(0).matricule);
                            user.setnatureUserDS(result.rows.item(0).natureUserDS);
                            user.setoldGrp(result.rows.item(0).oldGrp);
                            user.setpassWord(result.rows.item(0).passWord);
                            user.setuserName(result.rows.item(0).userName);
                            user.setvalidCptRend(result.rows.item(0).validCptRend);
                            user.setvalidPHNuit(result.rows.item(0).validPHNuit);
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
                db.executeSql('insert into Users (actif ,chStat ,codeMedecinInfirmier ,codePin ,dateModPwd ,dernierDateCnx ,description ,grp ,matricule ,natureUserDS ,' +
                    'oldGrp ,passWord ,userName ,validCptRend ,validPHNuit,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                    user.getactif(),
                    user.getchStat(),
                    user.getcodeMedecinInfirmier(),
                    user.getcodePin(),
                    user.getdateModPwd(),
                    user.getdernierDateCnx(),
                    user.getdescription(),
                    user.getgrp(),
                    user.getmatricule(),
                    user.getnatureUserDS(),
                    user.getoldGrp(),
                    user.getpassWord(),
                    user.getuserName(),
                    user.getvalidCptRend(),
                    user.getvalidPHNuit(),
                    user.getcodeClinique()
                ]);
            }
        }).catch(function (error) {
            console.error('Error opening database', error);
            alert('Error 2 Users ' + error);
        });
        db.close();
    };
    UserService.prototype.deleteUsers = function () {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("delete from Users ", [])
                .then(function () {
                alert("Suppression de table User est terminé avec succes");
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