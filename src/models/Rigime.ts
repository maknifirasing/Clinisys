export class Rigime{
  private _designation: string;

  constructor() {
  }
  
  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }
}
