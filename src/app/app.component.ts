import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from './services/chart/chart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'analytics-charts-comparison';
  selectedLib!: string;
  selectedLibSubscription!: Subscription;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.selectedLibSubscription = this.chartService.selectedLibrary$.subscribe(
      (lib) => {
        this.selectedLib = lib;
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedLibSubscription.unsubscribe();
  }
}
