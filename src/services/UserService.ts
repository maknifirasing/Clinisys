import {SQLite} from 'ionic-native';
import {Users} from "../models/Users";
import {resolveAppNgModuleFromMain} from "@ionic/app-scripts/dist/aot/app-module-resolver";

export class UserService {
  public user: Users;
  verif: boolean = false;
  private dbPromise: Promise<SQLite>;

  constructor() {
  }


  verifUser(){
  return   new Promise(res=>{
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
        alert("ee0");
      db.executeSql('select * from Users', []).then(result => {
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
          .catch(error => {
            console.error('Error opening database', error);
            //     alert('Error 0 Users  ' + error);

            Promise.resolve(false);
            return false;
          })
    })
      })

  }

  public getUser(users: any) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('select * from Users', []).then(result => {
        alert("rows1 " + result.rows.length);
        if (result.rows.length === 0) {
          this._insertUser(users)
        } else {
          this.user = new Users();
          this.user.setactif(result.rows.item(0).actif);
          this.user.setchStat(result.rows.item(0).chStat);
          this.user.setcodeMedecinInfirmier(result.rows.item(0).codeMedecinInfirmier);
          this.user.setcodePin(result.rows.item(0).codePin);
          this.user.setdateModPwd(result.rows.item(0).dateModPwd);
          this.user.setdernierDateCnx(result.rows.item(0).dernierDateCnx);
          this.user.setdescription(result.rows.item(0).description);
          this.user.setgrp(result.rows.item(0).grp);
          this.user.setmatricule(result.rows.item(0).matricule);
          this.user.setnatureUserDS(result.rows.item(0).natureUserDS);
          this.user.setoldGrp(result.rows.item(0).oldGrp);
          this.user.setpassWord(result.rows.item(0).passWord);
          this.user.setuserName(result.rows.item(0).userName);
          this.user.setvalidCptRend(result.rows.item(0).validCptRend);
          this.user.setvalidPHNuit(result.rows.item(0).validPHNuit);
        }
      })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Users  ' + error);
        })
    });
    db.close();
    alert("ee " + this.user.getchStat());
    return this.user;
  }

  private _insertUser(users): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql('insert into Users (actif ,chStat ,codeMedecinInfirmier ,codePin ,dateModPwd ,dernierDateCnx ,description ,grp ,matricule ,natureUserDS ,' +
        'oldGrp ,passWord ,userName ,validCptRend ,validPHNuit) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
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
        users.getvalidPHNuit()
      ]);
      alert("ok ");
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Users ' + error);
    });
    db.close();
  }
}
