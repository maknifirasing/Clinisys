export class MotifHospitalisation {
  private _groupeSang: string;
  private _motifhospitalisation: string;
  private _numdoss: string;
  private _poid: string;
  private _taille: string;

  constructor() {
  }

  getgroupeSang(): string {
    return this._groupeSang;
  }

  setgroupeSang(value: string) {
    this._groupeSang = value;
  }

  getmotifhospitalisation(): string {
    return this._motifhospitalisation;
  }

  setmotifhospitalisation(value: string) {
    this._motifhospitalisation = value;
  }

  getnumdoss(): string {
    return this._numdoss;
  }

  setnumdoss(value: string) {
    this._numdoss = value;
  }

  getpoid(): string {
    return this._poid;
  }

  setpoid(value: string) {
    this._poid = value;
  }

  gettaille(): string {
    return this._taille;
  }

  settaille(value: string) {
    this._taille = value;
  }
}
