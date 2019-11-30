import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NavbarComponent } from './navbar/navbar.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { NoteBoardComponent } from './note/note-board/note-board.component';
import { LoginComponent } from './login/login.component';
import { FormLoginComponent } from './login/form-login/form-login.component';
import { FormSigninComponent } from './login/form-signin/form-signin.component';
import { NoteComponent } from './note/note.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { PasswordMatchDirective } from './directive/password-match.directive';
import { ProfileComponent } from './profile/profile.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NoteListComponent,
    NoteBoardComponent,
    LoginComponent,
    FormLoginComponent,
    FormSigninComponent,
    NoteComponent,
    TruncatePipe,
    ReversePipe,
    PasswordMatchDirective,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
