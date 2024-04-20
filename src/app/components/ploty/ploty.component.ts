import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import * as Plotly from 'plotly.js-dist';

@Component({
  selector: 'app-plotly',
  template: `
    <div>
      <div #barChart *ngIf="type === 'bar'"></div>
      <div #pieChart *ngIf="type === 'pie'"></div>
    </div>
  `,
  styleUrls: ['./ploty.component.scss'],
})
export class PlotlyComponent implements AfterViewInit {
  @Input() type!: string;
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const data = this.dataService.getVisitDetails();

    if (this.type === 'bar') {
      const layout = {
        barmode: 'group' as const,
        xaxis: { title: 'Country' },
        yaxis: { title: 'Visits' },
      };

      const traces = data.map((d) => ({
        x: [d.country],
        y: [d.visits],
        type: 'bar' as const,
        name: d.country,
      }));

      Plotly.newPlot(this.barChart.nativeElement, traces, layout);
    } else if (this.type === 'pie') {
      const trace = {
        labels: data.map((d) => d.country),
        values: data.map((d) => d.visits),
        type: 'pie' as const,
      };

      const layout = { title: 'Visits by Country' };
      Plotly.newPlot(this.pieChart.nativeElement, [trace], layout);
    }
  }
}
