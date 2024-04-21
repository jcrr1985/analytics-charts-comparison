import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThreejsChartsComponent } from 'src/app/components/threejs-charts/threejs-charts.component';

@NgModule({
  declarations: [ThreejsChartsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ThreejsChartsComponent }]),
  ],
})
export class ThreejsModule {}
