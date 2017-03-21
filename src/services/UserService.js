import { SQLite } from 'ionic-native';
import { Users } from "../models/Users";
var UserService = (function () {
    function UserService() {
        this.verif = false;
    }
    UserService.prototype.verifUser = function (codeClinique) {
        return new Promise(function (res) {
            var db = new SQLite();
            db.openDatabase({
                name: 'clinisys.db',
                location: 'default' // the location field is required
            }).then(function () {
                alert("ee0");
                db.executeSql("select * from Users where codeClinique like '" + codeClinique + "'", []).then(function (result) {
                    alert("ee1");
                    if (result.rows.length === 1) {
                        //  alert("ee 2 1");
                        Promise.resolve(true);
                        return true;
                    }
                    else {
                        //   alert("ee 2 2");
                        Promise.resolve(false);
                        return false;
                    }
                })
                    .catch(function (error) {
                    console.error('Error opening database', error);
                    //     alert('Error 0 Users  ' + error);
                    Promise.resolve(false);
                    return false;
                });
            });
        });
    };
    UserService.prototype.getUser = function (users, codeClinique) {
        var _this = this;
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql("select * from Users where codeClinique like '" + codeClinique + "'", []).then(function (result) {
                alert("rows1 " + result.rows.length);
                if (result.rows.length === 0) {
                    _this._insertUser(users, codeClinique);
                }
                else {
                    _this.user = new Users();
                    _this.user.setactif(result.rows.item(0).actif);
                    _this.user.setchStat(result.rows.item(0).chStat);
                    _this.user.setcodeMedecinInfirmier(result.rows.item(0).codeMedecinInfirmier);
                    _this.user.setcodePin(result.rows.item(0).codePin);
                    _this.user.setdateModPwd(result.rows.item(0).dateModPwd);
                    _this.user.setdernierDateCnx(result.rows.item(0).dernierDateCnx);
                    _this.user.setdescription(result.rows.item(0).description);
                    _this.user.setgrp(result.rows.item(0).grp);
                    _this.user.setmatricule(result.rows.item(0).matricule);
                    _this.user.setnatureUserDS(result.rows.item(0).natureUserDS);
                    _this.user.setoldGrp(result.rows.item(0).oldGrp);
                    _this.user.setpassWord(result.rows.item(0).passWord);
                    _this.user.setuserName(result.rows.item(0).userName);
                    _this.user.setvalidCptRend(result.rows.item(0).validCptRend);
                    _this.user.setvalidPHNuit(result.rows.item(0).validPHNuit);
                }
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 Users  ' + error);
            });
        });
        db.close();
        alert("ee " + this.user.getchStat());
        return this.user;
    };
    UserService.prototype._insertUser = function (users, codeClinique) {
        var db = new SQLite();
        db.openDatabase({
            name: 'clinisys.db',
            location: 'default' // the location field is required
        }).then(function () {
            db.executeSql('insert into Users (actif ,chStat ,codeMedecinInfirmier ,codePin ,dateModPwd ,dernierDateCnx ,description ,grp ,matricule ,natureUserDS ,' +
                'oldGrp ,passWord ,userName ,validCptRend ,validPHNuit,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                users.getactif(),
                users.getchStat(),
                users.getcodeMedecinInfirmier(),
                users.getcodePin(),
                users.getdateModPwd(),
                users.getdernierDateCnx(),
                users.getdescription(),
                users.getgrp(),
                users.getmatricule(),
                users.getnatureUserDS(),
                users.getoldGrp(),
                users.getpassWord(),
                users.getuserName(),
                users.getvalidCptRend(),
                users.getvalidPHNuit(),
                codeClinique
            ]);
            alert("ok ");
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
            db.executeSql("delete from User where codeClinique like '" + codeClinique + "'", [])
                .then(function () {
                alert("Suppression de table User est terminé avec succes");
            })
                .catch(function (error) {
                console.error('Error opening database', error);
                alert('Error 1 User  ' + error);
            });
        });
        db.close();
        return this.user;
    };
    return UserService;
}());
export { UserService };
//# sourceMappingURL=UserService.js.map