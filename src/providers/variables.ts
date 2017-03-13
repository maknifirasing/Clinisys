import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController} from "ionic-angular";
import {Platform} from "ionic-angular";

declare var navigator: any;
declare var Connection: any;
@Injectable()
export class Variables {

static arabe= {
  listeClinique:"قائمة العيادات",
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
}

  static francais: any = {
    listeClinique:"Liste des Cliniques",
    langue:"francais",
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
  }

  static anglais: any = {
    listeClinique:"List of Clinics",
    langue:"anglais",
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
    tab1:"Main page",
    tab2:"Review of Radio",
    tab3:"The list of pre-anesthesia",
    tab4:"Laboratory Review",
    titreSortie:"Outputs",
    titreAlert:"Alerts",
    titreMaladie:"History of Disease",
    titreClini:"Clinic Review",
    titreEvo:"Evolution",
    titreConclu:"Conclusion",
    titreRegime:"Diet",
    titreDemande:"The date of application",
    titreExamen:"Review",
    titreAct:"Act",
    titreChi:"Surgeon",
    titreDateAct:"Act date",
    titreHeureDeb:"Start Time",
    titreHeureF:"Time End",
    titleMed:"Doctor"
  }

   url: string= "";

  constructor(public http: Http,public navCtrl:NavController) {
    this.url="http://192.168.0.138:8084/";
  }

  public static checconnection() {
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
    return states[networkState];
  }

  public static  checservice(url) {
    var xhr = new XMLHttpRequest();
    var file = url;

    xhr.timeout = 200;
    xhr.open('HEAD', file, true);
    xhr.send();
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 304) {
          alert("connection exists!");
        } else {
          alert("connection doesn't exist!");
        }
      }
    }
  }



}
