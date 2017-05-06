export class TraitementArticlePharmacie{
  private _actif:string;
  private _desart:string;
  private _codart:string;
  private _qtestk:string;

  constructor() {
  }

  getactif(): string {
    return this._actif;
  }

  setactif(value: string) {
    this._actif = value;
  }

  getdesart(): string {
    return this._desart;
  }

  setdesart(value: string) {
    this._desart = value;
  }

  getcodart(): string {
    return this._codart;
  }

  setcodart(value: string) {
    this._codart = value;
  }

  getqtestk(): string {
    return this._qtestk;
  }

  setqtestk(value: string) {
    this._qtestk = value;
  }

}
