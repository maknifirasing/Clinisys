export class SigneCourbe {
  private _code: string;
  private _codePosologie: string;
  private _designation: string;
  private _seuilMin: string;
  private _seuilMax: string;
  private _color: string;
  private _unite: string;
  private _quantite: string;
  private _heurePrise: string;
  private _dateHeurePrise: string;

  constructor() {
  }

  getcode(): string {
    return this._code;
  }

  setcode(value: string) {
    this._code = value;
  }

  getcodePosologie(): string {
    return this._codePosologie;
  }

  setcodePosologie(value: string) {
    this._codePosologie = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getseuilMin(): string {
    return this._seuilMin;
  }

  setseuilMin(value: string) {
    this._seuilMin = value;
  }

  getseuilMax(): string {
    return this._seuilMax;
  }

  setseuilMax(value: string) {
    this._seuilMax = value;
  }

  getcolor(): string {
    return this._color;
  }

  setcolor(value: string) {
    this._color = value;
  }

  getunite(): string {
    return this._unite;
  }

  setunite(value: string) {
    this._unite = value;
  }

  getquantite(): string {
    return this._quantite;
  }

  setquantite(value: string) {
    this._quantite = value;
  }

  getheurePrise(): string {
    return this._heurePrise;
  }

  setheurePrise(value: string) {
    this._heurePrise = value;
  }

  getdateHeurePrise(): string {
    return this._dateHeurePrise;
  }

  setdateHeurePrise(value: string) {
    this._dateHeurePrise = value;
  }
}
