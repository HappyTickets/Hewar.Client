export interface IScheduleEntry {
  id?: number;
  contractId?: number;
  locationAr: string;
  locationEn: string;
  guardsRequired: number;
  shiftTimeAr: string;
  shiftTimeEn: string;
  notesAr: string;
  notesEn: string;
  editing?: boolean;
  new?: boolean;
}
