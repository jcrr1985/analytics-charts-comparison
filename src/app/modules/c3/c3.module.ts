import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { C3Component } from 'src/app/components/c3/c3.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [C3Component],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: C3Component,
      },
    ]),
  ],
})
export class C3Module {}
