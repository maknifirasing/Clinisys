import {Component, Injectable} from '@angular/core';
import {DossierPage} from "../dossier/dossier";
import {NavParams, NavController, Platform} from 'ionic-angular';
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
import {HistDossierService} from "../../services/HistDossierService";
import {HistDossier} from "../../models/HistDossier";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [Variables]
})
@Injectable()
export class TabsPage {
  consigneserv: any;
  coountConsigne: number;
  tab1Root: any = DossierPage;
  tab2Root: any = ExamenRadioPage;
  tab3Root: any = ListPreanesthesiePage;
  tab4Root: any = ExamenLaboPage;
  tab5Root: any = ConsignePage;
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
  tabgConsigne: Array<tabBadge> = [];
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
  codeClinique: string;
  connection: boolean;
  ListPreanesthesieByNumeroDossierTest: boolean = false;
  ListeP: Array<ListPreanesthesie> = [];
  ListePserv: any;
  langue: any;
  private consigne: Array<Consigne> = [];
  private coountConsigneT: number;
  private countConsigneserv: any;

  constructor(public navParams: NavParams, private Url: Variables, public platform: Platform) {
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
    this.tabLangue = {
      pass: navParams.get("mypatient"),
      dateFeuille: navParams.get("dateFeuille"),
      Labost: this.LabosT,
      Labosf: this.LabosF,
      ListeP: this.ListeP,
      examenRT: this.examenRT,
      examenRF: this.examenRF,
      consigne: this.consigne,
      langue: this.langue,
      tabLangue: this.tabLangue, codeClinique: this.codeClinique,
      typeconsigne: "all",
      etatconsigne: "all"
    };
    this.platform.ready().then(() => {
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
    this.countDocs = new tabBadgeRadioService();
    this.countDocs.getTabBadgeRadio(this.tabgRadio, numDoss, codeClinique).then(res => {
      this.coountexamenR = res.getFichier();
      this.coountexamenRT = res.getFichierT();
    });

  }

  deleteExamenRadioByNumDossResponse(numDoss, codeClinique) {
    this.countDocs = new tabBadgeRadioService();
    this.countDocs.deletetabBadgeRadios(numDoss, codeClinique);

    this.RadiosFs = new ExamenRadioFService();
    this.RadiosFs.deleteExamenRadios(numDoss, codeClinique);

    this.RadiosTs = new ExamenRadioTService();
    this.RadiosTs.deleteExamenRadios(numDoss, codeClinique);
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
              l.setmedecinTraitant(x[i].children[7].textContent);
              l.setnumAdmission(x[i].children[9].textContent);
              l.setnumDossier(x[i].children[10].textContent);
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
    this.countPdfs = new tabBadgeLaboService();
    this.countPdfs.getTabBadgeLabo(this.tabgLabo, numDoss, codeClinique).then(res => {
      this.countPdf = res.getFichier();
      this.countPdfT = res.getFichierT();
    });
  }

  deleteAllLaboByNumDossier(numDoss, codeClinique) {
    this.countPdfs = new tabBadgeLaboService();
    this.countPdfs.deletetabBadgeLabos(numDoss, codeClinique);

    this.LabosFs = new LaboFService();
    this.LabosFs.deleteLabos(numDoss, codeClinique);

    this.LabosTs = new LaboTService();
    this.LabosTs.deleteLabos(numDoss, codeClinique);
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

  findListPreanesthesieByNumeroDossierResponseOff(numDoss, codeClinique) {
    this.countListPreanesthesiess = new tabBadgeListPreanesthesie();
    this.countListPreanesthesiess.getTabBadgeList(this.ListPreanesthesies, numDoss, codeClinique).then(res => {
      this.coountListPreanesthesie = res.getFichier();
    });
  }

  deleteListPreanesthesieByNumeroDossierResponser(numDoss, codeClinique) {
    this.countListPreanesthesiess = new tabBadgeListPreanesthesie();
    this.countListPreanesthesiess.deletetabBadgeLists(numDoss, codeClinique);

    this.ListePserv = new ListPreanesthesieService();
    this.ListePserv.deleteListPreanesthesies(numDoss, codeClinique);
  }

  getPlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
          var x, i;
          x = xml.getElementsByTagName("return");

          var c;
          var tempsEnMs = new Date().getFullYear();
          var d;
          for (i = 0; i < x.length; i++) {
            c = new Consigne();
            if (x[i].childElementCount === 19) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setnumeroDossier(x[i].children[13].textContent);
              c.setuserCreate(x[i].children[16].textContent);
              c.setcodeClinique(codeClinique);
            }
            else if (x[i].childElementCount === 18) {
              c.setcodeMedecin(x[i].children[1].textContent);
              c.setdatetache(x[i].children[6].textContent);
              c.setdetails(x[i].children[7].textContent);
              c.setetat(x[i].children[8].textContent);
              c.setheurtache(x[i].children[9].textContent);
              c.setnumeroDossier(x[i].children[12].textContent);
              c.setuserCreate(x[i].children[15].textContent);
              c.setcodeClinique(codeClinique);
            }
            this.consigne.push(c);
            if (c.getetat() === "F") {
              this.coountConsigneT++;
            }
          }
          this.coountConsigne = this.consigne.length;
          this.consigneserv = new ConsigneService();
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

          this.countConsigneserv = new tabBadgeConsigneService();
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
    this.countConsigneserv = new tabBadgeConsigneService();
    this.countConsigneserv.getTabBadgeConsigne(this.tabgConsigne, numDoss, codeClinique).then(res => {
      this.coountConsigne = res.getFichier();
      this.coountConsigneT = res.getFichierT();
    });
  }

  deletePlanificationTacheInfirmierByNumDossAndType(numDoss, type, etat, codeClinique) {
    this.countConsigneserv = new tabBadgeConsigneService();
    this.countConsigneserv.deletetabBadgeConsignes(numDoss, codeClinique);

    this.consigneserv = new ConsigneService();
    this.consigneserv.deleteConsignes(numDoss, codeClinique);
  }

  update() {
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
