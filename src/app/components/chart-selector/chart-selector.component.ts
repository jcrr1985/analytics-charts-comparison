import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['chartjs']);
  }

  selectLibrary() {
    if (this.selectedLibrary) {
      console.log('Library selected:', this.selectedLibrary.value);
      this.router.navigate([this.selectedLibrary.value]);
    }
  }
}
