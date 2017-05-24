import {Component} from "@angular/core";
import {NavController, NavParams, Platform, ViewController} from "ionic-angular";
import {MotifHospitalisation} from "../../models/motifHospitalisation";
import {SigneClinique} from "../../models/SigneClinique";
import {Traitement} from "../../models/Traitement";
import {Evenement} from "../../models/Evenement";
import {Rigime} from "../../models/Rigime";
import {Variables} from "../../providers/variables";
import {SigneCliniqueAlertService} from "../../services/SigneCliniqueAlertService";
import {TraitementService} from "../../services/TraitementService";
import {EvenementConService} from "../../services/EvenementConService";
import {EvenementEvoService} from "../../services/EvenementEvoService";
import {EvenementExaService} from "../../services/EvenementExaService";
import {EvenementHisService} from "../../services/EvenementHisService";
import {motifHospitalisationService} from "../../services/motifHospitalisationService";
import {RigimeService} from "../../services/RigimeService";
import {SigneCliniqueEntService} from "../../services/SigneCliniqueEntService";
import {SigneCliniqueSorService} from "../../services/SigneCliniqueSorService";
import {SigneCliniqueSigService} from "../../services/SigneCliniqueSigService";
import {AntecCh} from "../../models/AntecCh";
import {AlegchService} from "../../services/AlegchService";
import {AntechService} from "../../services/AntechService";
import {HistDossierService} from "../../services/HistDossierService";
import {HistDossier} from "../../models/HistDossier";
import {SigneCourbePage} from "../signe-courbe/signe-courbe";
import {ClientDetailPage} from "../client-detail/client-detail";
import {TraitmentCourbe} from "../traitment-courbe/traitment-courbe";
import {Patient} from "../../models/Patient";
import {SQLite} from "@ionic-native/sqlite";
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-dossier',
  templateUrl: 'dossier.html',
  providers: [ScreenOrientation, Variables]
})

