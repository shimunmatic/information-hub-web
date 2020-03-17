export interface ChartEntry {
    name: Date;
    value: number;
}

export interface ChartModel{
    name: string;
    series: ChartEntry[];
}