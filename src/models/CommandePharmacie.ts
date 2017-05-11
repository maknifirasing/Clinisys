export class CommandePharmacie {

  private _dateCommande: string;
  private _desart: string;
  private _nomMed: string;
  private _numbon: string;
  private _qte: string;

  constructor() {
  }

  getdateCommande(): string {
    return this._dateCommande;
  }

  setdateCommande(value: string) {
    this._dateCommande = value;
  }

  getdesart(): string {
    return this._desart;
  }

  setdesart(value: string) {
    this._desart = value;
  }

  getnomMed(): string {
    return this._nomMed;
  }

  setnomMed(value: string) {
    this._nomMed = value;
  }

  getnumbon(): string {
    return this._numbon;
  }

  setnumbon(value: string) {
    this._numbon = value;
  }

  getqte(): string {
    return this._qte;
  }

  setqte(value: string) {
    this._qte = value;
  }
}
