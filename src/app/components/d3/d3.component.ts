import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import * as d3 from 'd3';

interface VisitData {
  country: string;
  visits: number;
  averageSessionTime: number;
}

@Component({
  selector: 'app-d3',
  template: `
    <div>
      <div
        id="tooltip"
        style="position: absolute; opacity: 0; pointer-events: none; transition: opacity 0.3s;"
      ></div>
      <div #barChart *ngIf="type === 'bar'"></div>
      <div #pieChart *ngIf="type === 'pie'"></div>
    </div>
  `,
  styleUrls: ['./d3.component.scss'],
})
export class D3Component implements AfterViewInit {
  @Input() type!: string;
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.createChart();
  }
  createChart() {
    const data = this.dataService.getVisitDetails();
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const tooltip = d3.select('#tooltip');

    if (this.type === 'bar') {
      const svg = d3
        .select(this.barChart.nativeElement)
        .append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', '100%')
        .style('width', '100%')
        .attr(
          'viewBox',
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.country))
        .padding(0.2);

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      const maxVisits = d3.max(data, (d) => d.visits);
      const yDomainMax = maxVisits !== undefined ? maxVisits : 0;

      const y = d3.scaleLinear().domain([0, yDomainMax]).range([height, 0]);

      svg.append('g').call(d3.axisLeft(y));

      svg
        .selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => x(d.country) ?? 0)
        .attr('y', (d) => y(d.visits))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.visits))
        .attr('fill', '#69b3a2')
        .on('mouseover', function (event: any, d: any) {
          console.log('d', d);
          d3.select(this).attr('fill', 'orange');
          tooltip
            .style('opacity', 1)
            .html(`Country: ${d.country}<br>Visits: ${d.visits}`)
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 10 + 'px');
          d3.select(this).style('fill', 'orange');
        })
        .on('mouseout', function (d) {
          tooltip.style('opacity', 0);
          d3.select(this).style('fill', '#69b3a2');
        });
    } else if (this.type === 'pie') {
      const svg = d3
        .select(this.pieChart.nativeElement)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr(
          'transform',
          `translate(${width / 2 + margin.left},${height / 2 + margin.top})`
        );

      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const pie = d3.pie().value((d: any) => d.visits);
      const data_ready = pie(data as any);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc as any)
        .attr('fill', (d: any) => color(d.data.country))
        .on('mouseover', function (event: any, d: any) {
          tooltip
            .style('opacity', 1)
            .html(`Country: ${d.data.country}<br>Visits: ${d.data.visits}`)
            .style('left', event.pageX + 10 + 'px')
            .style('top', event.pageY - 10 + 'px');
          d3.select(this).style('opacity', 0.7);
        })
        .on('mouseout', function (d) {
          tooltip.style('opacity', 0);
          d3.select(this).style('opacity', 1);
        });

      svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('text')
        .text((d: any) => d.data.country)
        .attr('transform', (d: any) => `translate(${arc.centroid(d as any)})`)
        .style('text-anchor', 'middle')
        .style('font-size', 15);
    }
  }
}
