/**
 * Created by makni on 14/02/2017.
 */
import {DateTime} from "ionic-angular";
/**
 * Created by makni on 09/02/2017.
 */
export class Users {
  private _actif: number;
  private _chStat: number;
  private _codeMedecinInfirmier: any;
  private _codePin: number;
  private _dateModPwd: string;
  private _dernierDateCnx: string;
  private _description: string;
  private _grp: string;
  private _matricule: any;
  private _natureUserDS: any;
  private _oldGrp: any;
  private _passWord: string;
  private _userName: string;
  private _validCptRend: string;
  private _validPHNuit: string;

  constructor() {
  }

  getactif(): number {
    return this._actif;
  }

  setactif(value: number) {
    this._actif = value;
  }

  getchStat(): number {
    return this._chStat;
  }

  setchStat(value: number) {
    this._chStat = value;
  }

  getcodeMedecinInfirmier(): any {
    return this._codeMedecinInfirmier;
  }

  setcodeMedecinInfirmier(value: any) {
    this._codeMedecinInfirmier = value;
  }

  getcodePin(): number {
    return this._codePin;
  }

  setcodePin(value: number) {
    this._codePin = value;
  }

  getdateModPwd(): string {
    return this._dateModPwd;
  }

  setdateModPwd(value: string) {
    this._dateModPwd = value;
  }

  getdernierDateCnx(): string {
    return this._dernierDateCnx;
  }

  setdernierDateCnx(value: string) {
    this._dernierDateCnx = value;
  }

  getdescription(): string {
    return this._description;
  }

  setdescription(value: string) {
    this._description = value;
  }

  getgrp(): string {
    return this._grp;
  }

  setgrp(value: string) {
    this._grp = value;
  }

  getmatricule(): any {
    return this._matricule;
  }

  setmatricule(value: any) {
    this._matricule = value;
  }

  getnatureUserDS(): any {
    return this._natureUserDS;
  }

  setnatureUserDS(value: any) {
    this._natureUserDS = value;
  }

  getoldGrp(): any {
    return this._oldGrp;
  }

  setoldGrp(value: any) {
    this._oldGrp = value;
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

  getvalidCptRend(): string {
    return this._validCptRend;
  }

  setvalidCptRend(value: string) {
    this._validCptRend = value;
  }

  getvalidPHNuit(): string {
    return this._validPHNuit;
  }

  setvalidPHNuit(value: string) {
    this._validPHNuit = value;
  }
}
