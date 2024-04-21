import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleChartsComponent } from 'src/app/components/google-charts/google-charts.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GoogleChartsComponent],
  imports: [
    CommonModule,
    Ng2GoogleChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: GoogleChartsComponent,
      },
    ]),
  ],
})
export class GooglechartsModule {}
