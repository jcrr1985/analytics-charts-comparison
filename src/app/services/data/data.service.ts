import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private analyticsData = {
    visitDetails: [
      { country: 'Chile', visits: 2460, averageSessionTime: 700 },
      { country: 'Estados Unidos', visits: 2500, averageSessionTime: 300 },
      { country: 'Colombia', visits: 3800, averageSessionTime: 290 },
      { country: 'Brasil', visits: 1400, averageSessionTime: 360 },
      { country: 'Rusia', visits: 960, averageSessionTime: 500 },
    ],
    userDemographics: [
      {
        ageRange: '18-24',
        male: 50,
        female: 70,
        nonBinary: 2,
        interests: ['Tecnología', 'Entretenimiento'],
      },
      {
        ageRange: '25-34',
        male: 80,
        female: 60,
        nonBinary: 1,
        interests: ['Finanzas', 'Educación'],
      },
      {
        ageRange: '35-44',
        male: 75,
        female: 65,
        nonBinary: 0,
        interests: ['Negocios', 'Salud'],
      },
    ],
  };

  constructor() {}

  getVisitDetails() {
    return this.analyticsData.visitDetails;
  }

  getUserDemographics() {
    return this.analyticsData.userDemographics;
  }
}
