export class HistDoc {
  private _numDoss: string;
  private _date: string;
  private _codeClinique: string;
  private _nom: string;

  constructor() {
  }

  getnumDoss(): string {
    return this._numDoss;
  }

  setnumDoss(value: string) {
    this._numDoss = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }

  getnom(): string {
    return this._nom;
  }

  setnom(value: string) {
    this._nom = value;
  }
}
