/**
 * Created by makni on 15/02/2017.
 */
export class Traitement{
  private _codePosologie: string;
  private _date: string;
  private _dateFinTrait: string;
  private _dci: string;
  private _designation: string;
  private _dureEnJour: number;
  private _heure: string;
  private _heureDebut: string;
  private _jour: number;
  private _nbFois: number;
  private _numDoss: string;
  private _numTraitement: string;
  private _numbon: any;
  private _posologie: string;
  private _prescripteur: string;
  private _quantite: string;
  private _unite: string;
  private _vitesse: any;
  private _voie: string;
  private _volume: any;

  constructor() {
  }

  getcodePosologie(): string {
    return this._codePosologie;
  }

  setcodePosologie(value: string) {
    this._codePosologie = value;
  }

  getdate(): string {
    return this._date;
  }

  setdate(value: string) {
    this._date = value;
  }

  getdateFinTrait(): string {
    return this._dateFinTrait;
  }

  setdateFinTrait(value: string) {
    this._dateFinTrait = value;
  }

  getdci(): string {
    return this._dci;
  }

  setdci(value: string) {
    this._dci = value;
  }

  getdesignation(): string {
    return this._designation;
  }

  setdesignation(value: string) {
    this._designation = value;
  }

  getdureEnJour(): number {
    return this._dureEnJour;
  }

  setdureEnJour(value: number) {
    this._dureEnJour = value;
  }

  getheure(): string {
    return this._heure;
  }

  setheure(value: string) {
    this._heure = value;
  }

  getheureDebut(): string {
    return this._heureDebut;
  }

  setheureDebut(value: string) {
    this._heureDebut = value;
  }

  getjour(): number {
    return this._jour;
  }

  setjour(value: number) {
    this._jour = value;
  }

  getnbFois(): number {
    return this._nbFois;
  }

  setnbFois(value: number) {
    this._nbFois = value;
  }

  getnumDoss(): string {
    return this._numDoss;
  }

  setnumDoss(value: string) {
    this._numDoss = value;
  }

  getnumTraitement(): string {
    return this._numTraitement;
  }

  setnumTraitement(value: string) {
    this._numTraitement = value;
  }

  getnumbon(): any {
    return this._numbon;
  }

  setnumbon(value: any) {
    this._numbon = value;
  }

  getposologie(): string {
    return this._posologie;
  }

  setposologie(value: string) {
    this._posologie = value;
  }

  getprescripteur(): string {
    return this._prescripteur;
  }

  setprescripteur(value: string) {
    this._prescripteur = value;
  }

  getquantite(): string {
    return this._quantite;
  }

  setquantite(value: string) {
    this._quantite = value;
  }

  getunite(): string {
    return this._unite;
  }

  setunite(value: string) {
    this._unite = value;
  }

  getvitesse(): any {
    return this._vitesse;
  }

  setvitesse(value: any) {
    this._vitesse = value;
  }

  getvoie(): string {
    return this._voie;
  }

  setvoie(value: string) {
    this._voie = value;
  }

  getvolume(): any {
    return this._volume;
  }

  setvolume(value: any) {
    this._volume = value;
  }
}
