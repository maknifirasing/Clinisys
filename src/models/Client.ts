export class Client {
  private _adrCli: string;
  private _datNai: string;
  private _libNat: string;
  private _numTel: string;
  private _etage: string;
  private _numCha: string;
  private _numdoss: string;
  private _identifiant: string;
  private _codeClinique:string;
  private _dateArr:string;

  constructor() {
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }

  getadrCli(): string {
    return this._adrCli;
  }

  setadrCli(value: string) {
    this._adrCli = value;
  }

  getdatNai(): string {
    return this._datNai;
  }

  setdatNai(value: string) {
    this._datNai = value;
  }

  getlibNat(): string {
    return this._libNat;
  }

  setlibNat(value: string) {
    this._libNat = value;
  }

  getnumTel(): string {
    return this._numTel;
  }

  setnumTel(value: string) {
    this._numTel = value;
  }

  getetage(): string {
    return this._etage;
  }

  setetage(value: string) {
    this._etage = value;
  }

  getnumCha(): string {
    return this._numCha;
  }

  setnumCha(value: string) {
    this._numCha = value;
  }

  getnumdoss(): string {
    return this._numdoss;
  }

  setnumdoss(value: string) {
    this._numdoss = value;
  }

  getidentifiant(): string {
    return this._identifiant;
  }

  setidentifiant(value: string) {
    this._identifiant = value;
  }

  getdateArr(): string {
    return this._dateArr;
  }

  setdateArr(value: string) {
    this._dateArr = value;
  }
}
