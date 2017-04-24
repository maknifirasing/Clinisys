import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {TraitCourbe} from "../models/TraitCourbe";

export class TraitCourbeService {
  public traitCourbe: Array<TraitCourbe> = [];

  constructor(private sqlite: SQLite)  {
  }

  public verifTraitCourbe(traitCourbes: any, numDoss, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sum from TraitCourbe where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 TraitCourbe  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getTraitCourbes(traitCourbes: any, numDoss, codeClinique): Promise<TraitCourbe[]> {
    return new Promise<TraitCourbe[]>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from TraitCourbe where numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertTraitCourbes(traitCourbes);
            } else {
              var t;
              for (var i = 0; i < result.rows.length; i++) {
                t = new TraitCourbe();
                t.setcodePosologie(result.rows.item(i).codePosologie);
                t.setcodeType(result.rows.item(i).codeType);
                t.setdate(result.rows.item(i).date);
                t.setdesignation(result.rows.item(i).designation);
                t.setheurePrise(result.rows.item(i).heurePrise);
                t.setheureRealisation(result.rows.item(i).heureRealisation);
                t.setnumTraitement(result.rows.item(i).numTraitement);
                t.setordre(result.rows.item(i).ordre);
                t.setquantite(result.rows.item(i).quantite);
                t.setretourn(result.rows.item(i).retourn);
                t.setrow(result.rows.item(i).row);
                t.setnumDoss(result.rows.item(i).numDoss);
                t.setcodeClinique(result.rows.item(i).codeClinique);
                this.traitCourbe.push(t);
              }
              resolve(this.traitCourbe);
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1 TraitCourbe  ' + error);
          })
      });

      return this;
    });
  }

  private _insertTraitCourbes(traitCourbes: Array<TraitCourbe>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in traitCourbes) {
        if (!traitCourbes.hasOwnProperty(key)) {
          continue;
        }
        let traitCourbe = traitCourbes[key];
        db.executeSql('insert into TraitCourbe (codePosologie ,codeType ,date ,designation ,heurePrise ,heureRealisation ,numTraitement ,ordre ,quantite ,retourn ,row ,numDoss ,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          traitCourbe.getcodePosologie(),
          traitCourbe.getcodeType(),
          traitCourbe.getdate(),
          traitCourbe.getdesignation(),
          traitCourbe.getheurePrise(),
          traitCourbe.getheureRealisation(),
          traitCourbe.getnumTraitement(),
          traitCourbe.getordre(),
          traitCourbe.getquantite(),
          traitCourbe.getretourn(),
          traitCourbe.getrow(),
          traitCourbe.getnumDoss(),
          traitCourbe.getcodeClinique()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Traitement ' + error);
    });

  }

  public deleteTraitCourbes(numDoss, codeClinique) {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from TraitCourbe where  numDoss like '" + numDoss + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 TraitCourbe  ' + error);
        })
    });

    return this.traitCourbe;
  }
}
