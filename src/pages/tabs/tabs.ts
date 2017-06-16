import {Component, Injectable, ViewChild} from '@angular/core';
import {DossierPage} from "../dossier/dossier";
import {NavParams, NavController, Platform, Tabs} from 'ionic-angular';
import {ExamenRadioPage} from "../examen-radio/examen-radio";
import {ListPreanesthesiePage} from "../list-preanesthesie/list-preanesthesie";
import {ExamenLaboPage} from "../examen-labo/examen-labo";
import {Variables} from "../../providers/variables";
import {Patient} from "../../models/Patient";
import {Labo} from "../../models/Labo";
import {ExamenRadio} from "../../models/ExamenRadio";
import {LaboFService} from "../../services/LaboFService";
import {LaboTService} from "../../services/LaboTService";
import {tabBadgeLaboService} from "../../services/tabBadgeLaboService";
import {tabBadge} from "../../models/tabBadge";
import {ExamenRadioTService} from "../../services/ExamenRadioTService";
import {ExamenRadioFService} from "../../services/ExamenRadioFService";
import {tabBadgeRadioService} from "../../services/tabBadgeRadioService";
import {ListPreanesthesie} from "../../models/ListPreanesthesie";
import {ListPreanesthesieService} from "../../services/ListPreanesthesieService";
import {tabBadgeListPreanesthesie} from "../../services/tabBadgeListPreanesthesie";
import {ConsignePage} from "../consigne/consigne";
import {Consigne} from "../../models/Consigne";
import {ConsigneService} from "../../services/ConsigneService";
import {tabBadgeConsigneService} from "../../services/tabBadgeConsigneService";
import {SQLite} from "@ionic-native/sqlite";
import {ClientService} from "../../services/ClientService";
import {Client} from "../../models/Client";
import {RealisationPage} from "../realisation/realisation";
import {PharmaciePage} from "../pharmacie/pharmacie";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [Variables]
})
@Injectable()
export class TabsPage {
  @ViewChild("paymentTabs") paymentTabs: Tabs;
  consigneserv: any;
  coountConsigne: number;
  tab1Root: any = DossierPage;
  tab2Root: any = ExamenLaboPage;
  tab3Root: any = ExamenRadioPage;
  tab4Root: any = ListPreanesthesiePage;
  tab5Root: any = ConsignePage;
  tab6Root: any = RealisationPage;
  tab7Root: any = PharmaciePage;
  pass: Patient;
  pdf: string;
  dateFeuille: string;
  static heureActuelle: string;
  tabLangue: any;
  countPdfT: number;
  countPdf: number;
  countPdfs: any;
  countListPreanesthesiess: any;
  countDocs: any;
  tabgLabo: Array<tabBadge> = [];
  tabgConsigne: Array<tabBadge> = [];
  tabgRadio: Array<tabBadge> = [];
  ListPreanesthesies: Array<tabBadge> = [];
  LabosT: Array<Labo> = [];
  LabosF: Array<Labo> = [];
  LabosTs: any;
  LabosFs: any;
  RadiosTs: any;
  RadiosFs: any;
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  coountexamenRT: number;
  coountexamenR: number;
  coountListPreanesthesie: number;
  codeClinique: string;
  connection: boolean;
  ListPreanesthesieByNumeroDossierTest: boolean = false;
  ListeP: Array<ListPreanesthesie> = [];
  ListePserv: any;
  langue: any;
  private consigne: Array<Consigne> = [];
  private coountConsigneT: number;
  private countConsigneserv: any;
  pathimage = Variables.path;
  static tabLangue: any;
  client = new Client();
  clientserv: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private sqlite: SQLite) {
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("mypatient");
    this.tabLangue = navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.coountexamenR = 0;
    this.coountexamenRT = 0;
    this.coountConsigne = 0;
    this.coountConsigneT = 0;
    this.coountListPreanesthesie = 0;
    this.countPdfT = 0;
    this.countPdf = 0;
    this.dateFeuille = navParams.get("dateFeuille"),

      TabsPage.tabLangue = {
        pass: this.pass,
        dateFeuille: this.dateFeuille,
        Labost: this.LabosT,
        Labosf: this.LabosF,
        ListeP: this.ListeP,
        examenRT: this.examenRT,
        examenRF: this.examenRF,
        consigne: this.consigne,
        langue: this.langue,
        tabLangue: this.tabLangue, codeClinique: this.codeClinique,
        typeconsigne: "all",
        etatconsigne: "all",
        heureActuelle: TabsPage.heureActuelle,
        client: this.client
      };

    platform.ready().then(() => {
      Variables.checconnection().then(connexion => {
        if (connexion === false) {
          this.connection = false;
          this.findAllLaboByNumDossierOff(this.pass.getdossier(), this.codeClinique);
          this.GetExamenRadioByNumDossResponseOff(this.pass.getdossier(), this.codeClinique);
          this.findListPreanesthesieByNumeroDossierResponseOff(this.pass.getdossier(), this.codeClinique);
          this.getPlanificationTacheInfirmierByNumDossAndTypeOff(this.pass.getdossier(), this.codeClinique);
        }
        else {
          this.connection = true;
          this.update();
        }
      });
    });
  }

  ngAfterViewInit() {
    if (this.langue === 'arabe') {
      this.paymentTabs.select(5);
    }
  }

  ionViewDidLoad() {
  }

  GetExamenRadioByNumDossResponse(numDoss, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetExamenRadioByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:GetExamenRadioByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.GetExamenRadioByNumDossResponseTest = true;
            var xml = xmlhttp.responseXML;
            var x, i, dE;
            x = xml.getElementsByTagName("return");
            var ex;
            var day = "";
            var month = "";
            var year = "";
            this.coountexamenR = x.length;
            for (i = 0; i < x.length; i++) {
              ex = new ExamenRadio();
              ex.setcompterendu(x[i].children[1].textContent);
              dE = new Date(x[i].children[2].textContent);
              day = dE.getDate();
              month = dE.getMonth() + 1;
              year = dE.getFullYear();
              ex.setdateExamen(day + "/" + month + "/" + year);
              ex.setdesignationExamen(x[i].children[5].textContent);
              if (x[i].childElementCount === 14) {
                ex.setnumeroDossier(x[i].children[10].textContent);
                ex.setobserv(x[i].children[12].textContent);
              }
              else if (x[i].childElementCount === 13) {
                ex.setnumeroDossier(x[i].children[9].textContent);
                ex.setobserv(x[i].children[11].textContent);
              }
              if (ex.getcompterendu() === "true") {
                this.examenRT.push(ex);
                this.coountexamenRT++;

              }
              else if (ex.getcompterendu() === "false") {
                this.examenRF.push(ex);
              }
            }

            if (this.examenRT.length === 0 && this.examenRF.length === 0) {
              this.GetExamenRadioByNumDossResponseTest = false;
            }

            var tRadio = new tabBadge();
            tRadio.setnumDoss(numDoss);
            tRadio.setFichier(this.coountexamenR);
            tRadio.setFichierT(this.coountexamenRT);
            tRadio.setcodeClinique(codeClinique);
            this.tabgRadio.push(tRadio);

            this.RadiosFs = new ExamenRadioFService(this.sqlite);
            this.RadiosFs.verifExamenRadio(this.examenRF, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.RadiosFs.getExamenRadios(this.examenRF, numDoss, codeClinique);
              }
            });

            this.RadiosTs = new ExamenRadioTService(this.sqlite);
            this.RadiosTs.verifExamenRadio(this.examenRT, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.RadiosTs.getExamenRadios(this.examenRT, numDoss, codeClinique);
              }
            });

            this.countDocs = new tabBadgeRadioService(this.sqlite);
            this.countDocs.verifTabBadgeRadio(numDoss, codeClinique).then(res => {
              if (res === false) {
                this.countDocs.getTabBadgeRadio(this.tabgRadio, numDoss, codeClinique);
              }
            });

          } catch (Error) {
            this.GetExamenRadioByNumDossResponseTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetExamenRadioByNumDossResponseOff(numDoss, codeClinique) {
    this.countDocs = new tabBadgeRadioService(this.sqlite);
    this.countDocs.getTabBadgeRadio(this.tabgRadio, numDoss, codeClinique).then(res => {
      this.coountexamenR = res.getFichier();
      this.coountexamenRT = res.getFichierT();
    });

  }

  deleteExamenRadioByNumDossResponse(numDoss, codeClinique) {
    this.countDocs = new tabBadgeRadioService(this.sqlite);
    this.countDocs.deletetabBadgeRadios(numDoss, codeClinique);

    this.RadiosFs = new ExamenRadioFService(this.sqlite);
    this.RadiosFs.deleteExamenRadios(numDoss, codeClinique);

    this.RadiosTs = new ExamenRadioTService(this.sqlite);
    this.RadiosTs.deleteExamenRadios(numDoss, codeClinique);
  }

  findAllLaboByNumDossier(numDoss, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:findAllLaboByNumDossier>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:findAllLaboByNumDossier>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            var xml = xmlhttp.responseXML;
            var x, l, i, drdv;
            x = xml.getElementsByTagName("return");
            var day = "";
            var month = "";
            var year = "";
            this.countPdf = x.length;
            for (i = 0; i < x.length; i++) {
              l = new Labo();
              l.setcodeDemande(x[i].children[0].textContent);
              l.setcontenuePDF(x[i].children[1].textContent);
              drdv = new Date(x[i].children[2].textContent);
              day = drdv.getDate();
              month = drdv.getMonth() + 1;
              year = drdv.getFullYear();
              l.setdateDemande(day + "/" + month + "/" + year);
              l.setmedecinTraitant(x[i].children[7].textContent);
              l.setnumAdmission(x[i].children[9].textContent);
              l.setnumDossier(x[i].children[10].textContent);
              l.setpdf(Variables.uRL + "dmi-web/LaboPDF/" + l.getnumAdmission() + "0.pdf");
              if (l.getcontenuePDF() === "true") {
                this.LabosT.push(l);
                this.countPdfT++;
              }
              else if (l.getcontenuePDF() === "false") {
                this.LabosF.push(l);
              }
            }

            var tLabo = new tabBadge();
            tLabo.setnumDoss(numDoss);
            tLabo.setFichier(this.countPdf);
            tLabo.setFichierT(this.countPdfT);
            tLabo.setcodeClinique(codeClinique);
            this.tabgLabo.push(tLabo);

            this.LabosFs = new LaboFService(this.sqlite);
            this.LabosFs.verifLabo(this.LabosF, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.LabosFs.getLabos(this.LabosF, numDoss, codeClinique);
              }
            });

            this.LabosTs = new LaboTService(this.sqlite);
            this.LabosTs.verifLabo(this.LabosT, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.LabosTs.getLabos(this.LabosT, numDoss, codeClinique);
              }
            });

            this.countPdfs = new tabBadgeLaboService(this.sqlite);
            this.countPdfs.verifTabBadgeLabo(numDoss, codeClinique).then(res => {
              if (res === false) {
                this.countPdfs.getTabBadgeLabo(this.tabgLabo, numDoss, codeClinique);
              }
            });


          } catch (Error) {
          }

        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  findAllLaboByNumDossierOff(numDoss, codeClinique) {
    this.countPdfs = new tabBadgeLaboService(this.sqlite);
    this.countPdfs.getTabBadgeLabo(this.tabgLabo, numDoss, codeClinique).then(res => {
      this.countPdf = res.getFichier();
      this.countPdfT = res.getFichierT();
    });
  }

  deleteAllLaboByNumDossier(numDoss, codeClinique) {
    this.countPdfs = new tabBadgeLaboService(this.sqlite);
    this.countPdfs.deletetabBadgeLabos(numDoss, codeClinique);

    this.LabosFs = new LaboFService(this.sqlite);
    this.LabosFs.deleteLabos(numDoss, codeClinique);

    this.LabosTs = new LaboTService(this.sqlite);
    this.LabosTs.deleteLabos(numDoss, codeClinique);
  }

  findListPreanesthesieByNumeroDossierResponse(numDoss, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:findListPreanesthesieByNumeroDossier>' +
      '<numeroDossier>' + numDoss + '</numeroDossier>' +
      '</ser:findListPreanesthesieByNumeroDossier>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.ListPreanesthesieByNumeroDossierTest = true;
            var xml = xmlhttp.responseXML;
            var x, i, hdebut;
            x = xml.getElementsByTagName("return");
            var LP, hfin;
            var minu = "";
            var second = "";
            var hour = "";
            for (i = 0; i < x.length; i++) {
              LP = new ListPreanesthesie();
              LP.setacte(x[i].children[0].textContent);
              LP.setchirurgien(x[i].children[1].textContent);
              LP.setdateacte(x[0].children[8].textContent);
              hdebut = new Date(x[0].children[14].textContent);
              minu = hdebut.getMinutes();
              hour = hdebut.getHours();
              second = hdebut.getSeconds();
              LP.setheureDebut(hour + " : " + minu + " : " + second);
              hfin = new Date(x[0].children[15].textContent);
              minu = hfin.getMinutes();
              hour = hfin.getHours();
              second = hfin.getSeconds();
              LP.setheureFin(hour + " : " + minu + " : " + second);
              LP.setkc(x[i].children[18].textContent);
              LP.setnumeroDossier(x[i].children[21].textContent);
              this.coountListPreanesthesie++;
              this.ListeP.push(LP);
            }
            if (this.ListeP.length === 0) {
              this.ListPreanesthesieByNumeroDossierTest = false;
            } else {
              this.ListePserv = new ListPreanesthesieService(this.sqlite);
              this.ListePserv.verifListPreanesthesie(this.ListeP, numDoss, codeClinique).then(res => {
                if (res === false) {
                  this.ListePserv.getListPreanesthesies(this.ListeP, numDoss, codeClinique);
                }
              });
            }


            var tList = new tabBadge();
            tList.setnumDoss(numDoss);
            tList.setFichier(this.coountListPreanesthesie);
            tList.setFichierT(0);
            tList.setcodeClinique(codeClinique);
            this.ListPreanesthesies.push(tList);

            this.countListPreanesthesiess = new tabBadgeListPreanesthesie(this.sqlite);
            this.countListPreanesthesiess.verifTabBadgeList(numDoss, codeClinique).then(res => {
              if (res === false) {
                this.countListPreanesthesiess.getTabBadgeList(this.ListPreanesthesies, numDoss, codeClinique);
              }
            });


          } catch (Error) {
            this.ListPreanesthesieByNumeroDossierTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  findListPreanesthesieByNumeroDossierResponseOff(numDoss, codeClinique) {
    this.countListPreanesthesiess = new tabBadgeListPreanesthesie(this.sqlite);
    this.countListPreanesthesiess.getTabBadgeList(this.ListPreanesthesies, numDoss, codeClinique).then(res => {
      this.coountListPreanesthesie = res.getFichier();
    });
  }

  deleteListPreanesthesieByNumeroDossierResponser(numDoss, codeClinique) {
    this.countListPreanesthesiess = new tabBadgeListPreanesthesie(this.sqlite);
    this.countListPreanesthesiess.deletetabBadgeLists(numDoss, codeClinique);

    this.ListePserv = new ListPreanesthesieService(this.sqlite);
    this.ListePserv.deleteListPreanesthesies(numDoss, codeClinique);
  }

  getPlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getPlanificationTacheInfirmierByNumDossAndType>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '<type>' + type + '</type>' +
      '<etat>' + etat + '</etat>' +
      '</ser:getPlanificationTacheInfirmierByNumDossAndType>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml;
          xml = xmlhttp.responseXML;
          var x, i, c, d;
          x = xml.getElementsByTagName("return");
          var date = new Date();
          date.setFullYear(Number(this.dateFeuille.substr(6, 4)));
          date.setMonth(Number(this.dateFeuille.substr(3, 2)) - 1);
          date.setDate(Number(this.dateFeuille.substr(0, 2)));
          date.setHours(0);
          date.setMinutes(0);

          for (i = x.length - 1; i >= 0; i--) {
            c = new Consigne();
            if (x[i].childElementCount === 17) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[5].textContent);
              c.setdetails(x[i].children[6].textContent);
              c.setetat(x[i].children[7].textContent);
              c.setheurtache(x[i].children[8].textContent);
              c.setnumeroDossier(x[i].children[11].textContent);
              c.setuserCreate(x[i].children[14].textContent);
              c.setcodeClinique(codeClinique);
            }
            else if (x[i].childElementCount > 17) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setnumeroDossier(x[i].children[12].textContent);
              c.setuserCreate(x[i].children[15].textContent);
              c.setcodeClinique(codeClinique);
            }
            d = new Date(c.getheurtache());
            if ((date < d) && (c.getetat() === 'NL' || c.getetat() === 'AF' || c.getetat() === 'F')) {
              this.consigne.push(c);
              if (c.getetat() === "F") {
                this.coountConsigneT++;
              }
            }
          }
          this.coountConsigne = this.consigne.length;
          this.consigneserv = new ConsigneService(this.sqlite);
          this.consigneserv.verifConsigne(this.consigne, numDoss, codeClinique, type, etat).then(res => {
            if (res === false) {
              this.consigneserv.getConsignes(this.consigne, numDoss, codeClinique, type, etat);
            }
          });

          var tConsigne = new tabBadge();
          tConsigne.setnumDoss(numDoss);
          tConsigne.setFichier(this.coountConsigne);
          tConsigne.setFichierT(this.coountConsigneT);
          tConsigne.setcodeClinique(codeClinique);
          this.tabgConsigne.push(tConsigne);

          this.countConsigneserv = new tabBadgeConsigneService(this.sqlite);
          this.countConsigneserv.verifTabBadgeConsigne(numDoss, codeClinique).then(res => {
            if (res === false) {
              this.countConsigneserv.getTabBadgeConsigne(this.tabgConsigne, numDoss, codeClinique);
            }
          });
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  getPlanificationTacheInfirmierByNumDossAndTypeOff(numDoss, codeClinique) {
    this.countConsigneserv = new tabBadgeConsigneService(this.sqlite);
    this.countConsigneserv.getTabBadgeConsigne(this.tabgConsigne, numDoss, codeClinique).then(res => {
      this.coountConsigne = res.getFichier();
      this.coountConsigneT = res.getFichierT();
    });
  }

  deletePlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique) {
    this.countConsigneserv = new tabBadgeConsigneService(this.sqlite);
    this.countConsigneserv.deletetabBadgeConsignes(numDoss, codeClinique);

    this.consigneserv = new ConsigneService(this.sqlite);
    this.consigneserv.deleteConsignes(numDoss, codeClinique);
  }

  GetGetFullDate() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetFullDate/>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x;
          x = xml.getElementsByTagName("return");
          TabsPage.heureActuelle = x[0].childNodes[0].nodeValue;
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetClientByNumDoss(numDoss) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetClientByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:GetClientByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          var xml = xmlhttp.responseXML;
          var x;
          x = xml.getElementsByTagName("return");
          var d, d2;
          d = new Date();
          this.client.setadrCli(x[0].children[0].textContent);
          d = (x[0].children[3].textContent).substr(0, 9);
          this.client.setdatNai(d);
          this.client.setlibNat(x[0].children[1].textContent);
          this.client.setnumTel(x[0].children[38].textContent);
          this.client.setetage(x[0].children[36].children[0].children[3].textContent);
          this.client.setlibelle(x[0].children[36].children[0].children[8].textContent);
          this.client.setnumCha(x[0].children[36].children[2].textContent);
          this.client.setnumdoss(x[0].children[37].textContent);
          this.client.setidentifiant(x[0].children[18].textContent);
          d2 = (x[0].children[4].textContent).substr(0, 9);
          this.client.setdateArr(d2);
          this.client.setcodeClinique(this.codeClinique);
          this.clientserv = new ClientService(this.sqlite);
          this.clientserv.verifClient(this.client, numDoss, this.codeClinique).then(res => {
            if (res === false) {
              this.clientserv.getClients(this.client, numDoss, this.codeClinique);
            }
          });
        }
      }
    }

    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  tabBadgepdf() {
    if (this.countPdf === 0) {
      return null;
    } else {
      return this.countPdfT + "/" + this.countPdf;
    }
  }

  tabBadgeexamenR() {
    if (this.coountexamenR === 0) {
      return null;
    } else {
      return this.coountexamenRT + "/" + this.coountexamenR;
    }
  }

  tabBadgePreanesthesie() {
    if (this.coountListPreanesthesie === 0) {
      return null;
    } else {
      return this.coountListPreanesthesie;
    }
  }

  tabBadgeC() {
    if (this.coountConsigne === 0) {
      return null;
    } else {
      return this.coountConsigneT + "/" + this.coountConsigne;
    }
  }

  update() {
    this.GetGetFullDate();

    this.GetClientByNumDoss(this.pass.getdossier());

    this.deleteAllLaboByNumDossier(this.pass.getdossier(), this.codeClinique);
    this.findAllLaboByNumDossier(this.pass.getdossier(), this.codeClinique);

    this.deleteExamenRadioByNumDossResponse(this.pass.getdossier(), this.codeClinique);
    this.GetExamenRadioByNumDossResponse(this.pass.getdossier(), this.codeClinique);

    this.deleteListPreanesthesieByNumeroDossierResponser(this.pass.getdossier(), this.codeClinique);
    this.findListPreanesthesieByNumeroDossierResponse(this.pass.getdossier(), this.codeClinique);

    this.deletePlanificationTacheInfirmierByNumDossAndType(this.pass.getdossier(), "all", "all", this.codeClinique)
    this.getPlanificationTacheInfirmierByNumDossAndType(this.pass.getdossier(), "all", "all", this.codeClinique);
  }

}
