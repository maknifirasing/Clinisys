export class tabBadge {
  private _numDoss: string;
  private _FichierT: number;
  private _Fichier: number;
  private _codeClinique: string;

  constructor() {
  }

  getnumDoss(): string {
    return this._numDoss;
  }

  setnumDoss(value: string) {
    this._numDoss = value;
  }

  getFichierT(): number {
    return this._FichierT;
  }

  setFichierT(value: number) {
    this._FichierT = value;
  }

  getFichier(): number {
    return this._Fichier;
  }

  setFichier(value: number) {
    this._Fichier = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }
}

