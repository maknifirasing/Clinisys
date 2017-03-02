"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var Variables = (function () {
    function Variables(http) {
        this.http = http;
        this.url = "http://192.168.0.140:8084/";
    }
    Variables.m = function () {
        if (1 === 1) {
            return Variables.i = Variables.arabe.langue;
        }
    };
    Variables.arabe = {
        langue: "arabe",
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
        titreEnligne: "على الانترنت: آخر تحديث",
        titreMotif: "أسباب دخول المستشفى",
        titreAnt: "السوابق",
        titreAll: "الحساسية",
        titreSigneV: "علامات حيوية",
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
        titreEnligne: "En Ligne: Derniére mise a jour le",
        titreMotif: "Motifs de l'hospitalisation",
        titreAnt: "Antécédents",
        titreAll: "Allergies",
        titreSigneV: "Signes Vitaux",
        titreEnt: "Entrées",
        titreTrait: "Traitement En cours",
        tab1: "Page p:incipale",
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
    Variables.a = "";
    Variables.url = "http://192.168.0.140:8084/";
    Variables = __decorate([
        core_1.Injectable()
    ], Variables);
    return Variables;
}());
exports.Variables = Variables;
