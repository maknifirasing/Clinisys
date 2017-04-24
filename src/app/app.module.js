var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SQLite } from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListePage } from '../pages/liste/liste';
import { DossierPage } from '../pages/dossier/dossier';
import { ExamenRadioPage } from "../pages/examen-radio/examen-radio";
import { ExamenLaboPage } from "../pages/examen-labo/examen-labo";
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { PdfViewPage } from '../pages/pdf-view/pdf-view';
import { ListPreanesthesiePage } from "../pages/list-preanesthesie/list-preanesthesie";
import { LanguesPage } from "../pages/langues/langues";
import { ListeCliniquePage } from "../pages/liste-clinique/liste-clinique";
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SigneCourbePage } from "../pages/signe-courbe/signe-courbe";
import { ClientDetailPage } from "../pages/client-detail/client-detail";
import { TraitmentCourbe } from "../pages/traitment-courbe/traitment-courbe";
import { ConsignePage } from "../pages/consigne/consigne";
import { ModifPassPage } from "../pages/modif-pass/modif-pass";
import { CustomIconsModule } from 'ionic2-custom-icons';
import { TryPage } from "../pages/try/try";
import { Ng2HighchartsModule } from 'ng2-highcharts';
import { RealisationPage } from "../pages/realisation/realisation";
import { Variables } from "../providers/variables";
import { HttpModule } from '@angular/http';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            TabsPage,
            ListePage,
            DossierPage,
            ExamenRadioPage,
            ExamenLaboPage,
            PdfViewPage,
            PdfViewerComponent,
            ListPreanesthesiePage,
            LanguesPage,
            ListeCliniquePage,
            SigneCourbePage,
            ClientDetailPage,
            TraitmentCourbe,
            ConsignePage,
            ModifPassPage,
            RealisationPage,
            TryPage
        ],
        imports: [
            BrowserModule,
            FlexLayoutModule,
            CustomIconsModule,
            Ng2HighchartsModule,
            MaterialModule.forRoot(),
            BrowserAnimationsModule,
            FlexLayoutModule,
            CustomIconsModule,
            Ng2HighchartsModule,
            MaterialModule.forRoot(),
            HttpModule,
            IonicModule.forRoot(MyApp)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            TabsPage,
            ListePage,
            DossierPage,
            ExamenRadioPage,
            ExamenLaboPage,
            PdfViewPage,
            PdfViewerComponent,
            ListPreanesthesiePage,
            LanguesPage,
            ListeCliniquePage,
            SigneCourbePage,
            ClientDetailPage,
            TraitmentCourbe,
            ConsignePage,
            ModifPassPage,
            RealisationPage,
            TryPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            SQLite,
            Variables,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map