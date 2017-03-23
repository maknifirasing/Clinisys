import {SQLite} from 'ionic-native';
import {Traitement} from "../models/Traitement";

export class TraitementService {
  public traitement: Array<Traitement> = [];

  constructor() {
  }

  public verifTraitement(traitements: any, numDoss, datefeuille, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let db = new SQLite();
      db.openDatabase({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then(() => {
        db.executeSql("select count(*) as sum from Traitement where numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 Traitement  ' + error);
            resolve(false);
            return false;
          })
      });
      db.close();
      return this;
    });
  }

  public getTraitements(traitements: any, numDoss, datefeuille, codeClinique) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Traitement where numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertTraitements(traitements, datefeuille, codeClinique)
          } else {
            var t;
            for (var i = 0; i < result.rows.length; i++) {
              t = new Traitement();
              t.setcodePosologie(result.rows.item(i).codePosologie);
              t.setdate(result.rows.item(i).date);
              t.setdateFinTrait(result.rows.item(i).dateFinTrait);
              t.setdci(result.rows.item(i).dci);
              t.setdesignation(result.rows.item(i).designation);
              t.setdureEnJour(result.rows.item(i).dureEnJour);
              t.setheure(result.rows.item(i).heure);
              t.setheureDebut(result.rows.item(i).heureDebut);
              t.setjour(result.rows.item(i).jour);
              t.setnbFois(result.rows.item(i).nbFois);
              t.setnumDoss(result.rows.item(i).numDoss);
              t.setnumTraitement(result.rows.item(i).numTraitement);
              t.setnumbon(result.rows.item(i).numbon);
              t.setposologie(result.rows.item(i).posologie);
              t.setprescripteur(result.rows.item(i).prescripteur);
              t.setquantite(result.rows.item(i).quantite);
              t.setunite(result.rows.item(i).unite);
              t.setvitesse(result.rows.item(i).vitesse);
              t.setvoie(result.rows.item(i).voie);
              t.setvolume(result.rows.item(i).volume);
              this.traitement.push(t);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Traitement  ' + error);
        })
    });
    db.close();
    return this.traitement;
  }

  private _insertTraitements(traitements: Array<Traitement>, datefeuille, codeClinique): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in traitements) {
        if (!traitements.hasOwnProperty(key)) {
          continue;
        }
        let traitement = traitements[key];
        db.executeSql('insert into Traitement (codePosologie ,date ,dateFinTrait ,dci ,designation ,dureEnJour ,heure ,heureDebut ,jour ,nbFois ,numDoss ,numTraitement ,numbon ,posologie ,prescripteur ,quantite ,unite ,vitesse ,voie ,volume ,datefeuille,codeClinique) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
          traitement.getcodePosologie(),
          traitement.getdate(),
          traitement.getdateFinTrait(),
          traitement.getdci(),
          traitement.getdesignation(),
          traitement.getdureEnJour(),
          traitement.getheure(),
          traitement.getheureDebut(),
          traitement.getjour(),
          traitement.getnbFois(),
          traitement.getnumDoss(),
          traitement.getnumTraitement(),
          traitement.getnumbon(),
          traitement.getposologie(),
          traitement.getprescripteur(),
          traitement.getquantite(),
          traitement.getunite(),
          traitement.getvitesse(),
          traitement.getvoie(),
          traitement.getvolume(),
          datefeuille,
          codeClinique
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Traitement ' + error);
    });
    db.close();
  }

  public deleteTraitements(numDoss, datefeuille, codeClinique) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Traitement where  numDoss like '" + numDoss + "' and datefeuille like '" + datefeuille + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //   alert("Suppression de table Traitement est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Traitement  ' + error);
        })
    });
    db.close();
    return this.traitement;
  }
}
