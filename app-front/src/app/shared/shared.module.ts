import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {  NgZorroAntdModule } from 'ng-zorro-antd';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { PasswordMatchDirective } from './directive/password-match.directive';
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [
    TruncatePipe,
    ReversePipe,
    PasswordMatchDirective,
    SearchPipe
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
    PasswordMatchDirective,
    SearchPipe
  ]
})
export class SharedModule { }
