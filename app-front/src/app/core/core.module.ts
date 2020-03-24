import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';
import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { PasswordMatchDirective } from '../shared/directive/password-match.directive';
import { SearchPipe } from '../shared/pipes/search.pipe';



@NgModule({
  declarations: [
    //pipes e directives
    TruncatePipe,
    ReversePipe,
    PasswordMatchDirective,
    SearchPipe,
    //components
    FooterComponent, 
    NavbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    
  ],
  exports:[
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    //components
    FooterComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
