import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Document} from "../models/Document";

export class DocumentService {
  public document: Array<Document> = [];

  constructor(private sqlite: SQLite)  {
  }

  public  verifDocument(documents: any, observ, codeClinique): Promise<boolean> {
    return new Promise<boolean>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select count(*) as sums from Document where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
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
            alert('Error 0 Document  ' + error);
            resolve(false);
            return false;
          })
      });

      return this;
    });
  }

  public getDocuments(documents: any, observ, codeClinique): Promise<Document> {
    return new Promise<Document>(resolve => {

      this.sqlite.create({
        name: 'clinisys.db',
        location: 'default' // the location field is required
      }).then((db: SQLiteObject) => {
        db.executeSql("select * from Document where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
          .then(result => {
            if (result.rows.length === 0) {
              this._insertDocuments(documents);
              resolve(documents[0]);
            } else {
              var doc;
              for (var i = 0; i < result.rows.length; i++) {
                doc = new Document();
                doc.seturl(result.rows.item(i).url);
                doc.setobserv(result.rows.item(i).observ);
                doc.setcodeClinique(result.rows.item(i).codeClinique);
                this.document.push(doc);
                resolve(this.document[0]);
              }
            }
          })
          .catch(error => {
            console.error('Error opening database', error);
            alert('Error 1 Document  ' + error);
          })
      });

      return this;
    });
  }

  private _insertDocuments(documents: Array<Document>): void {

    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      for (let key in documents) {
        if (!documents.hasOwnProperty(key)) {
          continue;
        }
        let document = documents[key];
        db.executeSql('insert into Document (url ,observ ,codeClinique) values (?,?,?)', [
          document.geturl(),
          document.getobserv(),
          document.getcodeClinique()
        ]);
      }
    }).catch(error => {
      console.error('Error opening database', error);
      alert('Error 2 Document ' + error);
    });

  }


  public deleteDocuments(observ, codeClinique) {


    this.sqlite.create({
      name: 'clinisys.db',
      location: 'default' // the location field is required
    }).then((db: SQLiteObject) => {
      db.executeSql("delete from Document where observ like '" + observ + "'and codeClinique like '" + codeClinique + "'", [])
        .then(() => {
          //  alert("Suppression de table Patient est terminé avec succes");
        })
        .catch(error => {
          console.error('Error opening database', error);
          alert('Error 3 Patient  ' + error);
        })
    });

    return this.document;
  }
}
