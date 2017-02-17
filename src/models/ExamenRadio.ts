export class ExamenRadio {
  private _codeExamen: string;
  private _compterendu: string;
  private _dateExamen: string;
  private _datePrevu: string;
  private _date_RDV: string;
  private _designationExamen: string;
  private _heurePrevu: string;
  private _idres: string;
  private _medecin: string;
  private _nature: string;
  private _numeroDossier: string;
  private _numeroExamen: string;
  private _observ: string;
  private _resultat: string;
  constructor() {
  }


  getcodeExamen(): string {
    return this._codeExamen;
  }

  setcodeExamen(value: string) {
    this._codeExamen = value;
  }

  getcompterendu(): string {
    return this._compterendu;
  }

  setcompterendu(value: string) {
    this._compterendu = value;
  }

  getdateExamen(): string {
    return this._dateExamen;
  }

  setdateExamen(value: string) {
    this._dateExamen = value;
  }

  getdatePrevu(): string {
    return this._datePrevu;
  }

  setdatePrevu(value: string) {
    this._datePrevu = value;
  }

  getdate_RDV(): string {
    return this._date_RDV;
  }

  setdate_RDV(value: string) {
    this._date_RDV = value;
  }

  getdesignationExamen(): string {
    return this._designationExamen;
  }

  setdesignationExamen(value: string) {
    this._designationExamen = value;
  }

  getheurePrevu(): string {
    return this._heurePrevu;
  }

  setheurePrevu(value: string) {
    this._heurePrevu = value;
  }

  getidres(): string {
    return this._idres;
  }

  setidres(value: string) {
    this._idres = value;
  }

  getmedecin(): string {
    return this._medecin;
  }

  setmedecin(value: string) {
    this._medecin = value;
  }

  getnature(): string {
    return this._nature;
  }

  setnature(value: string) {
    this._nature = value;
  }

  getnumeroDossier(): string {
    return this._numeroDossier;
  }

  setnumeroDossier(value: string) {
    this._numeroDossier = value;
  }

  getnumeroExamen(): string {
    return this._numeroExamen;
  }

  setnumeroExamen(value: string) {
    this._numeroExamen = value;
  }

  getobserv(): string {
    return this._observ;
  }

  setobserv(value: string) {
    this._observ = value;
  }

  getresultat(): string {
    return this._resultat;
  }

  setresultat(value: string) {
    this._resultat = value;
  }
}
