import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartjsComponent } from 'src/app/components/chartjs/chartjs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChartjsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChartjsComponent }]),
  ],
})
export class ChartjsModule {}
