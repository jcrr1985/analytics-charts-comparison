import { Component, Input, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-c3',
  templateUrl: './c3.component.html',
  styleUrls: ['./c3.component.scss'],
})
export class C3Component implements OnInit {
  @Input() type!: string;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const data = this.dataService.getVisitDetails();

    if (this.type === 'bar') {
      this.createBarChart(data);
    } else if (this.type === 'pie') {
      this.createPieChart(data);
    }
  }

  createBarChart(data: any[]) {
    const categories: [string, ...string[]] = [
      'x',
      ...data.map((d) => d.country),
    ];

    const visits: [string, ...number[]] = [
      'Visits',
      ...data.map((d) => d.visits),
    ];

    const chart = c3.generate({
      bindto: '#c3-bar',
      data: {
        x: 'x',
        columns: [categories, visits],
        type: 'bar',
      },
      axis: {
        x: {
          type: 'category',
        },
      },
      bar: {
        width: {
          ratio: 0.5,
        },
      },
    });
  }

  createPieChart(data: any[]) {
    const chartData: [string, number][] = data.map((d) => [
      d.country,
      d.visits,
    ]); // Datos para las secciones del pastel
    const chart = c3.generate({
      bindto: '#c3-pie',
      data: {
        columns: chartData,
        type: 'pie',
      },
      pie: {
        label: {
          format: function (value, ratio, id) {
            return `${value}`;
          },
        },
      },
    });
  }
}
