export class Users {
  private _codePin: any;
  private _actif: any;
  private _passWord: string;
  private _userName: string;
  private _codeClinique: string;

  constructor() {
  }


  getcodePin(): any {
    return this._codePin;
  }

  setcodePin(value: any) {
    this._codePin = value;
  }

  getactif(): any {
    return this._actif;
  }

  setactif(value: any) {
    this._actif = value;
  }

  getpassWord(): string {
    return this._passWord;
  }

  setpassWord(value: string) {
    this._passWord = value;
  }

  getuserName(): string {
    return this._userName;
  }

  setuserName(value: string) {
    this._userName = value;
  }

  getcodeClinique(): string {
    return this._codeClinique;
  }

  setcodeClinique(value: string) {
    this._codeClinique = value;
  }
}
