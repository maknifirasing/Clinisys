export class TraitementMedecinPharmacie{
  private _actif:string;
  private _codMed:string;
  private _nomMed:string;

  constructor() {
  }

  getactif(): string {
    return this._actif;
  }

  setactif(value: string) {
    this._actif = value;
  }

  getcodMed(): string {
    return this._codMed;
  }

  setcodMed(value: string) {
    this._codMed = value;
  }

  getnomMed(): string {
    return this._nomMed;
  }

  setnomMed(value: string) {
    this._nomMed = value;
  }
}
