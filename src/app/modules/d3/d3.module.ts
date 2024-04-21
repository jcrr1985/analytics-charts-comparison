import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { D3Component } from 'src/app/components/d3/d3.component';

@NgModule({
  declarations: [D3Component],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: D3Component }]),
  ],
})
export class D3Module {}
