/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule, routes } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter,withHashLocation } from '@angular/router';
// import { ApiService } from './app/api.services-old';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './app/api.services';
import { Toast, provideToastr } from 'ngx-toastr';
import { HashLocationStrategy,LocationStrategy } from '@angular/common';




bootstrapApplication(AppComponent, {
    providers: [ provideRouter(routes, withHashLocation()),importProvidersFrom(BrowserModule, AppRoutingModule, NgbModule), provideAnimations(),ApiService,importProvidersFrom(HttpClientModule),   provideToastr()]
})
  .catch(err => console.error(err));
