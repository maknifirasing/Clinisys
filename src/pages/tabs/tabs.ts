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
  dateFeuille: string;
  tabLangue: any;
  dat: string;
  countPdfT: number;
  countPdf: number;
  public navCtrl: NavController;
  LabosT: Array<Labo> = [];
  LabosF: Array<Labo> = [];
  a: any;
  GetExamenRadioByNumDossResponseTest: boolean = false;
  examenRT: Array<ExamenRadio> = [];
  examenRF: Array<ExamenRadio> = [];
  coountexamenRT: number;
  coountexamenR: number;
  tab: any;
  tab1:string;
  tab2:string;
  tab3:string;
  tab4:string;
  titreSortie:string;
  titreAlert:string;
  titreMaladie:string;
  titreClini:string;
  titreEvo:string;
  titreConclu:string;
  titreRegime:string;
  titreDemande:string;
  titreExamen:string;
  titreAct:string;
  titreChi:string;
  titreDateAct:string;
  titreHeureDeb:string;
  titreHeureF:string;
  titleMed:string;

  constructor(public navParams: NavParams, private Url: Variables) {
    this.pass = navParams.get("mypatient");
    console.log("patient "+this.pass.getimg());
    this.coountexamenR = 0;
    this.coountexamenRT = 0;
    this.countPdfT = 0;
    this.countPdf = 0;
    var d = new Date();
    this.dat = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


    this.tabLangue = {
      pass: navParams.get("mypatient"),
      dateFeuille: navParams.get("dateFeuille"),
      dat: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
      Labost: this.LabosT,
      Labosf: this.LabosF,
      examenRT: this.examenRT,
      examenRF: this.examenRF,
      langue:navParams.get("langue"),
      tabLangue:navParams.data.tabLangue.tabLangue

  };
  }

  ionViewDidLoad() {
    this.findAllLaboByNumDossier(this.pass.getdossier());
   this.GetExamenRadioByNumDossResponse(this.pass.getdossier());
    console.log("getDoss ",this.pass.getdossier());

  }

  GetExamenRadioByNumDossResponse(numDoss) {
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
            console.log("emchi", this.coountexamenRT);
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

  findAllLaboByNumDossier(numDoss) {
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
              if (l.getcontenuePDF() === "true") {
                this.LabosT.push(l);
                this.countPdfT++;
              }
              else if (l.getcontenuePDF() === "false") {
                this.LabosF.push(l);
              }
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

}
