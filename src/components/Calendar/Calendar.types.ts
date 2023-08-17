export interface CalendarProps {
  dateValue: Date;
  setDateValue: React.Dispatch<React.SetStateAction<Date>>;
  darkMode?: boolean;
  readOnly?: boolean;
  yearRange?: [number, number];
}

export const isValidYear = (year: number) => {
  return year > 1800 && year < 3000;
};