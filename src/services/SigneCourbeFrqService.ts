import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {SigneCourbe} from "../models/SigneCourbe";

export class SigneCourbeFrqService {
  public signeCourbe: Array<SigneCourbe> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifSigneCourbe(signeCourbes: any, numdoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from SigneCourbeFrq where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
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
            alert('Error 0 SigneCourbeFrq  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getSigneCourbes(signeCourbes: any, numdoss, codeClinique): Promise<SigneCourbe[]> {
    return new Promise<SigneCourbe[]>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from SigneCourbeFrq where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertSigneCourbes(signeCourbes, numdoss, codeClinique);
            } else {
              var signeCourbe;
              for (var i = 0; i < result.rows.length; i++) {
                signeCourbe = new SigneCourbe();
                signeCourbe.setcodePosologie(result.rows.item(i).codePosologie);
                signeCourbe.setdesignation(result.rows.item(i).designation);
                signeCourbe.setseuilMin(result.rows.item(i).seuilMin);
                signeCourbe.setseuilMax(result.rows.item(i).seuilMax);
                signeCourbe.setcolor(result.rows.item(i).color);
                signeCourbe.setunite(result.rows.item(i).unite);
                signeCourbe.setquantite(result.rows.item(i).quantite);
                signeCourbe.setheurePrise(result.rows.item(i).heurePrise);
                signeCourbe.setdateHeurePrise(result.rows.item(i).dateHeurePrise);

                this.signeCourbe.push(signeCourbe);
              }
              resolve(this.signeCourbe);
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1 SigneCourbeFrq  ' + error);
          })
      });

      return this;
    });
  }

  private _insertSigneCourbes(signeCourbes: Array<SigneCourbe>, numdoss, codeClinique): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in signeCourbes) {
        if (!signeCourbes.hasOwnProperty(key)) {
          continue;
        }
        let signeCourbe = signeCourbes[key];
        db.executeSql('insert into SigneCourbeFrq (codePosologie,designation' +
          ',seuilMin,seuilMax,color,unite,quantite,heurePrise,dateHeurePrise,codeClinique,numdoss) values (?,?,?,?,?,?,?,?,?,?,?)', [
          signeCourbe.getcodePosologie(),
          signeCourbe.getdesignation(),
          signeCourbe.getseuilMin(),
          signeCourbe.getseuilMax(),
          signeCourbe.getcolor(),
          signeCourbe.getunite(),
          signeCourbe.getquantite(),
          signeCourbe.getheurePrise(),
          signeCourbe.getdateHeurePrise(),
          codeClinique,
          numdoss
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 SigneCourbeFrq ' + error);
    });

  }

  public deleteSigneCourbes(numdoss, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from SigneCourbeFrq where numdoss like '" + numdoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table signeCourbe est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 SigneCourbeFrq  ' + error);
        })
    });

    return this.signeCourbe;
  }
}
