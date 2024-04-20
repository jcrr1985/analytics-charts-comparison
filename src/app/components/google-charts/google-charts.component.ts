import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'app-google-charts',
  template: `
    <div class="chart-wrapper">
      <google-chart *ngIf="type === 'pie'" [data]="pieChartData"></google-chart>
      <google-chart *ngIf="type === 'bar'" [data]="barChartData"></google-chart>
    </div>
  `,
  styleUrls: ['./google-charts.component.scss'],
})
export class GoogleChartsComponent implements OnInit, AfterViewInit {
  @Input() type!: any;
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const data = this.dataService.getVisitDetails();
    data.forEach((e) => {
      this.pieChartData.dataTable.push([e.country, e.visits]);
      this.barChartData.dataTable.push([e.country, e.visits]);
    });
  }

  ngAfterViewInit() {}

  public pieChartData: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [['Country', 'Visits']],
    options: {
      allowHtml: true,
      allowCollapse: true,
    },
  };

  public barChartData: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: [['Country', 'Visits']],
    options: {
      title: 'Visits by Country (Bar Chart)',
      legend: { position: 'top' },
    },
  };
}
