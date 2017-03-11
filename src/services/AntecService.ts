import {SQLite} from 'ionic-native';
import {Antec} from "../models/Antec";

export class AntecService {
  public antec: Array<Antec> = [];
  verif: boolean;

  constructor() {
  }

  public verifAntec(antecs: any, idpass) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Antec where idpass like '" + idpass + "'", [])
        .then(result => {
          if (result.rows.length === antecs.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 Antec  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getAntecs(antecs: any, idpass) {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from Antec where idpass like '" + idpass + "'", [])
        .then(result => {
          if (result.rows.length === 0) {
            this._insertAntecs(antecs,idpass);
          } else {
            var an;
            for (var i = 0; i < result.rows.length; i++) {
              an = new Antec();
              an.setcodeAntecedent(result.rows.item(i).codeAntecedent);
              an.setcodeFamille(result.rows.item(i).codeFamille);
              an.setdesignation(result.rows.item(i).designation);
              an.setidDetailAntec(result.rows.item(i).idDetailAntec);
              an.setordre(result.rows.item(i).ordre);
              an.setvisiblePreAnes(result.rows.item(i).visiblePreAnes);
              an.setid(result.rows.item(i).id);
              an.setidentifiant(result.rows.item(i).identifiant);
              an.setnumeroDossier(result.rows.item(i).numeroDossier);
              an.setobservation(result.rows.item(i).observation);
              an.setutilisateurAnt(result.rows.item(i).utilisateurAnt);

              this.antec.push(an);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 Antec  ' + error);
        })
    });
    db.close();
    return this.antec;
  }

  private _insertAntecs(antecs: Array<Antec>,idpass): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in antecs) {
        if (!antecs.hasOwnProperty(key)) {
          continue;
        }
        let antec = antecs[key];
        db.executeSql('insert into Antec (idpass,codeAntecedent ,codeFamille ,designation ,idDetailAntec ,ordre ,visiblePreAnes ,id ,identifiant ,numeroDossier ,observation ,utilisateurAnt) values (?,?,?,?,?,?,?,?,?,?,?,?)', [
          idpass,
          antec.getcodeAntecedent(),
          antec.getcodeFamille(),
          antec.getdesignation(),
          antec.getidDetailAntec(),
          antec.getordre(),
          antec.getvisiblePreAnes(),
          antec.getid(),
          antec.getidentifiant(),
          antec.getnumeroDossier(),
          antec.getobservation(),
          antec.getutilisateurAnt()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Antec ' + error);
    });
    db.close();
  }

  public deleteAntecs(idpass) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from Antec where  idpass like '" + idpass + "'", [])
        .then(() => {
          alert("Suppression de table Antec est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Antec  ' + error);
        })
    });
    db.close();
    return this.antec;
  }
}
