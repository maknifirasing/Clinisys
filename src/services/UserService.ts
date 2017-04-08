import {SQLite} from 'ionic-native';
import {Users} from "../models/Users";

export class UserService {
  users: Array<Users> = [];

  constructor() {
  }

//verifUser(): Promise<boolean> {
//  verifUser(codeClinique, userName, passWord): Promise<boolean> {
  verifUser(codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from Users where codeClinique like '" + codeClinique + "'", []).then(result => {
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
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 0 Users  ' + error);

            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    })

  }

  public getUser(users: any, codeClinique) {
    return new Promise<Users>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select * from Users where codeClinique like '" + codeClinique + "'", []).then(result => {
          if (result.rows.length === 0) {
            this._insertUser(users);
            resolve(users[0]);
          } else {
            var user;
            for (var i = 0; i < result.rows.length; i++) {
              user = new Users();
              user.setmatricule(result.rows.item(0).matricule);
              user.setpassWord(result.rows.item(0).passWord);
              user.setuserName(result.rows.item(0).userName);
              user.setcodeClinique(result.rows.item(0).codeClinique);
              this.users.push(user);
            }
            resolve(this.users[0]);
          }
        })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1 Users  ' + error);
          })
      });
      db.close();
      return this;
    });
  }

  private _insertUser(users): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in users) {
        if (!users.hasOwnProperty(key)) {
          continue;
        }
        let user = users[key];
        db.executeSql('insert into Users (matricule ,passWord ,userName ,codeClinique) values (?,?,?,?)', [
          user.getmatricule(),
          user.getpassWord(),
          user.getuserName(),
          user.getcodeClinique()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Users ' + error);
    });
    db.close();
  }


  public deleteUsers(codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Users where codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //     alert("Suppression de table User est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 User  ' + error);
        })
    });
    db.close();
    return this.users;
  }
}
