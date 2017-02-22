export class Evenement{
  private _access: number;
  private _code: string;
  private _evenements: string;
  private _orderEvenement: number;
  private _visible: boolean;
  private _date: string;
  private _detail: string;
  private _IDEvenement: number
  private _numdoss: string;
  private _userCreat: string;

  constructor() {
  }

  getaccess(): number {
    return this._access;
  }

  setaccess(value: number) {
    this._access = value;
  }

  getcode(): string {
    return this._code;
  }

  setcode(value: string) {
    this._code = value;
  }

  getevenements(): string {
    return this._evenements;
  }

  setevenements(value: string) {
    this._evenements = value;
  }

  getorderEvenement(): number {
    return this._orderEvenement;
  }

  setorderEvenement(value: number) {
    this._orderEvenement = value;
  }

  getvisible(): boolean {
    return this._visible;
  }

  setvisible(value: boolean) {
    this._visible = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getdetail(): string {
    return this._detail;
  }

  setdetail(value: string) {
    this._detail = value;
  }

  getIDEvenement(): number {
    return this._IDEvenement;
  }

  setIDEvenement(value: number) {
    this._IDEvenement = value;
  }

  getnumdoss(): string {
    return this._numdoss;
  }

  setnumdoss(value: string) {
    this._numdoss = value;
  }

  getuserCreat(): string {
    return this._userCreat;
  }

  setuserCreat(value: string) {
    this._userCreat = value;
  }
}
