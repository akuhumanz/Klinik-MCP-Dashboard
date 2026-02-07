export type InspectionResult = 'Normal' | 'Abnormal' | 'Atensi' | 'Kritis';

export interface Participant {
  id: string;
  date: string;
  time: string;
  name: string;
  userId: string;
  subText: string;
  company?: string; // New field for Company tab
  mcuNo: string;
  dob: string;
  gender: 'P' | 'L';
  result: InspectionResult;
}

export type ActiveTab = 'perorangan' | 'perusahaan';

export interface FilterOption {
  label: string;
  value: string;
}