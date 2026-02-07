import { Participant } from './types';

export const MOCK_PERORANGAN: Participant[] = Array.from({ length: 20 }, (_, i) => ({
  id: `ind-${i + 1}`,
  date: `${20 + (i % 10)} Jan 2024`,
  time: '10:00 WIB',
  name: [
    'BUDI SANTOSO, S.T.', 'SITI AMINAH', 'AGUS PRAYOGO', 'DEWI LESTARI', 
    'JOKO SUSILO', 'RATNA SARI', 'EKO PRASETYO', 'SRI WAHYUNI', 
    'BAMBANG SUDARMONO', 'ANI SETIOWATI', 'RUDI KUSUMA', 'MAYA INDAH',
    'HENDRA WIJAYA', 'SISKA AMELIA', 'DONI SAPUTRA', 'LIA PERMATA',
    'INDRA LESMANA', 'WULAN GURITNO', 'GADING MARTEN', 'RAISA ANDRIANA'
  ][i % 20],
  userId: `239910${i}`,
  subText: `User ID : 239910${i}`,
  mcuNo: `0002993${100 + i}`,
  dob: '12 May 1990',
  gender: i % 2 === 0 ? 'P' : 'L',
  result: (['Normal', 'Abnormal', 'Atensi', 'Kritis'] as const)[i % 4],
}));

export const MOCK_PERUSAHAAN: Participant[] = Array.from({ length: 25 }, (_, i) => ({
  id: `corp-${i + 1}`,
  date: `${10 + (i % 10)} Feb 2024`,
  time: '08:30 WIB',
  name: [
    'AHMAD ZAELANI', 'SRI WAHYUNI', 'BAMBANG HERMANTO', 'LULUK FATMAWATI', 
    'AGUS SULISTYO', 'REZA RAHADIAN', 'DIAN SASTRO', 'NICHOLAS SAPUTRA', 
    'CHELSEA ISLAN', 'JOE TASLIM', 'HAMISH DAUD', 'ADINIA WIRASTI',
    'VINO G BASTIAN', 'MARSHA TIMOTHY', 'LUKMAN SARDI'
  ][i % 15],
  userId: `EMP-J99-${500 + i}`,
  subText: ['J99 Trans Group', 'PT Mitra Sejahtera', 'CV Maju Mapan', 'PT Sumber Makmur'][i % 4],
  company: ['J99 Trans Group', 'PT Mitra Sejahtera', 'CV Maju Mapan', 'PT Sumber Makmur'][i % 4],
  mcuNo: `J99-MCU-${800 + i}`,
  dob: '15 Aug 1985',
  gender: i % 3 === 0 ? 'P' : 'L',
  result: (['Normal', 'Abnormal', 'Atensi'] as const)[i % 3],
}));