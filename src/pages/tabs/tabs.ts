import {Component, Injectable} from '@angular/core';
import {DossierPage} from "../dossier/dossier";
import {NavParams, NavController} from 'ionic-angular';
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

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [Variables]
})
@Injectable()
export class TabsPage {
  tab1Root: any = DossierPage;
  tab2Root: any = ExamenRadioPage;
  tab3Root: any = ListPreanesthesiePage;
  tab4Root: any = ExamenLaboPage;
  pass: Patient;
  pdf: string;
  dateFeuille: string;
  tabLangue: any;
  countPdfT: number;
  countPdf: number;
  countPdfs: any;
  countListPreanesthesiess: any;
  countDocs: any;
  public navCtrl: NavController;
  tabgLabo: Array<tabBadge> = [];
  tabgRadio: Array<tabBadge> = [];
  ListPreanesthesies: Array<tabBadge> = [];
  LabosT: Array<Labo> = [];
  LabosF: Array<Labo> = [];
  LabosTs: any;
  LabosFs: any;
  RadiosTs: any;
  RadiosFs: any;
  a: any;
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  coountexamenRT: number;
  coountexamenR: number;
  coountListPreanesthesie: number;
  tab1: string;
  tab2: string;
  tab3: string;
  tab4: string;
  codeClinique: string;
  connection: boolean;
  ListPreanesthesieByNumeroDossierTest: boolean = false;
  ListeP: Array<ListPreanesthesie> = [];
  ListePserv: any;
  langue: any;

  constructor(public navParams: NavParams, private Url: Variables) {
    this.codeClinique = navParams.get("codeClinique");
    this.pass = navParams.get("mypatient");
    this.tabLangue=navParams.get("tabLangue");
    this.langue = navParams.get("langue");
    this.coountexamenR = 0;
    this.coountexamenRT = 0;
    this.coountListPreanesthesie = 0;
    this.countPdfT = 0;
    this.countPdf = 0;
    Variables.checconnection().then(connexion=> {
      if (connexion === false) {
        this.connection = false;
        this.findAllLaboByNumDossierOff(this.pass.getdossier(), this.codeClinique);
        this.GetExamenRadioByNumDossResponseOff(this.pass.getdossier(), this.codeClinique);
        this.findListPreanesthesieByNumeroDossierResponseOff(this.ListeP, this.pass.getdossier(), this.codeClinique);
      }
      else {
        this.connection = true;
        this.findAllLaboByNumDossier(this.pass.getdossier(), this.codeClinique);
        this.GetExamenRadioByNumDossResponse(this.pass.getdossier(), this.codeClinique);
        this.findListPreanesthesieByNumeroDossierResponse(this.pass.getdossier(), this.codeClinique);
      }
    });
    this.tabLangue = {
      pass: navParams.get("mypatient"),
      dateFeuille: navParams.get("dateFeuille"),
      Labost: this.LabosT,
      Labosf: this.LabosF,
      ListeP: this.ListeP,
      examenRT: this.examenRT,
      examenRF: this.examenRF,
      langue: this.langue,
      tabLangue: this.tabLangue, codeClinique: this.codeClinique
    };
  }

  ionViewDidLoad() {
  }

