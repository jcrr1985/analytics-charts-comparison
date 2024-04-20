import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-chartjs',
  template: `
    <div class="canvas-wrapper">
      <canvas #barChart *ngIf="type === 'bar'"></canvas
      ><canvas #pieChart *ngIf="type === 'pie'"></canvas>
    </div>
  `,
  styleUrls: ['./chartjs.component.scss'],
})
export class ChartjsComponent implements OnInit, AfterViewInit {
  @Input() type!: any;
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const data = this.dataService.getVisitDetails();
    const ctx =
      this.type === 'bar'
        ? this.barChart.nativeElement.getContext('2d')
        : this.pieChart.nativeElement.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: this.type === 'bar' ? 'bar' : 'pie',
        data: {
          labels: data.map((d) => d.country),
          datasets: [
            {
              ...(this.type === 'bar' ? { label: 'Visits' } : {}),
              data: data.map((d) => d.visits),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
