/**
 * Created by makni on 16/02/2017.
 */
export class Rigime{
  private _codeRegime: number;
  private _designation: string;

  constructor() {
  }

  getcodeRegime(): number {
    return this._codeRegime;
  }

  setcodeRegime(value: number) {
    this._codeRegime = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }
}
