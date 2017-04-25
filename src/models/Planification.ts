export class Planification {
  private _codeType: string;
  private _designation: string;
  private _date: string;
  private _heurePrise: string;
  private _num: string;
  private _seuilMax: string;
  private _seuilMin: string;
  private _type: string;
  private _rang: number;

  constructor() {
  }

  getrang(): number {
    return this._rang;
  }

  setrang(value: number) {
    this._rang = value;
  }

  getcodeType(): string {
    return this._codeType;
  }

  setcodeType(value: string) {
    this._codeType = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getheurePrise(): string {
    return this._heurePrise;
  }

  setheurePrise(value: string) {
    this._heurePrise = value;
  }

  getnum(): string {
    return this._num;
  }

  setnum(value: string) {
    this._num = value;
  }

  getseuilMax(): string {
    return this._seuilMax;
  }

  setseuilMax(value: string) {
    this._seuilMax = value;
  }

  getseuilMin(): string {
    return this._seuilMin;
  }

  setseuilMin(value: string) {
    this._seuilMin = value;
  }

  gettype(): string {
    return this._type;
  }

  settype(value: string) {
    this._type = value;
  }
}