export class TraitCourbe{
  private _codePosologie:string;
  private _codeType:string;
  private _date:string;
  private _designation:string;
  private _heurePrise:string;
  private _heureRealisation:string;
  private _numTraitement:string;
  private _ordre:string;
  private _quantite:string;
  private _retourn:string;
  private _row:string;
  private _numDoss:string;
  private _codeClinique:string;

  constructor() {
  }

  getcodePosologie(): string {
    return this._codePosologie;
  }

  setcodePosologie(value: string) {
    this._codePosologie = value;
  }

  getcodeType(): string {
    return this._codeType;
  }

  setcodeType(value: string) {
    this._codeType = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getheurePrise(): string {
    return this._heurePrise;
  }

  setheurePrise(value: string) {
    this._heurePrise = value;
  }

  getheureRealisation(): string {
    return this._heureRealisation;
  }

  setheureRealisation(value: string) {
    this._heureRealisation = value;
  }

  getnumTraitement(): string {
    return this._numTraitement;
  }

  setnumTraitement(value: string) {
    this._numTraitement = value;
  }

  getordre(): string {
    return this._ordre;
  }

  setordre(value: string) {
    this._ordre = value;
  }

  getquantite(): string {
    return this._quantite;
  }

  setquantite(value: string) {
    this._quantite = value;
  }

  getretourn(): string {
    return this._retourn;
  }

  setretourn(value: string) {
    this._retourn = value;
  }

  getrow(): string {
    return this._row;
  }

  setrow(value: string) {
    this._row = value;
  }

  getnumDoss(): string {
    return this._numDoss;
  }

  setnumDoss(value: string) {
    this._numDoss = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }
}
