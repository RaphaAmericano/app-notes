import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../../environments/environment' ;
import { BasicHeaderInterceptor } from './interceptors/basic-header.interceptor';
@NgModule({
  declarations: [
    //pipes e directives
    
    //components
    FooterComponent, 
    NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Note app devtool',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  exports:[
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    RouterModule,
    //Pipes e directives

    //components
    FooterComponent,
    NavbarComponent
  ],
  providers:[
      {provide: HTTP_INTERCEPTORS, useClass: BasicHeaderInterceptor, multi: true}
  ]
})
export class CoreModule { }
