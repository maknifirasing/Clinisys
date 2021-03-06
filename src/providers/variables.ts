import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

declare var navigator: any;
declare var Connection: any;

@Injectable()
export class Variables {

  static arabe = {
    titreSync: "تزامن",
    titreMod: "تغيير كلمة المرور",
    titreChangClini: "تغيير المصحة",
    titreDeconnexion: "تسجيل الخروج",
    titreChangLangue: "تغيير اللغة",
    refreshingText: "تحديث ...",
    pullingText: "سحب للتحديث",
    listeClinique: "قائمة المصحات",
    mess: "الرجاء الانتظار بضع ثواني",
    err: "الرجاء التثبت من اسم المستخدم او كلمة المرور",
    errConn: "الرجاء التثبت من اتصالك بالانترنت",
    nomUtili: "اسم المستخدم",
    mo2pass: "كلمة المرور",
    login: "تسجيل الدخول",
    liste: "قائمة المرضى",
    rech: "بحث",
    age: "السّن ",
    ch: "الغرفة ",
    titreHorsLigne: "خارج الخط: آخر تحديث",
    titreEnligne: "على الخط: آخر تحديث",
    titreMotif: "أسباب دخول المستشفى",
    titreAnt: "السوابق",
    titreAll: "الحساسية",
    titreSigneV: "العلامات الحيوية",
    titreEnt: "المدخلات",
    titreTrait: "العلاج الجاري",
    tab1: "الصفحة الرئيسية",
    tab2: "مراجعة الراديو",
    tab3: "قائمة ما قبل التخدير",
    tab4: " الفحص المخبري",
    titreSortie: "المخرجات",
    titreAlert: "التنبيهات",
    titreMaladie: "تاريخ المرض",
    titreClini: "الفحص السريري",
    titreEvo: "تطور",
    titreConclu: "استنتاج",
    titreRegime: "النظام الغذائي",
    titreDemande: "تاريخ تقديم الطلب",
    titreExamen: "مراجعة",
    titreAct: "الاجراء",
    titreChi: "الجراح",
    titreDateAct: "تاريخ الاجراء",
    titreHeureDeb: "بداية الوقت",
    titreHeureF: "نهاية الوقت",
    titleMed: "الطبيب",
    titreChambre: "الغرفة",
    titreEtage: "الطابق",
    titreDateAdmission: "تاريخ التسجيل",
    titreNumDoss: "رقم الملف",
    titreIdentifiant: "الهوية",
    titreDateNaiss: "تاريخ الميلاد",
    titreNationalite: "الجنسية",
    titreTel: "الهاتف",
    titreAdr: "العنوان",
    titreAns: "سنة",
    titreGroupeSanguim: "فصيلة الدم",
    titrePoid: "الوزن",
    titreTaille: "الطول",
    titreecrireICI: "أكتب هنا ...",
    titreancienm2p: "كلمة السر القديمة",
    titrenvm2p: "كلمة المرور الجديدة",
    titreconfirmerm2p: " أكد الكلمة",
    titreconfirmerbtn: "تأكيد",
    titreAutreCliniques: "مصحات أخرى",
    titreDesignation: "أغراض",
    titreValeurs: "قيمة الأعداد",
    titreconfirmation: "تأكيد",
    titremessConf: "هل تريد الالغاء",
    titreoui: "نعم",
    titreNon: "لا",
    titreAnnuler: "الغاء",
    titreQuantite: "الكمية",
    titreAddArticle: "إضافة المادة",
    titreMedecin: "اختيار طبيب",
    titreMedecinP: "طبيب ب.",
    titreListeCommandes: "الضوابط القائمة",
    titreEnregister: "سجل",
    titreRealisation: "تحقيق",
    titrePharmacie: "صيدلية",
    titreCommande: "ترتيب",
    titreProduitexiste: "المنتج هو",
    titreStockindisponible: "المخزون غير متوفر",
    titreLoading: "جاري الشحن...",
    titreLangue:"اللغات",
    francais:"الفرنسية",
    anglais:"الانقليزية",
    arabe:"العربية"
  }

