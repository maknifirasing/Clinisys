
import {SQLite} from 'ionic-native';
import {ExamenRadio} from "../models/ExamenRadio";

export class ExamenRadioService {
  public examenRadio: Array<ExamenRadio> = [];
  verif: boolean;

  constructor() {
  }
  public verifExamenRadio(examenRadios: any,observ) {
    this.verif = false;
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("select * from ExamenRadio where observ like '" + observ + "'", [])
        .then(result => {
          if (result.rows.length === examenRadios.length) {
            this.verif = true;
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 0 ExamenRadio  ' + error);
        })
    });
    db.close();
    return this.verif;
  }

  public getExamenRadios(examenRadios: any,observ) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
 db.executeSql("select * from ExamenRadio where observ like '" + observ + "'", [])
         .then(result => {
          if (result.rows.length === 0) {
            this._insertExamenRadios(examenRadios);
          } else {
            var ex;
            for (var i = 0; i < result.rows.length; i++) {
              ex = new ExamenRadio();
              ex.setcodeExamen(result.rows.item(i).codeExamen);
              ex.setcompterendu(result.rows.item(i).compterendu);

                ex.setdateExamen(result.rows.item(i).dateExamen);
              ex.setdatePrevu(result.rows.item(i).datePrevu);

                ex.setdate_RDV(result.rows.item(i).date_RDV);
              ex.setdesignationExamen(result.rows.item(i).designationExamen);


                   ex.setheurePrevu(result.rows.item(i).heurePrevu);
              ex.setidres(result.rows.item(i).idres);

                ex.setmedecin(result.rows.item(i).medecin);
              ex.setnature(result.rows.item(i).nature);

                ex.setnumeroDossier(result.rows.item(i).numeroDossier);
              ex.setnumeroExamen(result.rows.item(i).numeroExamen);

               ex.setobserv(result.rows.item(i).observ);
              ex.setresultat(result.rows.item(i).resultat);



              this.examenRadio.push(ex);
            }
          }
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 ExamenRadio  ' + error);
        })
    });
    db.close();
    return this.examenRadio;
  }
  private _insertExamenRadios(examenRadios: Array<ExamenRadio>): void {
    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      for (let key in examenRadios) {
        if (!examenRadios.hasOwnProperty(key)) {
          continue;
        }
        let examenRadio = examenRadios[key];
        db.executeSql('insert into ExamenRadio (codeExamen,compterendu ,dateExamen ' +
            ',datePrevu, date_RDV,designationExamen,heurePrevu,idres,medecin,nature,numeroDossier,numeroExamen,observ,resultat) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
       examenRadio.getcodeExamen(),
              examenRadio.getcompterendu(),

                examenRadio.getdateExamen(),
              examenRadio.getdatePrevu(),

                examenRadio.getdate_RDV(),
              examenRadio.getdesignationExamen(),


                   examenRadio.getheurePrevu(),
              examenRadio.getidres(),

                examenRadio.getmedecin(),
              examenRadio.getnature(),

                examenRadio.getnumeroDossier(),
              examenRadio.getnumeroExamen(),

               examenRadio.getobserv(),
              examenRadio.getresultat()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 ExamenRadio ' + error);
    });
    db.close();
  }

  public deleteExamenRadios(observ) {

    let db = new SQLite();
    db.openDatabase({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then(() => {
      db.executeSql("delete from ExamenRadio where observ like '" + observ + "'", [])
        .then(() => {
          alert("Suppression de table ExamenRadio est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 1 ExamenRadio  ' + error);
        })
    });
    db.close();
    return this.examenRadio;
  }
}
