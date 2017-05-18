import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Users} from "../models/Users";

export class UserService {
  users: Array<Users> = [];

  constructor(private sqlite: SQLite) {
  }

  verifUser(codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from Users where codeClinique like '" + codeClinique + "'", []).then(result => {
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
            //console.error('Error opening database', error);
             //alert('Error 0 Users  ' + error);

            resolve(false);
            return false;
          })
      });
      return this;
    })

  }

  public getUser(users: any, codeClinique): Promise<Users> {
    return new Promise<Users>(resolve => {
      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from Users where codeClinique like '" + codeClinique + "'", []).then(result => {
          if (result.rows.length === 0) {
            this._insertUser(users);
            resolve(users[0]);
          } else {
            var user;
            for (var i = 0; i < result.rows.length; i++) {
              user = new Users();
              user.setcodePin(result.rows.item(0).codePin);
              user.setpassWord(result.rows.item(0).passWord);
              user.setuserName(result.rows.item(0).userName);
              user.setcodeClinique(result.rows.item(0).codeClinique);
              this.users.push(user);
            }
            resolve(this.users[0]);
          }
        })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 1 Users  ' + error);
          })
      });
      return this;
    });
  }

  public getAllUser(): Promise<Users[]> {
    return new Promise<Users[]>(resolve => {
      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from Users ", []).then(result => {
          if (result.rows.length > 0) {
            var user;
            for (var i = 0; i < result.rows.length; i++) {
              user = new Users();
              user.setcodePin(result.rows.item(i).codePin);
              user.setpassWord(result.rows.item(i).passWord);
              user.setuserName(result.rows.item(i).userName);
              user.setcodeClinique(result.rows.item(i).codeClinique);
              this.users.push(user);
            }
          }
          resolve(this.users);
        })
          .catch(error => {
            //console.error('Error opening database', error);
             alert('Error 1.1 Users  ' + error);
            resolve(this.users);
          })
      });

      return this;
    });
  }

  private _insertUser(users): void {
    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in users) {
        if (!users.hasOwnProperty(key)) {
          continue;
        }
        let user = users[key];
        db.executeSql('insert into Users (codePin,passWord ,userName ,codeClinique) values (?,?,?,?)', [
          user.getcodePin(),
          user.getpassWord(),
          user.getuserName(),
          user.getcodeClinique()
        ]);
      }
    }).catch(error => {
      //console.error('Error opening database', error);
       //alert('Error 2 Users ' + error);
    });
  }

  public deleteUsers(codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("delete from Users where codeClinique like '" + codeClinique + "'", [])
          .then(() => {
            resolve(true);
            return true;
          })
          .catch(error => {
            //console.error('Error opening database', error);
             //alert('Error 3 User  ' + error);
            resolve(false);
            return false;
          })
      });
      return this;
    });
  }
}
