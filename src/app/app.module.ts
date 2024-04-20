import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartSelectorComponent } from './components/chart-selector/chart-selector.component';
import { ChartjsComponent } from './components/chartjs/chartjs.component';
import { C3Component } from './components/c3/c3.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { D3Component } from './components/d3/d3.component';
import { PlotlyComponent } from './components/ploty/ploty.component';
import { GoogleChartsComponent } from './components/google-charts/google-charts.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ThreejsChartsComponent } from './components/threejs-charts/threejs-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartSelectorComponent,
    ChartjsComponent,
    C3Component,
    D3Component,
    PlotlyComponent,
    GoogleChartsComponent,
    ThreejsChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
