import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';


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
    NgZorroAntdModule
    
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
  ]
})
export class CoreModule { }
