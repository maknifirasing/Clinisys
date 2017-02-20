/**
 * Created by makni on 17/02/2017.
 */
export class Labo {
  private _codeDemande: string;
  private _contenuePDF: boolean;
  private _dateDemande: string;
  private _dateRealisation: string;
  private _designation: string;
  private _etatExamen: number;
  private _id: number;
  private _medecinTraitant: string;
  private _nomLabo: string;
  private _numAdmission: string;
  private _numDossier: string;
  private _patient: string;
  private _state: string;
  private _userName: string;
  private _validation: string;

  constructor() {
  }

  getcodeDemande(): string {
    return this._codeDemande;
  }

  setcodeDemande(value: string) {
    this._codeDemande = value;
  }

  getcontenuePDF(): boolean {
    return this._contenuePDF;
  }

  setcontenuePDF(value: boolean) {
    this._contenuePDF = value;
  }

  getdateDemande(): string {
    return this._dateDemande;
  }

  setdateDemande(value: string) {
    this._dateDemande = value;
  }

  getdateRealisation(): string {
    return this._dateRealisation;
  }

  setdateRealisation(value: string) {
    this._dateRealisation = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getetatExamen(): number {
    return this._etatExamen;
  }

  setetatExamen(value: number) {
    this._etatExamen = value;
  }

  getid(): number {
    return this._id;
  }

  setid(value: number) {
    this._id = value;
  }

  getmedecinTraitant(): string {
    return this._medecinTraitant;
  }

  setmedecinTraitant(value: string) {
    this._medecinTraitant = value;
  }

  getnomLabo(): string {
    return this._nomLabo;
  }

  setnomLabo(value: string) {
    this._nomLabo = value;
  }

  getnumAdmission(): string {
    return this._numAdmission;
  }

  setnumAdmission(value: string) {
    this._numAdmission = value;
  }

  getnumDossier(): string {
    return this._numDossier;
  }

  setnumDossier(value: string) {
    this._numDossier = value;
  }

  getpatient(): string {
    return this._patient;
  }

  setpatient(value: string) {
    this._patient = value;
  }

  getstate(): string {
    return this._state;
  }

  setstate(value: string) {
    this._state = value;
  }

  getuserName(): string {
    return this._userName;
  }

  setuserName(value: string) {
    this._userName = value;
  }

  getvalidation(): string {
    return this._validation;
  }

  setvalidation(value: string) {
    this._validation = value;
  }
}
