import { Component, OnInit } from '@angular/core';
import { ChartService } from './../../services/chart/chart.service';

@Component({
  selector: 'app-chart-selector',
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss'],
})
export class ChartSelectorComponent implements OnInit {
  libraries: { label: string; value: string }[] = [
    { label: 'Chart.js', value: 'chartjs' },
    { label: 'C3', value: 'c3' },
    { label: 'D3', value: 'd3' },
    { label: 'Plotly', value: 'plotly' },
    { label: 'Three.js', value: 'threejs' },
    { label: 'Google Charts', value: 'googlecharts' },
  ];
  selectedLibrary!: { label: string; value: string };

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {}

  selectLibrary() {
    if (this.selectedLibrary) {
      console.log('Library selected:', this.selectedLibrary.value);
      this.chartService.setSelectedLibrary(this.selectedLibrary.value);
    }
  }
}
