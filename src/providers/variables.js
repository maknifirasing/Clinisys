var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from "ionic-angular";
var Variables = Variables_1 = (function () {
    function Variables(http, navCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.url = "";
        this.url = "http://192.168.0.138:8084/";
        Variables_1.uRL = this.url;
    }
    /*
  
    public static checconnection(): Promise<boolean> {
      return new Promise<boolean>(resolve => {
      var states = {};
      var networkState = navigator.connection.type;
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      if (states[networkState]!=="No network connection") {
        Variables.checservice(Variables.uRL).then(res => {
          if (res === false) {
            resolve(false);
            return false;
          }
          else
          {
            resolve(true);
            return true;
          }
        });
      } else {
        resolve(false);
        return false;
      }
        return this;
      });
    }
  */
    Variables.checconnection = function () {
        var states = {};
        var networkState = navigator.connection.type;
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';
        if (states[networkState] !== "No network connection") {
            Variables_1.checservice().then(function (res) {
                if (res === false) {
                    return false;
                }
                else {
                    return true;
                }
            });
        }
        return states[networkState];
    };
    Variables.checservice = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();
            var file = Variables_1.uRL;
            xhr.timeout = 200;
            xhr.open('HEAD', file, true);
            xhr.send();
            xhr.addEventListener("readystatechange", processRequest, false);
            function processRequest(e) {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 304) {
                        resolve(true);
                        return true;
                    }
                    else {
                        resolve(false);
                        return false;
                    }
                }
            }
            return _this;
        });
    };
    return Variables;
}());
Variables.arabe = {
    titreSync: "تزامن",
    titreMod: "تغيير كلمة المرور",
    titreChangClini: "تغيير العيادة",
    titreDeconnexion: "تسجيل الخروج",
    titreChangLangue: "تغيير اللغة",
    refreshingText: "تحديث ...",
    pullingText: "سحب للتحديث",
    listeClinique: "قائمة العيادات",
    mess: "الرجاء الانتظار بضع ثواني",
    err: "الرجاء التثبت من اسم المستخدم او كلمة المرور",
    errConn: "الرجاء التثبت من اتصالك بالانترنت",
    nomUtili: "اسم المستخدم",
    mo2pass: "كلمة المرور",
    login: "تسجيل الدخول",
    liste: "قائمة المرضى",
    rech: "بحث",
    age: "العمر ",
    ch: "الغرفة ",
    titreHorsLigne: "خارج الخط: آخر تحديث",
    titreEnligne: "على الانترنت: آخر تحديث",
    titreMotif: "أسباب دخول المستشفى",
    titreAnt: "السوابق",
    titreAll: "الحساسية",
    titreSigneV: "العلامات الحيوية",
    titreEnt: "المدخلات",
    titreTrait: "العلاج الجاري",
    tab1: "الصفحة الرئيسية",
    tab2: "مراجعة الراديو",
    tab3: "قائمة ما قبل التخدير",
    tab4: "مراجعة المختبر",
    titreSortie: "المخرجات",
    titreAlert: "التنبيهات",
    titreMaladie: "تاريخ المرض",
    titreClini: "الفحص السريري",
    titreEvo: "تطور",
    titreConclu: "استنتاج",
    titreRegime: "حمية",
    titreDemande: "تاريخ تقديم الطلب",
    titreExamen: "مراجعة",
    titreAct: "حدث",
    titreChi: "الجراح",
    titreDateAct: "تاريخ الحدث",
    titreHeureDeb: "وقت البدء",
    titreHeureF: "نهاية الوقت",
    titleMed: "الطبيب"
};
Variables.francais = {
    titreSync: "Synchroniser",
    titreMod: "Modifier Mot de Passe",
    titreChangClini: "Changer Clinique",
    titreDeconnexion: "Deconnexion",
    refreshingText: "Rafraîchissant...",
    pullingText: "Tirer pour rafraîchir",
    listeClinique: "Liste des Cliniques",
    langue: "francais",
    mess: "S'il vous plais , Vous devez etre Patient",
    err: "verifier votre Nom d'utilisateur ou Mot de passe!",
    errConn: "verifier votre connextion!",
    nomUtili: "Nom d'utilisateur",
    mo2pass: "Mot de Passe",
    login: "Connecter",
    liste: "Liste des patients",
    rech: "Recherche",
    age: "Age ",
    ch: "CH ",
    titreHorsLigne: "Hors Ligne: Derniére mise a jour le",
    titreEnligne: "En Ligne: Derniére mise a jour le",
    titreMotif: "Motifs de l'hospitalisation",
    titreAnt: "Antécédents",
    titreAll: "Allergies",
    titreSigneV: "Signes Vitaux",
    titreEnt: "Entrées",
    titreTrait: "Traitement En cours",
    titreChangLangue: "Changer Langue",
    tab1: "Page principale",
    tab2: "Revue de Radio",
    tab3: "La liste des pré-anesthésie",
    tab4: "Examen du laboratoire",
    titreSortie: "Sorties",
    titreAlert: "Alertes",
    titreMaladie: "Histoire de Maladie",
    titreClini: "Examen Clinique",
    titreEvo: "Évolution",
    titreConclu: "Conclusion",
    titreRegime: "Régime",
    titreDemande: "Date demande",
    titreExamen: "Examen",
    titreAct: "Acte",
    titreChi: "Chirurgien",
    titreDateAct: "Date Acte",
    titreHeureDeb: "Heure Début",
    titreHeureF: "Heure Fin",
    titleMed: "Medecin"
};
Variables.anglais = {
    titreSync: "Synchronize",
    titreMod: "Edit Password",
    titreChangClini: "Change Clinic",
    titreChangLangue: "Change language",
    titreDeconnexion: "Disconnection",
    refreshingText: "Refreshing...",
    pullingText: "Pull to refresh",
    listeClinique: "List of Clinics",
    langue: "anglais",
    mess: "It will takes few seconds, Please be Patient",
    err: "Please check your login or your password!",
    errConn: "Check your connexion!",
    nomUtili: "Login",
    mo2pass: "Password",
    login: "Sign in",
    liste: "List of patients",
    rech: "Search",
    age: "Age ",
    ch: "CH ",
    titreHorsLigne: "Offline: Last Updated on",
    titreEnligne: "Online: Last Updated on",
    titreMotif: "Reasons for hospitalization",
    titreAnt: "Antecedents",
    titreAll: "Allergies",
    titreSigneV: "Vital signs",
    titreEnt: "Inputs",
    titreTrait: "Treatment in progress",
    tab1: "Main page",
    tab2: "Review of Radio",
    tab3: "The list of pre-anesthesia",
    tab4: "Laboratory Review",
    titreSortie: "Outputs",
    titreAlert: "Alerts",
    titreMaladie: "History of Disease",
    titreClini: "Clinic Review",
    titreEvo: "Evolution",
    titreConclu: "Conclusion",
    titreRegime: "Diet",
    titreDemande: "The date of application",
    titreExamen: "Review",
    titreAct: "Act",
    titreChi: "Surgeon",
    titreDateAct: "Act date",
    titreHeureDeb: "Start Time",
    titreHeureF: "Time End",
    titleMed: "Doctor"
};
Variables.uRL = "";
Variables = Variables_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, NavController])
], Variables);
export { Variables };
var Variables_1;
//# sourceMappingURL=variables.js.map