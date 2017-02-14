import {DateTime} from "ionic-angular";

export class MotifHospitalisation {

  private _conclusion: string;
  private _dateRdv: string;
  private _dateSortie: string;
  private _groupeSang: string;
  private _heureRdv: string;
  private _heureSortie: string;
  private _histoiremaladie: string;
  private _motifhospitalisation: string;
  private _numdoss: string;
  private _observationSejour: string;
  private _poid: string;
  private _taille: string;
  private _traitementHabituelle: string;
  private _traitementSejour: string;
  private _traitementSortie: string;
  private _utilisateurMotif: string;

   constructor() {
    }


  getconclusion(): string {
    return this._conclusion;
  }

  setconclusion(value: string) {
    this._conclusion = value;
  }

  getdateRdv(): string {
    return this._dateRdv;
  }

  setdateRdv(value: string) {
    this._dateRdv = value;
  }

  getdateSortie(): string {
    return this._dateSortie;
  }

  setdateSortie(value: string) {
    this._dateSortie = value;
  }

  getgroupeSang(): string {
    return this._groupeSang;
  }

  setgroupeSang(value: string) {
    this._groupeSang = value;
  }

  getheureRdv(): string {
    return this._heureRdv;
  }

  setheureRdv(value: string) {
    this._heureRdv = value;
  }

  getheureSortie(): string {
    return this._heureSortie;
  }

  setheureSortie(value: string) {
    this._heureSortie = value;
  }

  gethistoiremaladie(): string {
    return this._histoiremaladie;
  }

  sethistoiremaladie(value: string) {
    this._histoiremaladie = value;
  }

  getmotifhospitalisation(): string {
    return this._motifhospitalisation;
  }

  setmotifhospitalisation(value: string) {
    this._motifhospitalisation = value;
  }

  getnumdoss(): string {
    return this._numdoss;
  }

  setnumdoss(value: string) {
    this._numdoss = value;
  }

  getobservationSejour(): string {
    return this._observationSejour;
  }

  setobservationSejour(value: string) {
    this._observationSejour = value;
  }

  getpoid(): string {
    return this._poid;
  }

  setpoid(value: string) {
    this._poid = value;
  }

  gettaille(): string {
    return this._taille;
  }

  settaille(value: string) {
    this._taille = value;
  }

  gettraitementHabituelle(): string {
    return this._traitementHabituelle;
  }

  settraitementHabituelle(value: string) {
    this._traitementHabituelle = value;
  }

  gettraitementSejour(): string {
    return this._traitementSejour;
  }

  settraitementSejour(value: string) {
    this._traitementSejour = value;
  }

  gettraitementSortie(): string {
    return this._traitementSortie;
  }

  settraitementSortie(value: string) {
    this._traitementSortie = value;
  }

  getutilisateurMotif(): string {
    return this._utilisateurMotif;
  }

  setutilisateurMotif(value: string) {
    this._utilisateurMotif = value;
  }
}
