import { ProcessedDate } from './processed-date';

export interface CountryState {
    id: number;
    countryName: string;
    stateName: string;
    confirmedCases: number;
    deathCases: number;
    recoveredCases: number;
    lastUpdated: Date;
    processedDate: ProcessedDate;
  }