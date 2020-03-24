import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {  NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [],
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
    NgZorroAntdModule
  ]
})
export class SharedModule { }
