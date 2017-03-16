export class HistDossier {
  private _numDoss: string;
  private _date: string;
  private _codeClinique: string;


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
}
