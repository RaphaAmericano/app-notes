import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {  NgZorroAntdModule } from 'ng-zorro-antd';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { PasswordMatchDirective } from './directive/password-match.directive';
import { SearchPipe } from './pipes/search.pipe';
import { MilisecondsPipe } from './pipes/miliseconds.pipe';



@NgModule({
  declarations: [
    TruncatePipe,
    ReversePipe,
    MilisecondsPipe,
    PasswordMatchDirective,
    SearchPipe,
    MilisecondsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule
    
  ],
  exports:[
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    //pipes
    TruncatePipe,
    ReversePipe,
    MilisecondsPipe,
    PasswordMatchDirective,
    SearchPipe
  ]
})
export class SharedModule { }
