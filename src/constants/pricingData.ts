export interface OnewayRateItem {
  srNo: number;
  origin: string;
  destination: string;
  sedanRate: number;
  ertigaRate: number;
  innovaRate: number;
}

export const ONEWAY_RATE_LIST: OnewayRateItem[] = [
  { srNo: 1, origin: "Dehradun", destination: "Delhi", sedanRate: 3600, ertigaRate: 4500, innovaRate: 6500 },
  { srNo: 2, origin: "Dehradun", destination: "Noida", sedanRate: 3600, ertigaRate: 4500, innovaRate: 6500 },
  { srNo: 3, origin: "Dehradun", destination: "Ghaziabad", sedanRate: 3600, ertigaRate: 4500, innovaRate: 6500 },
  { srNo: 4, origin: "Dehradun", destination: "Noida (Expressway)", sedanRate: 3600, ertigaRate: 4500, innovaRate: 6500 },
  { srNo: 5, origin: "Dehradun", destination: "Greater Noida", sedanRate: 3900, ertigaRate: 4800, innovaRate: 6800 },
  { srNo: 6, origin: "Dehradun", destination: "Gurugram", sedanRate: 4200, ertigaRate: 5000, innovaRate: 7200 },
  { srNo: 7, origin: "Dehradun", destination: "Faridabad", sedanRate: 4200, ertigaRate: 5000, innovaRate: 7200 },
  { srNo: 8, origin: "Dehradun", destination: "Haridwar", sedanRate: 1400, ertigaRate: 2500, innovaRate: 4000 },
  { srNo: 9, origin: "Dehradun", destination: "Rishikesh", sedanRate: 1400, ertigaRate: 2500, innovaRate: 4000 },
  { srNo: 10, origin: "Dehradun", destination: "Mussoorie", sedanRate: 1400, ertigaRate: 2500, innovaRate: 4000 },
  { srNo: 11, origin: "Dehradun", destination: "Saharanpur", sedanRate: 1700, ertigaRate: 2700, innovaRate: 4200 },
  { srNo: 12, origin: "Dehradun", destination: "Roorkee", sedanRate: 1700, ertigaRate: 2700, innovaRate: 4200 },
  { srNo: 13, origin: "Dehradun", destination: "Jollygrant Airport", sedanRate: 999, ertigaRate: 1399, innovaRate: 1899 },
  { srNo: 14, origin: "Dehradun", destination: "Chandigarh", sedanRate: 3300, ertigaRate: 4300, innovaRate: 5800 },
  { srNo: 15, origin: "Dehradun", destination: "Mohali", sedanRate: 3300, ertigaRate: 4300, innovaRate: 5800 },
  { srNo: 16, origin: "Dehradun", destination: "Kotdwar", sedanRate: 3200, ertigaRate: 4400, innovaRate: 5800 },
  { srNo: 17, origin: "Dehradun", destination: "Nainital", sedanRate: 4800, ertigaRate: 5800, innovaRate: 7800 },
  { srNo: 18, origin: "Dehradun", destination: "Haldwani", sedanRate: 4400, ertigaRate: 5400, innovaRate: 7200 },
  { srNo: 19, origin: "Dehradun", destination: "Rudrapur", sedanRate: 4400, ertigaRate: 5400, innovaRate: 7200 },
  { srNo: 20, origin: "Dehradun", destination: "Kashipur", sedanRate: 3900, ertigaRate: 4900, innovaRate: 6500 },
  { srNo: 21, origin: "Dehradun", destination: "Agra", sedanRate: 6500, ertigaRate: 8000, innovaRate: 10500 },
  { srNo: 22, origin: "Dehradun", destination: "Jaipur", sedanRate: 7800, ertigaRate: 9600, innovaRate: 14500 },
  { srNo: 23, origin: "Dehradun", destination: "Amritsar", sedanRate: 6500, ertigaRate: 8000, innovaRate: 10000 },
  { srNo: 24, origin: "Dehradun", destination: "Ambala", sedanRate: 3200, ertigaRate: 4500, innovaRate: 5500 },
  { srNo: 25, origin: "Dehradun", destination: "Jalandhar", sedanRate: 5500, ertigaRate: 6500, innovaRate: 9000 },
  { srNo: 26, origin: "Dehradun", destination: "Jammu", sedanRate: 8500, ertigaRate: 11000, innovaRate: 14000 },
  { srNo: 27, origin: "Dehradun", destination: "Karnal", sedanRate: 3800, ertigaRate: 4600, innovaRate: 7000 },
  { srNo: 28, origin: "Dehradun", destination: "Ludhiana", sedanRate: 4500, ertigaRate: 5500, innovaRate: 8000 },
  { srNo: 29, origin: "Dehradun", destination: "Patiala", sedanRate: 4500, ertigaRate: 5500, innovaRate: 7500 },
  { srNo: 30, origin: "Dehradun", destination: "Panchkula", sedanRate: 3400, ertigaRate: 4500, innovaRate: 6000 },
  { srNo: 31, origin: "Dehradun", destination: "Panipat", sedanRate: 3800, ertigaRate: 4900, innovaRate: 7400 },
  { srNo: 32, origin: "Dehradun", destination: "Rohtak", sedanRate: 3800, ertigaRate: 4900, innovaRate: 7400 },
  { srNo: 33, origin: "Dehradun", destination: "Sonipat", sedanRate: 3800, ertigaRate: 4900, innovaRate: 7400 },
  { srNo: 34, origin: "Dehradun", destination: "Moradabad", sedanRate: 3800, ertigaRate: 4900, innovaRate: 7400 },
  { srNo: 35, origin: "Dehradun", destination: "Yamunanagar", sedanRate: 3300, ertigaRate: 4500, innovaRate: 5800 },
  { srNo: 36, origin: "Dehradun", destination: "Zirakpur", sedanRate: 3300, ertigaRate: 4500, innovaRate: 5800 },
];
