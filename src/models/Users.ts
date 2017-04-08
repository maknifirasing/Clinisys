export class Users {
  private _matricule: any;
  private _passWord: string;
  private _userName: string;
  private _codeClinique:string;

  constructor() {
  }

  getmatricule(): any {
    return this._matricule;
  }

  setmatricule(value: any) {
    this._matricule = value;
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
