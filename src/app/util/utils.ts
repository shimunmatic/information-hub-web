import { CountryState, ChartModel, ChartEntry } from 'models';

export function convertToChartModel(countryStates: CountryState[]): ChartModel[] {
  const data: ChartModel[] = [];

  const confirmedCases: ChartModel = {
    name: 'Confirmed',
    series: []
  };
  const deathCases: ChartModel = {
    name: 'Deaths',
    series: []
  };
  const recoveredCases: ChartModel = {
    name: 'Recovered',
    series: []
  };

  countryStates.forEach(state => {
    const confirmedEntry: ChartEntry = {
      name: new Date(state.processedDate.processedDate),
      value: state.confirmedCases
    };
    const deathsEntry: ChartEntry = {
      name: new Date(state.processedDate.processedDate),
      value: state.deathCases
    };
    const recoveredEntry: ChartEntry = {
      name: new Date(state.processedDate.processedDate),
      value: state.recoveredCases
    };
    confirmedCases.series.push(confirmedEntry);
    deathCases.series.push(deathsEntry);
    recoveredCases.series.push(recoveredEntry);
  });

  data.push(confirmedCases, deathCases, recoveredCases);
  return data;
}