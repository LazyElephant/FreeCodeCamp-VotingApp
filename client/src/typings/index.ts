export interface ChartData {
  name: string;
  value: number;
}

export interface PollData {
  name: string;
}

export type EventHandler = (e:Event) => void
