import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlotlyComponent } from 'src/app/components/ploty/ploty.component';

@NgModule({
  declarations: [PlotlyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PlotlyComponent }]),
  ],
})
export class PlotlyModule {}
