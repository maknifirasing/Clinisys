export class Langue {
  private _langue: string;
  private _matricule: string;
  private _codeClinique: string;
  private _nomClinique: string;

  constructor() {
  }

  getlangue(): string {
    return this._langue;
  }

  setlangue(value: string) {
    this._langue = value;
  }

  getmatricule(): string {
    return this._matricule;
  }

  setmatricule(value: string) {
    this._matricule = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }

  getnomClinique(): string {
    return this._nomClinique;
  }

  setnomClinique(value: string) {
    this._nomClinique = value;
  }
}
