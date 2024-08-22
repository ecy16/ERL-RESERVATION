/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
// import { ApiService } from './app/api.services-old';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './app/api.services';
import { Toast, provideToastr } from 'ngx-toastr';



bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, AppRoutingModule, NgbModule), provideAnimations(),ApiService,importProvidersFrom(HttpClientModule),   provideToastr()]
})
  .catch(err => console.error(err));
