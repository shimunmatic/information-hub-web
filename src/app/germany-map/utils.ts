export function getStateCodeFromName(name: string) {
  switch (name) {
      case 'Baden-Württemberg':
          return 'DE-BW';
      case 'Bayern':
          return 'DE-BY';
      case 'Berlin':
          return 'DE-BE';
      case 'Brandenburg':
          return 'DE-BB';
      case 'Bremen':
          return 'DE-HB';
      case 'Hamburg':
          return 'DE-HH';
      case 'Hessen':
          return 'DE-HE';
      case 'Niedersachsen':
          return 'DE-NI';
      case 'Mecklenburg-Vorpommern':
          return 'DE-MV';
      case 'Nordrhein-Westfalen':
          return 'DE-NW';
      case 'Rheinland-Pfalz':
          return 'DE-RP';
      case 'Saarland':
          return 'DE-SL';
      case 'Sachsen':
          return 'DE-SN';
      case 'Sachsen-Anhalt':
          return 'DE-ST';
      case 'Schleswig-Holstein':
          return 'DE-SH';
      case 'Thüringen':
          return 'DE-TH';
      default:
          return name;
  }
}

export const options = {
  region: 'DE',
  resolution: 'provinces',
  colorAxis: { colors: ['green', 'blue'] }
};

export const trData = [
    ['Province', 'Name', 'Population', 'Area'],
    ['DE-BW', 'Baden-Württemberg', 2761477, 1285.31],
    ['DE-BY', 'Bayern', 1024110, 181.76],
    ['DE-BE', 'Berlin', 24110, 181.76],
    ['DE-BB', 'Brandenburg', 10, 181.76],
    ['DE-HB', 'Bremen', 1324110, 181.76],
    ['DE-HH', 'Hamburg', 13210, 181.76],
    ['DE-HE', 'Hesse', 131241, 181.76],
    ['DE-NI', 'Niedersachsen', 1324110, 181.76],
    ['DE-MV', 'Mecklenburg-Vorpommern', 1324110, 181.76],
    ['DE-NW', 'Nordrhein-Westfalen', 1324110, 181.76],
    ['DE-RP', 'Rheinland-Pfalz', 1324110, 181.76],
    ['DE-SL', 'Saarland', 1324110, 181.76],
    ['DE-SN', 'Sachsen', 1324110, 181.76],
    ['DE-ST', 'Sachsen-Anhalt', 1324110, 181.76],
    ['DE-SH', 'Schleswig-Holstein', 1324110, 181.76],
    ['DE-TH', 'Thüringen', 1324110, 181.76],
];