export interface StartTrackDto {
  start: number;
  project: string;
  description: string;
  user: string;
}

export interface StopTrackDto {
  id: string;
  stop: number;
}