export class DossierPage {
  motifh = new MotifHospitalisation();
  mserv: any;
  alechl: Array<AntecCh> = [];
  antechl: Array<AntecCh> = [];
  antecserv: any;
  alegserv: any;
  signe: Array<SigneClinique> = [];
  disig: string;
  test: boolean;
  AlerteSigneCliniqueTest: boolean = false;
  AntecedentAllergieTest: boolean = false;
  stringAlerg: string = "";
  stringAntec: string = "";
  Alerg: boolean = false;
  Ante: boolean = false;
  codeType: string;
  codeTypeOf: string;
  traitement: Array<Traitement> = [];
  traitementServ: any;
  Histoiremaladie: Array<Evenement> = [];
  Evolution: Array<Evenement> = [];
  Examenclinique: Array<Evenement> = [];
  Conclusion: Array<Evenement> = [];
  signec: Array<SigneClinique> = [];
  Entrees: Array<SigneClinique> = [];
  Sorties: Array<SigneClinique> = [];
  rigime: Array<Rigime> = [];
  rigimeserv: any;
  trait: boolean;
  His: boolean;
  Evo: boolean;
  Exa: boolean;
  Con: boolean;
  Ri: boolean;
  AlerteS: boolean;
  Sor: boolean;
  Ent: boolean;
  connection: boolean;
  signeCliniqueEntS: any;
  signeCliniqueSorS: any;
  signeCliniqueSigS: any;
  signeCliniqueAlertS: any;
  EvenementConS: any;
  EvenementEvoS: any;
  EvenementExaS: any;
  EvenementHisS: any;
  histserv: any;
  histd = new HistDossier();
  static hist: any;
  codeClinique: any;
  tabLangue: any;
  pass = new Patient();
  dateFeuille: any;
  langue: any;
  static motifhh = new MotifHospitalisation();
  pathimage = Variables.path;
  device=Variables.device;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public platform: Platform, private sqlite: SQLite, private screenOrientation: ScreenOrientation) {
    this.codeClinique = TabsPage.tabLangue.codeClinique;
    this.tabLangue = TabsPage.tabLangue.tabLangue;
    this.pass = TabsPage.tabLangue.pass;
    this.dateFeuille = TabsPage.tabLangue.dateFeuille;
    this.langue = TabsPage.tabLangue.langue;
    this.screenOrientation.unlock();
    this.viewCtrl.showBackButton(true);

    if (this.pass.getnature() === "REA") {
      this.codeType = "'1','G','L','E','7','I','9','A','3'";
      this.codeTypeOf = "1GLE7I9A3";
    }
    else if (this.pass.getnature() === "sur") {
      this.codeType = "'1','3','4'";
      this.codeTypeOf = "134";
    }
    Variables.checconnection().then(res => {
      if (res === false) {
        this.connection = false;
        this.historiqueOff(this.histd, this.pass.getdossier(), this.codeClinique);
        this.updateOff();
      }
      else {
        this.connection = true;
        this.historique(this.pass.getdossier(), this.codeClinique);
        this.update();
      }
    });
  }

  GetAlerteSigneClinique(numDoss, dateFeuille, nature, codeClinique) {
    this.signe.pop();
    this.signe = [];
    this.signe.length = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '  <ser:GetAlerteSigneClinique>' +
      '<numdoss>' + numDoss + '</numdoss>' +
      '<dateFeuille>' + dateFeuille + '</dateFeuille>' +
      '<nature>' + nature + '</nature>' +
      '</ser:GetAlerteSigneClinique>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.AlerteSigneCliniqueTest = true;
            var xml = xmlhttp.responseXML;
            var x, i;
            x = xml.getElementsByTagName("return");
            var s;
            for (i = 0; i < x.length; i++) {
              s = new SigneClinique();
              s.setcodeType(x[i].children[0].textContent);
              s.setdate(x[i].children[1].textContent);
              s.setdesignation(x[i].children[2].textContent);
              s.setquantite(x[i].children[3].textContent);
              this.signe.push(s);
            }
            if (this.signe.length === 0) {
              this.AlerteSigneCliniqueTest = false;
            }
          } catch (Error) {
            this.AlerteSigneCliniqueTest = false;
          }
          this.signeCliniqueAlertS = new SigneCliniqueAlertService(this.sqlite);
          this.signeCliniqueAlertS.verifSigneCliniqueAlert(this.signe, numDoss, dateFeuille, nature, codeClinique).then(res => {
            if (res === false) {
              this.signeCliniqueAlertS.getSigneCliniquesAlert(this.signe, numDoss, dateFeuille, nature, codeClinique);
            }
          });
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetAlerteSigneCliniqueOff(signe, numDoss, dateFeuille, nature, codeClinique) {
    this.signeCliniqueAlertS = new SigneCliniqueAlertService(this.sqlite);
    this.signeCliniqueAlertS.verifSigneCliniqueAlert(signe, numDoss, dateFeuille, nature, codeClinique).then(res => {
      if (res === true) {
        this.signe = this.signeCliniqueAlertS.getSigneCliniquesAlert(signe, numDoss, dateFeuille, nature, codeClinique);
        this.AlerteSigneCliniqueTest = true;
      }
    });
  }

  DeleteGetAlerteSigneClinique(numDoss, dateFeuille, nature, codeClinique) {

    this.traitementServ = new TraitementService(this.sqlite);
    this.traitementServ.deleteTraitements(numDoss, dateFeuille, nature, codeClinique);
  }

  getAntecedentAllergieByIdentifiant(idpass, codeClinique) {
    this.stringAlerg = "";
    this.stringAntec = "";
    this.alechl.pop();
    this.alechl = [];
    this.alechl.length = 0;
    this.antechl.pop();
    this.antechl = [];
    this.antechl.length = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:getAntecedentAllergieByIdentifiant>' +
      '<identifiant>' + idpass + '</identifiant>' +
      '</ser:getAntecedentAllergieByIdentifiant>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.AntecedentAllergieTest = true;
            this.disig = "";
            var xml = xmlhttp.responseXML;
            var x, i;
            x = xml.getElementsByTagName("return");
            for (i = 0; i < x.length; i++) {
              if (!((x[i].children[0].children[0].textContent) === ("A000")) && (!((x[i].children[0].children[0].textContent) === ("A255")))) {
                if ((x[i].children[0].children[1].textContent) === ("FA02")) // Allergie
                {
                  if ((x[i].children[0].children[0].textContent).toUpperCase() === ("ALER")) {
                    this.stringAlerg += (x[i].children[4].textContent) + ", ";
                    this.Alerg = true;

                  }
                  else {
                    this.stringAlerg += (x[i].children[0].children[2].textContent) + ", ";
                    this.Alerg = true;
                  }
                }
                else // Antécédent
                {
                  if ((x[i].children[0].children[1].textContent).toUpperCase() === ("AUTR")) {
                    this.stringAntec += (x[i].children[4].textContent) + ", ";
                    this.Ante = true;
                  }
                  else {
                    this.stringAntec += (x[i].children[0].children[2].textContent) + ", ";
                    this.Ante = true;
                  }
                }

              }


            }

            var antech = new AntecCh();

            antech.setidpass(idpass);
            antech.setch(this.stringAntec);

            this.antechl.push(antech);

            this.antecserv = new AntechService(this.sqlite);
            this.antecserv.verifAntec(this.antechl, idpass, codeClinique).then(res => {
              if (res === false) {
                this.antecserv.getAntecs(this.antechl, idpass, codeClinique);
              }
            });

            var alech = new AntecCh();

            alech.setidpass(idpass);
            alech.setch(this.stringAlerg);

            this.alechl.push(alech);

            this.alegserv = new AlegchService(this.sqlite);
            this.alegserv.verifAleg(this.alechl, idpass, codeClinique).then(res => {
              if (res === false) {
                this.alegserv.getAlegs(this.alechl, idpass, codeClinique);
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

  getAntecedentAllergieByIdentifiantOff(antec, aleg, idpass, codeClinique) {
    this.antecserv = new AntechService(this.sqlite);
    this.antecserv.verifAntec(this.antechl, idpass, codeClinique).then(res => {
      if (res === true) {
        this.antechl = this.antecserv.getAntecs(antec, idpass, codeClinique);
        this.Ante = true;
      }
    });

    this.alegserv = new AlegchService(this.sqlite);
    this.alegserv.verifAleg(this.alechl, idpass, codeClinique).then(res => {
      if (res === true) {
        this.alechl = this.alegserv.getAlegs(aleg, idpass, codeClinique);
        this.Alerg = true;
      }
    });
  }

  DeletegetAntecedentAllergieByIdentifiant(idpass, codeClinique) {
    this.antecserv = new AntechService(this.sqlite);
    this.antecserv.deleteAntecs(idpass, codeClinique);

    this.alegserv = new AlegchService(this.sqlite);
    this.alegserv.deleteAlegs(idpass, codeClinique);
  }

  GetAllMotifHospitalisationByNumDoss(numDoss, codeClinique) {
    this.test = false;
    DossierPage.motifhh = new MotifHospitalisation();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetAllMotifHospitalisationByNumDoss>' +
      '<numDoss>' + numDoss + '</numDoss>' +
      '</ser:GetAllMotifHospitalisationByNumDoss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.test = true;
            var xml = xmlhttp.responseXML;
            var x;
            x = xml.getElementsByTagName("return");
            this.motifh.setgroupeSang(x[0].children[3].textContent);
            this.motifh.setmotifhospitalisation(x[0].children[7].textContent);
            this.motifh.setnumdoss(x[0].children[8].textContent);
            this.motifh.setpoid(x[0].children[10].textContent);
            this.motifh.settaille(x[0].children[11].textContent);

            DossierPage.motifhh = this.motifh;
            if (this.motifh.getnumdoss() === "") {
              this.test = false;
            }
            this.mserv = new motifHospitalisationService(this.sqlite);
            this.mserv.verifmotifHospitalisation(this.motifh, numDoss, codeClinique).then(res => {
              if (res === false) {
                this.mserv.getmotifHospitalisations(this.motifh, numDoss, codeClinique);
              }
            });

          } catch (Error) {
            this.test = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetAllMotifHospitalisationByNumDossOff(motif, numdoss, codeClinique) {
    this.mserv = new motifHospitalisationService(this.sqlite);
    this.mserv.getmotifHospitalisations(motif, numdoss, codeClinique).then(res => {
      DossierPage.motifhh = this.motifh = res;
      if (res.getnumdoss() === "") {
        this.test = false;
      }
      else {
        this.test = true;
      }
    });


  }

  DeleteGetAllMotifHospitalisationByNumDoss(numDoss, codeClinique) {
    this.mserv = new motifHospitalisationService(this.sqlite);
    this.mserv.deleteMotifhospitalisations(numDoss, codeClinique);
  }

  GetTraitements(numdoss, datefeuille, codeClinique) {
    this.traitement.pop();
    this.traitement = [];
    this.traitement.length = 0;
    this.trait = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/ReaWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:findPrescriptionByNumDossAndDate>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<datefeuille>' + datefeuille + '</datefeuille>' +
      '</ser:findPrescriptionByNumDossAndDate>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.trait = true;
            var xml = xmlhttp.responseXML;
            var x, t, i;
            x = xml.getElementsByTagName("return");
            for (i = 0; i < x.length; i++) {
              t = new Traitement();
              if (x[i].childElementCount === 20) {
                t.setdesignation(x[i].children[4].textContent);
                t.setjour(x[i].children[8].textContent);
                t.setnumDoss(x[i].children[10].textContent);
                t.setposologie(x[i].children[13].textContent);
              }
              else if (x[i].childElementCount === 19) {
                t.setdesignation(x[i].children[4].textContent);
                t.setjour(x[i].children[8].textContent);
                t.setnumDoss(x[i].children[9].textContent);
                t.setposologie(x[i].children[13].textContent);
              }
              this.traitement.push(t);
            }
            if (this.traitement.length === 0) {
              this.trait = false;
            }


            this.traitementServ = new TraitementService(this.sqlite);
            this.traitementServ.verifTraitement(this.traitement, this.pass.getdossier(), this.dateFeuille, codeClinique).then(res => {
              if (res === false) {
                this.traitementServ.getTraitements(this.traitement, this.pass.getdossier(), this.dateFeuille, codeClinique);
              }
            });
          } catch (Error) {
            this.trait = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetTraitementsOff(traitement, numdoss, datefeuille, codeClinique) {
    this.traitementServ = new TraitementService(this.sqlite);
    this.traitementServ.verifTraitement(this.traitement, this.pass.getdossier(), this.dateFeuille, codeClinique).then(res => {
      if (res === true) {
        this.traitement = this.traitementServ.getTraitements(this.traitement, this.pass.getdossier(), this.dateFeuille, codeClinique);
        this.trait = true;
      }
    });
  }

  DeleteTraitement(numdoss, dateFeuille, codeClinique) {

    this.traitementServ = new TraitementService(this.sqlite);
    this.traitementServ.deleteTraitements(numdoss, dateFeuille, codeClinique);
  }

  convertHTMLtoRTF(rtf) {
    rtf = rtf.replace(/\\par[d]?/g, "");
    return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim();
  }

  GetEvenementByDossier(numdoss, codeClinique) {
    this.Evolution.pop();
    this.Evolution = [];
    this.Evolution.length = 0;
    this.Histoiremaladie.pop();
    this.Histoiremaladie = [];
    this.Histoiremaladie.length = 0;
    this.Examenclinique.pop();
    this.Examenclinique = [];
    this.Examenclinique.length = 0;
    this.Conclusion.pop();
    this.Conclusion = [];
    this.Conclusion.length = 0;
    this.His = false;
    this.Exa = false;
    this.Con = false;
    this.Evo = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetEvenementByDossier>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '</ser:GetEvenementByDossier>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {
            this.trait = true;
            var xml = xmlhttp.responseXML;
            var x, e, i, drdv;
            x = xml.getElementsByTagName("return");
            var day = "";
            var month = "";
            var year = "";
            var minu = "";
            var hour = "";
            for (i = 0; i < x.length; i++) {
              e = new Evenement();
              e.setevenements(x[i].children[1].children[1].textContent);
              drdv = new Date(x[i].children[2].textContent);
              day = drdv.getDay();
              month = drdv.getMonth();
              year = drdv.getFullYear();
              minu = drdv.getMinutes();
              hour = drdv.getHours();
              e.setdate(day + "/" + month + "/" + year + " - " + hour + ":" + minu);
              e.setdetail(this.convertHTMLtoRTF(x[i].children[3].textContent));
              e.setuserCreat(x[i].children[6].textContent);
              e.setnumdoss(x[i].children[5].textContent);
              if (e.getevenements() === "Evolution") {
                this.Evolution.push(e);
                this.Evo = true;
              }
              if (e.getevenements() === "Histoire de la maladie") {
                this.Histoiremaladie.push(e);
                this.His = true;
              }
              if (e.getevenements() === "Examen clinique") {
                this.Examenclinique.push(e);
                this.Exa = true;
              }
              if (e.getevenements() === "Conclusion") {
                this.Conclusion.push(e);
                this.Con = true;
              }
            }
            if (this.Conclusion.length === 0) {
              this.Con = false;
            } else {
              this.EvenementConS = new EvenementConService(this.sqlite);
              this.EvenementConS.verifEvenement(this.Conclusion, this.pass.getdossier(), codeClinique).then(res => {
                if (res === false) {
                  this.EvenementConS.getEvenements(this.Conclusion, this.pass.getdossier(), codeClinique);
                }
              });
            }
            if (this.Examenclinique.length === 0) {
              this.Exa = false;
            } else {
              this.EvenementExaS = new EvenementExaService(this.sqlite);
              this.EvenementExaS.verifEvenement(this.Examenclinique, this.pass.getdossier(), codeClinique).then(res => {
                if (res === false) {
                  this.EvenementExaS.getEvenements(this.Examenclinique, this.pass.getdossier(), codeClinique);
                }
              });
            }
            if (this.Histoiremaladie.length === 0) {
              this.His = false;
            } else {
              this.EvenementHisS = new EvenementHisService(this.sqlite);
              this.EvenementHisS.verifEvenement(this.Histoiremaladie, this.pass.getdossier(), codeClinique).then(res => {
                if (res === false) {
                  this.EvenementHisS.getEvenements(this.Histoiremaladie, this.pass.getdossier(), codeClinique);
                }
              });
            }
            if (this.Evolution.length === 0) {
              this.Evo = false;
            }
            else {
              this.EvenementEvoS = new EvenementEvoService(this.sqlite);
              this.EvenementEvoS.verifEvenement(this.Evolution, this.pass.getdossier(), codeClinique).then(res => {
                if (res === false) {
                  this.EvenementEvoS.getEvenements(this.Evolution, this.pass.getdossier(), codeClinique);
                }
              });
            }
          } catch (Error) {
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetEvenementByDossierOff(numdoss, codeClinique) {
    this.EvenementConS = new EvenementConService(this.sqlite);
    this.EvenementConS.verifEvenement(this.Conclusion, numdoss, codeClinique).then(res => {
      if (res === true) {
        this.Conclusion = this.EvenementConS.getEvenements(this.Conclusion, numdoss, codeClinique);
        this.Con = true;
      }
    });

    this.EvenementExaS = new EvenementExaService(this.sqlite);
    this.EvenementExaS.verifEvenement(this.Examenclinique, this.pass.getdossier(), codeClinique).then(res => {
      if (res === true) {
        this.Examenclinique = this.EvenementExaS.getEvenements(this.Examenclinique, numdoss, codeClinique);
        this.Exa = true;
      }
    });

    this.EvenementHisS = new EvenementHisService(this.sqlite);
    this.EvenementHisS.verifEvenement(this.Histoiremaladie, this.pass.getdossier(), codeClinique).then(res => {
      if (res === true) {
        this.Histoiremaladie = this.EvenementHisS.getEvenements(this.Histoiremaladie, this.pass.getdossier(), codeClinique);
        this.His = true;
      }
    });

    this.EvenementEvoS = new EvenementEvoService(this.sqlite);
    this.EvenementEvoS.verifEvenement(this.Evolution, this.pass.getdossier(), codeClinique).then(res => {
      if (res === true) {
        this.Evolution = this.EvenementEvoS.getEvenements(this.Evolution, this.pass.getdossier(), codeClinique);
        this.Evo = true;
      }
    });
  }

  DeleteGetEvenementByDossier(numdoss, codeClinique) {
    this.EvenementConS = new EvenementConService(this.sqlite);
    this.EvenementConS.deleteEvenementCons(numdoss, codeClinique);

    this.EvenementExaS = new EvenementExaService(this.sqlite);
    this.EvenementExaS.deleteEvenementExas(numdoss, codeClinique);

    this.EvenementHisS = new EvenementHisService(this.sqlite);
    this.EvenementHisS.deleteEvenementHis(numdoss, codeClinique);

    this.EvenementEvoS = new EvenementEvoService(this.sqlite);
    this.EvenementEvoS.deleteEvenementEvos(numdoss, codeClinique);
  }

  GetListRegime(numdoss, datefeuille, nature, codeClinique) {
    this.rigime.pop();
    this.rigime = [];
    this.rigime.length = 0;
    var xmlhttp = new XMLHttpRequest();
    this.Ri = false;
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetListRegime>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<dateFeuille>' + datefeuille + '</dateFeuille>' +
      '<nature>' + nature + '</nature>' +
      '</ser:GetListRegime>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {

            var xml = xmlhttp.responseXML;
            var x, r, i;

            x = xml.getElementsByTagName("return");
            for (i = 0; i < x.length; i++) {
              r = new Rigime();
              r.setdesignation(x[0].children[1].textContent);
              this.rigime.push(r);
            }
            if (this.rigime.length === 0) {
              this.Ri = false;
            }
            else {
              this.Ri = true;
            }
            this.rigimeserv = new RigimeService(this.sqlite);
            this.rigimeserv.verifRigime(this.rigime, numdoss, datefeuille, nature, codeClinique).then(res => {
              if (res === false) {
                this.rigimeserv.getRigimes(this.rigime, numdoss, datefeuille, nature, codeClinique);
              }
            });
          } catch (Error) {
            this.Ri = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetListRegimeOff(rigime, numdoss, datefeuille, nature, codeClinique) {
    this.rigimeserv = new RigimeService(this.sqlite);
    this.rigimeserv.verifRigime(this.rigime, numdoss, datefeuille, nature, codeClinique).then(res => {
      if (res === true) {
        this.rigimeserv.getRigimes(this.rigime, numdoss, datefeuille, nature, codeClinique);
        this.Ri = true;
      }
    });
  }

  DeleteGetListRegime(numdoss, datefeuille, nature, codeClinique) {
    this.rigimeserv = new RigimeService(this.sqlite);
    this.rigimeserv.deleteRigimes(numdoss, datefeuille, nature, codeClinique);
  }

  GetSigneClinique(numdoss, dateFeuille, nature, codeType, codeTypeOf, codeClinique) {
    this.Entrees.pop();
    this.Entrees = [];
    this.Entrees.length = 0;
    this.Sorties.pop();
    this.Sorties = [];
    this.Sorties.length = 0;
    this.Sorties.pop();
    this.Sorties = [];
    this.Sorties.length = 0;
    var xmlhttp = new XMLHttpRequest();
    this.Ri = false;
    xmlhttp.open('POST', Variables.uRL + 'dmi-core/DossierSoinWSService?wsdl', true);
    var sr =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.dmi.csys.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ser:GetSigneClinique>' +
      '<numdoss>' + numdoss + '</numdoss>' +
      '<dateFin>' + dateFeuille + '</dateFin>' +
      '<nature>' + nature + '</nature>' +
      '<codeType>' + codeType + '</codeType>' +
      '</ser:GetSigneClinique>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          try {

            var xml = xmlhttp.responseXML;
            var x, i, s;
            x = xml.getElementsByTagName("return");
            var listEntrees = 'G4LEF';
            var listSorties = '7I9A3HJ';
            for (i = 0; i < x.length; i++) {
              s = new SigneClinique();
              s.setcodeType(x[i].children[0].textContent);
              s.setdate(x[i].children[1].textContent);
              s.setdesignation(x[i].children[2].textContent);
              s.setquantite(x[i].children[3].textContent);
              if (listEntrees.search(s.getcodeType()) >= 0) {
                this.Entrees.push(s);
                this.Ent = true;
              }
              if (listSorties.search(s.getcodeType()) >= 0) {
                this.Sorties.push(s);
                this.Sor = true;
              }
              if (listEntrees.search(s.getcodeType()) === -1 && listSorties.search(s.getcodeType()) === -1) {
                this.signec.push(s);
                this.AlerteS = true;
              }
            }
            if (this.signec.length === 0) {
              this.AlerteS = false;
              this.Sor = false;
              this.Ent = false;
            }

            this.signeCliniqueEntS = new SigneCliniqueEntService(this.sqlite);
            this.signeCliniqueEntS.verifSigneClinique(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
              if (res === false) {
                this.signeCliniqueEntS.getSigneCliniques(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
              }
            });

            this.signeCliniqueSorS = new SigneCliniqueSorService(this.sqlite);
            this.signeCliniqueSorS.verifSigneClinique(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
              if (res === false) {
                this.signeCliniqueSorS.getSigneCliniques(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
              }
            });

            this.signeCliniqueSigS = new SigneCliniqueSigService(this.sqlite);
            this.signeCliniqueSigS.verifSigneClinique(this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
              if (res === false) {
                this.signeCliniqueSigS.getSigneCliniques(this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
              }
            });
          } catch (Error) {
            this.AlerteS = false;
            this.Sor = false;
            this.Ent = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  GetSigneCliniqueOff(numdoss, dateFeuille, nature, codeTypeOf, codeClinique) {
    this.signeCliniqueEntS = new SigneCliniqueEntService(this.sqlite);
    this.signeCliniqueEntS.verifSigneClinique(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
      if (res === true) {
        this.Entrees = this.signeCliniqueEntS.getSigneCliniques(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.Ent = true;
      }
    });

    this.signeCliniqueSorS = new SigneCliniqueSorService(this.sqlite);
    this.signeCliniqueSorS.verifSigneClinique(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
      if (res === true) {
        this.Sorties = this.signeCliniqueSorS.getSigneCliniques(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.Sor = true;
      }
    });

    this.signeCliniqueSigS = new SigneCliniqueSigService(this.sqlite);
    this.signeCliniqueSigS.verifSigneClinique(this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
      if (res === true) {
        this.signec = this.signeCliniqueSigS.getSigneCliniques(this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.AlerteS = true;
      }
    });
  }

  DeleteGetSigneClinique(numdoss, dateFeuille, nature, codeTypeOf, codeClinique) {
    this.signeCliniqueEntS = new SigneCliniqueEntService(this.sqlite);
    this.signeCliniqueEntS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);

    this.signeCliniqueSorS = new SigneCliniqueSorService(this.sqlite);
    this.signeCliniqueSorS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);

    this.signeCliniqueSigS = new SigneCliniqueSigService(this.sqlite);
    this.signeCliniqueSigS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
  }

  update() {
    this.DeleteGetAllMotifHospitalisationByNumDoss(this.pass.getdossier(), this.codeClinique);
    this.GetAllMotifHospitalisationByNumDoss(this.pass.getdossier(), this.codeClinique);

    this.DeletegetAntecedentAllergieByIdentifiant(this.pass.getid(), this.codeClinique);
    this.getAntecedentAllergieByIdentifiant(this.pass.getid(), this.codeClinique);

    this.DeleteGetAlerteSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
    this.GetAlerteSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);

    this.DeleteTraitement(this.pass.getdossier(), this.dateFeuille, this.codeClinique);
    this.GetTraitements(this.pass.getdossier(), this.dateFeuille, this.codeClinique);

    this.DeleteGetEvenementByDossier(this.pass.getdossier(), this.codeClinique);
    this.GetEvenementByDossier(this.pass.getdossier(), this.codeClinique);

    this.DeleteGetListRegime(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
    this.GetListRegime(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);

    this.DeleteGetSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeTypeOf, this.codeClinique);
    this.GetSigneClinique(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeType, this.codeTypeOf, this.codeClinique);

  }

  doRefresh(refresher) {
    this.update();
    setTimeout(() => {
      //   alert('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  historique(numDoss, codeClinique) {
    this.histserv = new HistDossierService(this.sqlite);
    this.histd = new HistDossier();
    var d = new Date();
    this.histd.setnumDoss(numDoss);
    this.histd.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    this.histd.setcodeClinique(codeClinique);
    try {
      this.histserv.deleteHistDossiers(numDoss, codeClinique).then(delet => {
        if (delet === true) {
          this.histserv.getHistDossiers(this.histd, numDoss, codeClinique).then(res => {
            this.histd = res.getdate();
            DossierPage.hist = res.getdate();
          });
        }
      });

    }
    catch (Error) {
      this.histserv.getHistDossiers(this.histd, numDoss, codeClinique).then(res => {
        this.histd = res.getdate();
        DossierPage.hist = res.getdate();
      });
    }

  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService(this.sqlite);
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
      DossierPage.hist = res.getdate();
    });
  }

  updateOff() {
    this.GetAllMotifHospitalisationByNumDossOff(this.motifh, this.pass.getdossier(), this.codeClinique);
    this.getAntecedentAllergieByIdentifiantOff(this.antechl, this.alechl, this.pass.getid(), this.codeClinique);
    this.GetAlerteSigneCliniqueOff(this.signe, this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
    this.GetTraitementsOff(this.traitement, this.pass.getdossier(), this.dateFeuille, this.codeClinique);
    this.GetEvenementByDossierOff(this.pass.getdossier(), this.codeClinique);
    this.GetListRegimeOff(this.rigime, this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
    this.GetSigneCliniqueOff(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeTypeOf, this.codeClinique);
  }


  goToInfPage() {
    this.navCtrl.push(ClientDetailPage);
  }

  gotoSigneCourbe() {
    this.navCtrl.push(SigneCourbePage);
  }

  gotoTraitementCourbe() {
    this.navCtrl.push(TraitmentCourbe);
  }
  goBack(){
    this.navCtrl.parent.viewCtrl.dismiss();
  }
}

