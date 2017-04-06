import {Component} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {MotifHospitalisation} from "../../models/motifHospitalisation";
import {Antec} from "../../models/Antec";
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
import {DetailPerPagePage} from "../detail-per-page/detail-per-page";

@Component({
  selector: 'page-dossier',
  templateUrl: 'dossier.html',
  providers: [Variables]
})

export class DossierPage {
  motifh: Array<MotifHospitalisation> = [];
  mserv: any;
  antec: Array<Antec> = [];
  aleg: Array<Antec> = [];
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
  histD: Array<HistDossier> = [];
  histd = new HistDossier();
  codeClinique: any;
  tabLangue: any;
  pass: any;
  dateFeuille: any;
  langue: any;
  static motifhh: Array<MotifHospitalisation> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private Url: Variables, public platform: Platform) {
    this.codeClinique = navParams.get("codeClinique");
    this.tabLangue = navParams.get("tabLangue");
    this.pass = navParams.get("pass");
    this.dateFeuille = navParams.get("dateFeuille");
    this.langue = navParams.get("langue");

    if (this.pass.getnature() === "REA") {
      this.codeType = "'1','G','L','E','7','I','9','A','3'";
      this.codeTypeOf = "1GLE7I9A3";
    }
    else if (this.pass.getnature() === "sur") {
      this.codeType = "'1','3','4'";
      this.codeTypeOf = "134";
    }
    this.platform.ready().then(() => {
      Variables.checconnection().then(res => {
        if (res === false) {
          this.connection = false;
          this.historiqueOff(this.histD, this.pass.getdossier(), this.codeClinique);
          this.GetAllMotifHospitalisationByNumDossOff(this.motifh, this.pass.getdossier(), this.codeClinique);
          this.getAntecedentAllergieByIdentifiantOff(this.antechl, this.alechl, this.pass.getid(), this.codeClinique);
          this.GetAlerteSigneCliniqueOff(this.signe, this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
          this.GetTraitementsOff(this.traitement, this.pass.getdossier(), this.dateFeuille, this.codeClinique);
          this.GetEvenementByDossierOff(this.pass.getdossier(), this.codeClinique);
          this.GetListRegimeOff(this.rigime, this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeClinique);
          this.GetSigneCliniqueOff(this.pass.getdossier(), this.dateFeuille, this.pass.getnature(), this.codeTypeOf, this.codeClinique);

        }
        else {
          this.connection = true;
          this.historique(this.pass.getdossier(), this.codeClinique);
          this.update();
        }
      });
    });
  }

  GetAlerteSigneClinique(numDoss, dateFeuille, nature, codeClinique) {
    this.signe.pop();
    this.signe = [];
    this.signe.length = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
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
          this.signeCliniqueAlertS = new SigneCliniqueAlertService();
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

    this.signeCliniqueAlertS = new SigneCliniqueAlertService();
    this.signeCliniqueAlertS.verifSigneCliniqueAlert(signe, numDoss, dateFeuille, nature, codeClinique).then(res => {
      if (res === true) {
        this.signe = this.signeCliniqueAlertS.getSigneCliniquesAlert(signe, numDoss, dateFeuille, nature, codeClinique);
        this.AlerteSigneCliniqueTest = true;
      }
    });
  }

  DeleteGetAlerteSigneClinique(numDoss, dateFeuille, nature, codeClinique) {

    this.traitementServ = new TraitementService();
    this.traitementServ.deleteTraitements(numDoss, dateFeuille, nature, codeClinique);
  }

  getAntecedentAllergieByIdentifiant(idpass, codeClinique) {
    this.stringAlerg = "";
    this.stringAntec = "";
    this.aleg.pop();
    this.aleg = [];
    this.aleg.length = 0;
    this.alechl.pop();
    this.alechl = [];
    this.alechl.length = 0;
    this.antec.pop();
    this.antec = [];
    this.antec.length = 0;
    this.antechl.pop();
    this.antechl = [];
    this.antechl.length = 0;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
            var a;
            for (i = 0; i < x.length; i++) {
              a = new Antec();
              a.setcodeAntecedent(x[i].children[0].children[0].textContent);
              a.setcodeFamille(x[i].children[0].children[1].textContent);
              a.setdesignation(x[i].children[0].children[2].textContent);
              a.setidDetailAntec(x[i].children[0].children[3].textContent);
              a.setordre(x[i].children[0].children[4].textContent);
              a.setvisiblePreAnes(x[i].children[0].children[5].textContent);
              a.setid(x[i].children[1].textContent);
              a.setidentifiant(x[i].children[2].textContent);
              a.setnumeroDossier(x[i].children[3].textContent);
              a.setobservation(x[i].children[4].textContent);
              a.setutilisateurAnt(x[i].children[5].textContent);

              /* if (i === x.length - 1)
               this.disig += a.getdesignation();
               else
               this.disig += a.getdesignation() + ", ";*/

              if (!(a.getcodeAntecedent() === ("A000")) && (!(a.getcodeAntecedent() === ("A255")))) {
                if (a.getcodeFamille() === ("FA02")) // Allergie
                {
                  if (a.getcodeAntecedent().toUpperCase() === ("ALER")) {
                    this.stringAlerg += a.getobservation() + ", ";
                    this.Alerg = true;

                  }
                  else {
                    this.stringAlerg += a.getdesignation() + ", ";
                    this.Alerg = true;
                  }
                  this.aleg.push(a);
                }
                else // Antécédent
                {
                  if (a.getcodeFamille().toUpperCase() === ("AUTR")) {
                    this.stringAntec += a.getobservation() + ", ";
                    this.Ante = true;
                  }
                  else {
                    this.stringAntec += a.getdesignation() + ", ";
                    this.Ante = true;
                  }
                }
                this.antec.push(a);
              }


            }
            if (this.antec.length === 0) {
              this.AntecedentAllergieTest = false;
            }


            var antech = new AntecCh();

            antech.setidpass(idpass);
            antech.setch(this.stringAntec);

            this.antechl.push(antech);

            this.antecserv = new AntechService();
            this.antecserv.verifAntec(this.antechl, idpass, codeClinique).then(res => {
              if (res === false) {
                this.antecserv.getAntecs(this.antechl, idpass, codeClinique);
              }
            });

            var alech = new AntecCh();

            alech.setidpass(idpass);
            alech.setch(this.stringAlerg);

            this.alechl.push(alech);

            this.alegserv = new AlegchService();
            this.alegserv.verifAleg(this.alechl, idpass, codeClinique).then(res => {
              if (res === false) {
                this.alegserv.getAlegs(this.alechl, idpass, codeClinique);
              }
            });

          } catch (Error) {
            this.AntecedentAllergieTest = false;
          }
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
  }

  getAntecedentAllergieByIdentifiantOff(antec, aleg, idpass, codeClinique) {
    this.AntecedentAllergieTest = true;
    this.antecserv = new AntechService();
    this.antecserv.verifAntec(this.antechl, idpass, codeClinique).then(res => {
      if (res === true) {
        this.antechl = this.antecserv.getAntecs(antec, idpass, codeClinique);
        this.Ante = true;
      }
    });

    this.alegserv = new AlegchService();
    this.alegserv.verifAleg(this.alechl, idpass, codeClinique).then(res => {
      if (res === true) {
        this.alechl = this.alegserv.getAlegs(aleg, idpass, codeClinique);
        this.Alerg = true;
      }
    });
  }

  DeletegetAntecedentAllergieByIdentifiant(idpass, codeClinique) {
    this.antecserv = new AntechService();
    this.antecserv.deleteAntecs(idpass, codeClinique);

    this.alegserv = new AlegchService();
    this.alegserv.deleteAlegs(idpass, codeClinique);
  }

  GetAllMotifHospitalisationByNumDoss(numDoss, codeClinique) {
    this.motifh.pop();
    this.motifh = [];
    this.motifh.length = 0;
    this.test = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
            var x, i, drdv, dsortie, hrdv, hsortie;
            var day = "";
            var month = "";
            var year = "";
            var minu = "";
            var second = "";
            var hour = "";
            x = xml.getElementsByTagName("return");
            var a;
            for (i = 0; i < x.length; i++) {
              a = new MotifHospitalisation();
              a.setconclusion(x[0].children[0].textContent);
              drdv = new Date(x[0].children[1].textContent);
              day = drdv.getDate();
              month = drdv.getMonth() + 1;
              year = drdv.getFullYear();
              a.setdateRdv(day + "/" + month + "/" + year);
              dsortie = new Date(x[0].children[2].textContent);
              day = dsortie.getDate();
              month = dsortie.getMonth() + 1;
              year = dsortie.getFullYear();
              a.setdateSortie(day + "/" + month + "/" + year);
              a.setgroupeSang(x[0].children[3].textContent);
              hrdv = new Date(x[0].children[4].textContent);
              minu = hrdv.getMinutes();
              hour = hrdv.getHours();
              second = hrdv.getSeconds();
              a.setheureRdv(hour + " : " + minu + " : " + second);
              hsortie = new Date(x[0].children[5].textContent);
              minu = hrdv.getMinutes();
              hour = hrdv.getHours();
              second = hrdv.getSeconds();
              a.setheureSortie(hour + " : " + minu + " : " + second);
              a.sethistoiremaladie(x[0].children[6].textContent);
              a.setmotifhospitalisation(x[0].children[7].textContent);
              a.setnumdoss(x[0].children[8].textContent);
              a.setobservationSejour(x[0].children[9].textContent);
              a.setpoid(x[0].children[10].textContent);
              a.settaille(x[0].children[11].textContent);
              a.settraitementHabituelle(x[0].children[12].textContent);
              a.settraitementSejour(x[0].children[13].textContent);
              a.settraitementSortie(x[0].children[14].textContent);
              a.setutilisateurMotif(x[0].children[15].textContent);
              this.motifh.push(a);
            }
            DossierPage.motifhh = this.motifh;
            if (this.motifh.length === 0) {
              this.test = false;
            }
            //  return this.m;
            this.mserv = new motifHospitalisationService();
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
    this.mserv = new motifHospitalisationService();
    this.mserv.verifmotifHospitalisation(motif, numdoss, codeClinique).then(res => {
      if (res === true) {
        this.motifh = this.mserv.getmotifHospitalisations(motif, numdoss, codeClinique);
        DossierPage.motifhh = this.motifh;
        this.test = true;
      }
    });


  }

  DeleteGetAllMotifHospitalisationByNumDoss(numDoss, codeClinique) {
    this.mserv = new motifHospitalisationService();
    this.mserv.deleteMotifhospitalisations(numDoss, codeClinique);
  }

  GetTraitements(numdoss, datefeuille, codeClinique) {
    this.traitement.pop();
    this.traitement = [];
    this.traitement.length = 0;
    this.trait = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', this.Url.url + 'dmi-core/ReaWSService?wsdl', true);
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
                t.setcodePosologie(x[i].children[0].textContent);
                t.setdate(x[i].children[1].textContent);
                t.setdateFinTrait(x[i].children[2].textContent);
                t.setdci(x[i].children[3].textContent);
                t.setdesignation(x[i].children[4].textContent);
                t.setdureEnJour(x[i].children[5].textContent);
                t.setheure(x[i].children[6].textContent);
                t.setheureDebut(x[i].children[7].textContent);
                t.setjour(x[i].children[8].textContent);
                t.setnbFois(x[i].children[9].textContent);
                t.setnumDoss(x[i].children[10].textContent);
                t.setnumTraitement(x[i].children[11].textContent);
                t.setnumbon(x[i].children[12].textContent);
                t.setposologie(x[i].children[13].textContent);
                t.setprescripteur(x[i].children[14].textContent);
                t.setquantite(x[i].children[15].textContent);
                t.setunite(x[i].children[16].textContent);
                t.setvitesse(x[i].children[17].textContent);
                t.setvoie(x[i].children[18].textContent);
                t.setvolume(x[i].children[19].textContent);
              }
              else if (x[i].childElementCount === 19) {
                t.setcodePosologie(x[i].children[0].textContent);
                t.setdate(x[i].children[1].textContent);
                t.setdateFinTrait(x[i].children[2].textContent);
                t.setdci("");
                t.setdesignation(x[i].children[3].textContent);
                t.setdureEnJour(x[i].children[4].textContent);
                t.setheure(x[i].children[5].textContent);
                t.setheureDebut(x[i].children[6].textContent);
                t.setjour(x[i].children[7].textContent);
                t.setnbFois(x[i].children[8].textContent);
                t.setnumDoss(x[i].children[9].textContent);
                t.setnumTraitement(x[i].children[10].textContent);
                t.setnumbon(x[i].children[11].textContent);
                t.setposologie(x[i].children[12].textContent);
                t.setprescripteur(x[i].children[13].textContent);
                t.setquantite(x[i].children[14].textContent);
                t.setunite(x[i].children[15].textContent);
                t.setvitesse(x[i].children[16].textContent);
                t.setvoie(x[i].children[17].textContent);
                t.setvolume(x[i].children[18].textContent);

              }
              this.traitement.push(t);
            }
            if (this.traitement.length === 0) {
              this.trait = false;
            }


            this.traitementServ = new TraitementService();
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
    this.traitementServ = new TraitementService();
    this.traitementServ.verifTraitement(this.traitement, this.pass.getdossier(), this.dateFeuille, codeClinique).then(res => {
      if (res === true) {
        this.traitement = this.traitementServ.getTraitements(this.traitement, this.pass.getdossier(), this.dateFeuille, codeClinique);
        this.trait = true;
      }
    });
  }

  DeleteTraitement(numdoss, dateFeuille, codeClinique) {

    this.traitementServ = new TraitementService();
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
    xmlhttp.open('POST', this.Url.url + 'dmi-core/WebServiceMedecinEventsService?wsdl', true);
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
              e.setaccess(x[i].children[0].textContent);
              e.setcode(x[i].children[1].children[0].textContent);
              e.setevenements(x[i].children[1].children[1].textContent);
              e.setorderEvenement(x[i].children[1].children[2].textContent);
              e.setvisible(x[i].children[1].children[3].textContent);
              drdv = new Date(x[i].children[2].textContent);
              day = drdv.getDay();
              month = drdv.getMonth();
              year = drdv.getFullYear();
              minu = drdv.getMinutes();
              hour = drdv.getHours();
              e.setdate(day + "/" + month + "/" + year + " - " + hour + ":" + minu);
              e.setdetail(this.convertHTMLtoRTF(x[i].children[3].textContent));
              e.setIDEvenement(x[i].children[4].textContent);
              e.setnumdoss(x[i].children[5].textContent);
              e.setuserCreat(x[i].children[6].textContent);
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
              this.EvenementConS = new EvenementConService();
              this.EvenementConS.verifEvenement(this.Conclusion, this.pass.getdossier(), codeClinique).then(res => {
                if (res === false) {
                  this.EvenementConS.getEvenements(this.Conclusion, this.pass.getdossier(), codeClinique);
                }
              });
            }
            if (this.Examenclinique.length === 0) {
              this.Exa = false;
            } else {
              this.EvenementExaS = new EvenementExaService();
              this.EvenementExaS.verifEvenement(this.Examenclinique, this.pass.getdossier(), codeClinique).then(res => {
                if (res === false) {
                  this.EvenementExaS.getEvenements(this.Examenclinique, this.pass.getdossier(), codeClinique);
                }
              });
            }
            if (this.Histoiremaladie.length === 0) {
              this.His = false;
            } else {
              this.EvenementHisS = new EvenementHisService();
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
              this.EvenementEvoS = new EvenementEvoService();
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
    this.EvenementConS = new EvenementConService();
    this.EvenementConS.verifEvenement(this.Conclusion, numdoss, codeClinique).then(res => {
      if (res === true) {
        this.Conclusion = this.EvenementConS.getEvenements(this.Conclusion, numdoss, codeClinique);
        this.Con = true;
      }
    });

    this.EvenementExaS = new EvenementExaService();
    this.EvenementExaS.verifEvenement(this.Examenclinique, this.pass.getdossier(), codeClinique).then(res => {
      if (res === true) {
        this.Examenclinique = this.EvenementExaS.getEvenements(this.Examenclinique, numdoss, codeClinique);
        this.Exa = true;
      }
    });

    this.EvenementHisS = new EvenementHisService();
    this.EvenementHisS.verifEvenement(this.Histoiremaladie, this.pass.getdossier(), codeClinique).then(res => {
      if (res === true) {
        this.Histoiremaladie = this.EvenementHisS.getEvenements(this.Histoiremaladie, this.pass.getdossier(), codeClinique);
        this.His = true;
      }
    });

    this.EvenementEvoS = new EvenementEvoService();
    this.EvenementEvoS.verifEvenement(this.Evolution, this.pass.getdossier(), codeClinique).then(res => {
      if (res === true) {
        this.Evolution = this.EvenementEvoS.getEvenements(this.Evolution, this.pass.getdossier(), codeClinique);
        this.Evo = true;
      }
    });
  }

  DeleteGetEvenementByDossier(numdoss, codeClinique) {
    this.EvenementConS = new EvenementConService();
    this.EvenementConS.deleteEvenementCons(numdoss, codeClinique);

    this.EvenementExaS = new EvenementExaService();
    this.EvenementExaS.deleteEvenementExas(numdoss, codeClinique);

    this.EvenementHisS = new EvenementHisService();
    this.EvenementHisS.deleteEvenementHis(numdoss, codeClinique);

    this.EvenementEvoS = new EvenementEvoService();
    this.EvenementEvoS.deleteEvenementEvos(numdoss, codeClinique);
  }

  GetListRegime(numdoss, datefeuille, nature, codeClinique) {
    this.rigime.pop();
    this.rigime = [];
    this.rigime.length = 0;
    var xmlhttp = new XMLHttpRequest();
    this.Ri = false;
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
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
              r.setcodeRegime(x[0].children[0].textContent);
              r.setdesignation(x[0].children[1].textContent);
              this.rigime.push(r);
            }
            if (this.rigime.length === 0) {
              this.Ri = false;
            }
            else {
              this.Ri = true;
            }
            this.rigimeserv = new RigimeService();
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
    this.rigimeserv = new RigimeService();
    this.rigimeserv.verifRigime(this.rigime, numdoss, datefeuille, nature, codeClinique).then(res => {
      if (res === true) {
        this.rigimeserv.getRigimes(this.rigime, numdoss, datefeuille, nature, codeClinique);
        this.Ri = true;
      }
    });
  }

  DeleteGetListRegime(numdoss, datefeuille, nature, codeClinique) {
    this.rigimeserv = new RigimeService();
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
    xmlhttp.open('POST', this.Url.url + 'dmi-core/DossierSoinWSService?wsdl', true);
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

            this.signeCliniqueEntS = new SigneCliniqueEntService();
            this.signeCliniqueEntS.verifSigneClinique(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
              if (res === false) {
                this.signeCliniqueEntS.getSigneCliniques(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
              }
            });

            this.signeCliniqueSorS = new SigneCliniqueSorService();
            this.signeCliniqueSorS.verifSigneClinique(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
              if (res === false) {
                this.signeCliniqueSorS.getSigneCliniques(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
              }
            });

            this.signeCliniqueSigS = new SigneCliniqueSigService();
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
    this.signeCliniqueEntS = new SigneCliniqueEntService();
    this.signeCliniqueEntS.verifSigneClinique(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
      if (res === true) {
        this.Entrees = this.signeCliniqueEntS.getSigneCliniques(this.Entrees, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.Ent = true;
      }
    });

    this.signeCliniqueSorS = new SigneCliniqueSorService();
    this.signeCliniqueSorS.verifSigneClinique(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
      if (res === true) {
        this.Sorties = this.signeCliniqueSorS.getSigneCliniques(this.Sorties, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.Sor = true;
      }
    });

    this.signeCliniqueSigS = new SigneCliniqueSigService();
    this.signeCliniqueSigS.verifSigneClinique(this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique).then(res => {
      if (res === true) {
        this.signec = this.signeCliniqueSigS.getSigneCliniques(this.signec, numdoss, dateFeuille, nature, codeTypeOf, codeClinique);
        this.AlerteS = true;
      }
    });
  }

  DeleteGetSigneClinique(numdoss, dateFeuille, nature, codeTypeOf, codeClinique) {
    this.signeCliniqueEntS = new SigneCliniqueEntService();
    this.signeCliniqueEntS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);

    this.signeCliniqueSorS = new SigneCliniqueSorService();
    this.signeCliniqueSorS.deleteSigneCliniques(numdoss, dateFeuille, nature, codeTypeOf, codeClinique);

    this.signeCliniqueSigS = new SigneCliniqueSigService();
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
    this.histserv = new HistDossierService();
    var h = new HistDossier();
    var d = new Date();
    h.setnumDoss(numDoss);
    h.setdate(d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    h.setcodeClinique(codeClinique);
    this.histD.push(h);
    try {
      this.histserv.deleteHistDossiers(numDoss, codeClinique);
      this.histserv.getHistDossiers(this.histD, numDoss, codeClinique).then(res => {
        this.histd = res.getdate();
      });
    }
    catch (Error) {
      this.histserv.getHistDossiers(this.histD, numDoss, codeClinique).then(res => {
        this.histd = res.getdate();
      });
    }

  }

  historiqueOff(hist, numDoss, codeClinique) {
    this.histserv = new HistDossierService();
    this.histserv.getHistDossiers(hist, numDoss, codeClinique).then(res => {
      this.histd = res.getdate();
    });
  }

  goToInfPage(patient) {
    this.navCtrl.push(ClientDetailPage,
      {
        patient: patient,
        motif: this.motifh,
        tabLangue: this.tabLangue,
        langue: this.langue,
        codeClinique: this.codeClinique
      });
  }

  gotoSigneCourbe() {
    this.navCtrl.push(SigneCourbePage, {
      codeClinique: this.codeClinique,
      tabLangue: this.tabLangue,
      pass: this.pass,
      langue: this.langue
    });
  }
}