  static francais: any = {
    titreSync: "Synchroniser",
    titreMod: "Modifier Mot de Passe",
    titreChangClini: "Changer Clinique",
    titreDeconnexion: "Deconnexion",
    refreshingText: "Rafraîchissant...",
    pullingText: "Tirer pour rafraîchir",
    listeClinique: "Liste des Cliniques",
    langue: "francais",
    mess: "Veuillez patienter quelques secondes ..",
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
    titleMed: "Medecin",
    titreChambre: "Chambre",
    titreEtage: "Etage",
    titreDateAdmission: "Date Admission",
    titreNumDoss: "Numéro Dossier",
    titreIdentifiant: "Identifiant",
    titreDateNaiss: "Date de Naissance",
    titreNationalite: "Nationalité",
    titreTel: "Tel",
    titreAdr: "Adresse",
    titreAns: "ans",
    titreGroupeSanguim: "Groupe Sanguim",
    titrePoid: "Poids",
    titreTaille: "Taille",
    titreecrireICI: "Ecrire ici ...",
    titreancienm2p: "Ancien Mot de passe",
    titrenvm2p: "Nouveau mot de passe",
    titreconfirmerm2p: "Confirmé Mot de passe",
    titreconfirmerbtn: "Confirmer",
    titreAutreCliniques: "Autre Cliniques",
    titreDesignation: "Designation",
    titreValeurs: "Valeurs",
    titreconfirmation: "Confirmation",
    titremessConf: "Voulez vous annuler",
    titreoui: "Oui",
    titreNon: "Non",
    titreAnnuler: "Annuler",
    titreQuantite: "Quantité",
    titreAddArticle: "Ajouter Article",
    titreMedecin: "Choisir Médecin",
    titreMedecinP: "Médecin P.",
    titreListeCommandes: "Liste Commandes",
    titreEnregister: "Enregistrer",
    titreRealisation: "Réalisation",
    titrePharmacie: "Pharmacie",
    titreCommande: "Commande",
    titreProduitexiste: "Produit existe",
    titreStockindisponible: "Stock indisponible",
    titreLoading: "Chargement...",
    titreLangue:"Langues",
    francais:"Francais",
    anglais:"anglais",
    arabe:"arabe"
  }

  static anglais: any = {
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
    titleMed: "Doctor",
    titreChambre: "Room",
    titreEtage: "Floor",
    titreDateAdmission: "Date Admission",
    titreNumDoss: "Folder Number",
    titreIdentifiant: "Identifier",
    titreDateNaiss: "Birth date",
    titreNationalite: "Nationality",
    titreTel: "Phone",
    titreAdr: "Adress",
    titreAns: "year(s)",
    titreGroupeSanguim: "Blood group",
    titrePoid: "Weight",
    titreTaille: "Size",
    titreecrireICI: "Write Here ...",
    titreancienm2p: "Old password",
    titrenvm2p: "New Password",
    titreconfirmerm2p: "Confirmed Password",
    titreconfirmerbtn: "To confirm",
    titreAutreCliniques: "Other Clinics",
    titreDesignation: "Designation",
    titreValeurs: "Values",
    titreconfirmation: "Confirmation",
    titremessConf: "Want to cancel",
    titreoui: "Yes",
    titreNon: "No",
    titreAnnuler: "Cancel",
    titreQuantite: "Quantity",
    titreAddArticle: "Add Article",
    titreMedecin: "Choose Doctor",
    titreMedecinP: "Doctor P.",
    titreListeCommandes: "Commands list",
    titreEnregister: "Save",
    titreRealisation: "realization",
    titrePharmacie: "Pharmacy",
    titreCommande: "command",
    titreProduitexiste: "Product exists",
    titreStockindisponible: "Stock not available",
    titreLoading: "Loading...",
    titreLangue:"Languages",
    francais:"French",
    anglais:"english",
    arabe:"arabic"


  }

  static urlg = "";
  static uRL = "";
  static path = "";
  static device :number;
  static padingtop :number;
  static langue: any;
  static nomClinique: any;
  static tab: any;

  constructor(public http: Http) {
  }


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
      if (states[networkState] !== "No network connection") {
        Variables.checservice(Variables.uRL).then(res => {
          if (res === false) {
            resolve(false);
            return false;
          }
          else {
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

  public static  checservice(url): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      var xhr = new XMLHttpRequest();
      var file = url;

      xhr.timeout = 1000;
      xhr.open('HEAD', file, true);
      xhr.send();
      xhr.addEventListener("readystatechange", processRequest, false);

      function processRequest(e) {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 304) {
            resolve(true);
            return true;
          } else {
            resolve(false);
            return false;
          }
        }
      }

      return this;
    });
  }


  public static updateUrl(url) {
    Variables.uRL = url.split('//')[0] + "//adminWS:pom@" + url.split('//')[1]+"/";
  }

}
