export class Medecin {
  private _codMed: string;
  private _nomMed: string;
  private _designationSpecialite: string;
  private _codeClinique: string;

  constructor() {
  }

  getnomMed(): string {
    return this._nomMed;
  }

  setnomMed(value: string) {
    this._nomMed = value;
  }

  getcodMed(): string {
    return this._codMed;
  }

  setcodMed(value: string) {
    this._codMed = value;
  }

  getdesignationSpecialite(): string {
    return this._designationSpecialite;
  }

  setdesignationSpecialite(value: string) {
    this._designationSpecialite = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }
}