  GetExamenRadioByNumDossResponse(numDoss, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
            var x, i, dE, dP, drdv, hP;
            x = xml.getElementsByTagName("return");
            var ex;
            var day = "";
            var month = "";
            var year = "";
            var minu = "";
            var second = "";
            var hour = "";
            this.coountexamenR = x.length;
            for (i = 0; i < x.length; i++) {
              ex = new ExamenRadio();
              ex.setcodeExamen(x[i].children[0].textContent);
              ex.setcompterendu(x[i].children[1].textContent);
              dE = new Date(x[i].children[2].textContent);
              day = dE.getDate();
              month = dE.getMonth() + 1;
              year = dE.getFullYear();
              ex.setdateExamen(day + "/" + month + "/" + year);
              dP = new Date(x[i].children[3].textContent);
              day = dP.getDate();
              month = dP.getMonth() + 1;
              year = dP.getFullYear();
              ex.setdatePrevu(day + "/" + month + "/" + year);
              drdv = new Date(x[i].children[4].textContent);
              day = drdv.getDate();
              month = drdv.getMonth() + 1;
              year = drdv.getFullYear();
              ex.setdate_RDV(day + "/" + month + "/" + year);
              ex.setdesignationExamen(x[i].children[5].textContent);
              hP = new Date(x[i].children[6].textContent);
              minu = hP.getMinutes();
              hour = hP.getHours();
              second = hP.getSeconds();
              ex.setheurePrevu(hour + " : " + minu + " : " + second);
              ex.setidres(x[i].children[7].textContent);
              if (x[i].childElementCount === 14) {
                ex.setmedecin(x[i].children[8].textContent);
                ex.setnature(x[i].children[9].textContent);
                ex.setnumeroDossier(x[i].children[10].textContent);
                ex.setnumeroExamen(x[i].children[11].textContent);
                ex.setobserv(x[i].children[12].textContent);
                ex.setresultat(x[i].children[13].textContent);
              }
              else if (x[i].childElementCount === 13) {
                ex.setmedecin(null);
                ex.setnature(x[i].children[8].textContent);
                ex.setnumeroDossier(x[i].children[9].textContent);
                ex.setnumeroExamen(x[i].children[10].textContent);
                ex.setobserv(x[i].children[11].textContent);
                ex.setresultat(x[i].children[12].textContent);
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

            this.RadiosFs = new ExamenRadioFService();
            this.RadiosFs.verifExamenRadio(this.examenRF, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.RadiosFs.getExamenRadios(this.examenRF, numDoss, codeClinique);
              }
            });

            this.RadiosTs = new ExamenRadioTService();
            this.RadiosTs.verifExamenRadio(this.examenRT, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.RadiosTs.getExamenRadios(this.examenRT, numDoss, codeClinique);
              }
            });

            this.countDocs = new tabBadgeRadioService();
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
    this.RadiosTs = new ExamenRadioTService();
    this.examenRT = this.RadiosTs.getExamenRadios(this.examenRT, numDoss, codeClinique);

    this.RadiosFs = new ExamenRadioFService();
    this.examenRF = this.RadiosFs.getExamenRadios(this.examenRF, numDoss, codeClinique);

    this.countDocs = new tabBadgeRadioService();
    this.countDocs.getTabBadgeRadio(this.tabgRadio, numDoss, codeClinique).then(res => {
      this.coountexamenR = res.getFichier();
      this.coountexamenRT = res.getFichierT();
    });

  }

  findAllLaboByNumDossier(numDoss, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
              drdv = new Date(x[i].children[3].textContent);
              day = drdv.getDate();
              month = drdv.getMonth() + 1;
              year = drdv.getFullYear();
              l.setdateRealisation(day + "/" + month + "/" + year);
              l.setdesignation(x[i].children[4].textContent);
              l.setetatExamen(x[i].children[5].textContent);
              l.setid(x[i].children[6].textContent);
              l.setmedecinTraitant(x[i].children[7].textContent);
              l.setnomLabo(x[i].children[8].textContent);
              l.setnumAdmission(x[i].children[9].textContent);
              l.setnumDossier(x[i].children[10].textContent);
              l.setpatient(x[i].children[11].textContent);
              l.setstate(x[i].children[12].textContent);
              l.setuserName(x[i].children[13].textContent);
              l.setvalidation(x[i].children[14].textContent);
              l.setpdf(this.Url.url + "dmi-web/LaboPDF/" + l.getnumAdmission() + "0.pdf");
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


            this.LabosFs = new LaboFService();
            this.LabosFs.verifLabo(this.LabosF, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.LabosFs.getLabos(this.LabosF, numDoss, codeClinique);
              }
            });

            this.LabosTs = new LaboTService();
            this.LabosTs.verifLabo(this.LabosT, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.LabosTs.getLabos(this.LabosT, numDoss, codeClinique);
              }
            });

            this.countPdfs = new tabBadgeLaboService();
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
    this.LabosFs = new LaboFService();
    this.LabosF = this.LabosFs.getLabos(this.LabosF, numDoss, codeClinique);

    this.LabosTs = new LaboTService();
    this.LabosT = this.LabosTs.getLabos(this.LabosT, numDoss, codeClinique);

    this.countPdfs = new tabBadgeLaboService();
    this.countPdfs.getTabBadgeLabo(this.tabgLabo, numDoss, codeClinique).then(res => {
      this.countPdf = res.getFichier();
      this.countPdfT = res.getFichierT();
    });
  }

  findListPreanesthesieByNumeroDossierResponse(numDoss, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
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
              LP.setcodeActe(x[i].children[2].textContent);
              LP.setcodeExamen(x[i].children[3].textContent);
              LP.setcodeMedecinReanimateur(x[i].children[4].textContent);
              LP.setcodeMedecinchirurgi(x[i].children[5].textContent);
              LP.setcodeMedecinchirurgien(x[i].children[6].textContent);
              LP.setcodePostop(x[i].children[7].textContent);
              LP.setdateacte(x[0].children[8].textContent);
              LP.setdatedemande(x[0].children[8].textContent);
              LP.setetatReservationBloc(x[i].children[10].textContent);
              LP.sethasAnesth(x[i].children[11].textContent);
              LP.sethasPost(x[i].children[12].textContent);
              LP.sethasPre(x[i].children[13].textContent);
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
              LP.setid(x[i].children[16].textContent);
              LP.setidentifiant(x[i].children[17].textContent);
              LP.setkc(x[i].children[18].textContent);
              LP.setnom(x[i].children[19].textContent);
              LP.setnomReanimateur(x[i].children[20].textContent);
              LP.setnumeroDossier(x[i].children[21].textContent);
              LP.setprenom(x[i].children[22].textContent);
              this.coountListPreanesthesie++;
              this.ListeP.push(LP);
            }
            if (this.ListeP.length === 0) {
              this.ListPreanesthesieByNumeroDossierTest = false;
            } else {
              this.ListePserv = new ListPreanesthesieService();
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

            this.countListPreanesthesiess = new tabBadgeListPreanesthesie();
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

  findListPreanesthesieByNumeroDossierResponseOff(ListeP, numDoss, codeClinique) {
    this.ListePserv = new ListPreanesthesieService();
    this.ListeP = this.ListePserv.getListPreanesthesies(ListeP, numDoss, codeClinique);

    this.countListPreanesthesiess = new tabBadgeListPreanesthesie();
    this.countListPreanesthesiess.getTabBadgeList(this.ListPreanesthesies, numDoss, codeClinique).then(res => {
      this.coountListPreanesthesie = res.getFichier();
    });
  }
}
