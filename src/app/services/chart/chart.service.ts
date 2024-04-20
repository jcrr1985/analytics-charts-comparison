import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private selectedLibrary = new BehaviorSubject<string>('chartjs');
  selectedLibrary$ = this.selectedLibrary.asObservable();

  setSelectedLibrary(lib: string) {
    this.selectedLibrary.next(lib);
  }

  constructor() {}
}
