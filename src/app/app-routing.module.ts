import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chartjs',
    loadChildren: () =>
      import('./modules/chartjs/chartjs.module').then((m) => m.ChartjsModule),
  },
  {
    path: 'd3',
    loadChildren: () =>
      import('./modules/d3/d3.module').then((m) => m.D3Module),
  },

  {
    path: 'c3',
    loadChildren: () =>
      import('./modules/c3/c3.module').then((m) => m.C3Module),
  },
  {
    path: 'threejs',
    loadChildren: () =>
      import('./modules/threejs/threejs.module').then((m) => m.ThreejsModule),
  },

  {
    path: 'plotly',
    loadChildren: () =>
      import('./modules/plotly/plotly.module').then((m) => m.PlotlyModule),
  },

  {
    path: 'googlecharts',
    loadChildren: () =>
      import('./modules/googlecharts/googlecharts.module').then(
        (m) => m.GooglechartsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
