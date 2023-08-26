import React, { useState, useEffect } from "react";
import './Calendar.scss';
import { CalendarProps, isValidYear } from "./Calendar.types";

const Calendar: React.FC<CalendarProps> = ({
  dateValue,
  setDateValue,
  darkMode = false,
  readOnly = false,
  yearRange,
}: CalendarProps) => {

  const [animation, setAnimation] = useState('');
  const [yeardrawer, setYeardrawer] = useState(false);
  const [darkModevalue, setDarkModevalue] = useState(darkMode);

  const weekdaysShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handlePrevMonth = () => {
    if (readOnly) return;
    setAnimation('fade');

    setDateValue(prevDateValue => {
      const year = prevDateValue.getFullYear();
      const month = prevDateValue.getMonth();
      const day = prevDateValue.getDate();

      const prevMonthLastDay = new Date(year, month, 0).getDate();

      let newDate;
      if (day > prevMonthLastDay) {
        newDate = new Date(year, month - 1, prevMonthLastDay);
      } else {
        const newYear = month === 0 ? year - 1 : year;
        const newMonth = month === 0 ? 11 : month - 1;
        newDate = new Date(newYear, newMonth, day);
      }

      return newDate;
    });


    let timer = setTimeout(() => {
      setAnimation('');
      clearTimeout(timer);
    }, 500);
  };

  const handleNextMonth = () => {
    if (readOnly) return;
    setAnimation('fade');
    setDateValue(prevDateValue => {
      const year = prevDateValue.getFullYear();
      const month = prevDateValue.getMonth();
      const day = prevDateValue.getDate();

      const nextMonthLastDay = new Date(year, month + 2, 0).getDate();

      let newDate;
      if (day > nextMonthLastDay) {
        newDate = new Date(year, month + 1, nextMonthLastDay);
      } else {
        const newYear = month === 11 ? year + 1 : year;
        const newMonth = (month + 1) % 12;
        newDate = new Date(newYear, newMonth, day);
      }

      return newDate;
    });

    let timer = setTimeout(() => {
      setAnimation('');
      clearTimeout(timer);
    }, 500);
  };


  const handleselectedDate = (day: number | null) => {
    if (readOnly) return;
    if (day === null) return;

    setDateValue(prevDateValue => {
      const newDate = new Date(prevDateValue.getFullYear(), prevDateValue.getMonth(), day);
      return newDate;
    });

  };

  const handleSelectedYear = (yeardata: number | null) => {
    if (readOnly) return;
    if (yeardata === null) return;

    setDateValue(prevDateValue => {
      const newDate = new Date(yeardata, prevDateValue.getMonth(), prevDateValue.getDate());
      return newDate;
    });

    setYeardrawer(false);
  }

  const handleyearselecter = () => {
    if (readOnly) return;
    if (yeardrawer) {
      setYeardrawer(false);
    } else {
      setYeardrawer(true);
    }
  }
  
  
  function generateYearlyArray(startYear: number, endYear: number): number[] {
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }
  
  const [yearsArray, setYearsArray] = useState<number[]>([]);
  
  useEffect(() => {
    
    if (yearRange && isValidYear(yearRange[0]) && isValidYear(yearRange[1])) {
      const rangeStart = Math.min(yearRange[0], yearRange[1]);
      const rangeEnd = Math.max(yearRange[0], yearRange[1]);
      const tempArray = generateYearlyArray(rangeStart, rangeEnd);
      
      setYearsArray(tempArray);

    } else {
      const currentYear = new Date().getFullYear();
      const tempArray = generateYearlyArray(currentYear - 50, currentYear);

      setYearsArray(tempArray);
    }
  }, [yearRange]);

    
  useEffect(() => {
    setDarkModevalue(darkMode);
  }, [darkMode])
  
  
  const currdate = new Date();

  const daysArray: any[] = [];

  const year = dateValue.getFullYear();
  const month = dateValue.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();  

  for (let i = 0; i < firstDayOfWeek; i++) {
    daysArray.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  const calendarRows: any[] = [];
  let calendarRow: any[] = [];

  daysArray.forEach((day, index) => {
    if (index > 0 && index % 7 === 0) {
      calendarRows.push(calendarRow);
      calendarRow = [];
    }
    calendarRow.push(day);
  });

  if (calendarRow.length > 0) {
    calendarRows.push(calendarRow);
  }
  
  return (
    <>
      <div className={`cal-container${darkModevalue ? " darkmode" : ''}`}>
        <div className="cal-header">
          <h3 className={`cal-header-title ${yeardrawer ? 'rotate' : 'rotatereverse'}`} onClick={handleyearselecter}>
            {dateValue.toLocaleString('default', { month: 'short' })} {dateValue.getFullYear()}
            {!readOnly && (
            <svg
              focusable="false"
              aria-hidden="true"
              width="25"
              height="25"
              fill={`${darkMode ? "white" : "#616161" }`}
              viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
              <path
                stroke='none'
                d="M7 10l5 5 5-5z"></path>
              </svg>
            )}
          </h3>
          {yeardrawer || !readOnly && (
          <div className='cal-header-btn'>
            <button className="prev-month" onClick={handlePrevMonth}>
              <svg
                width="12"
                height="16"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 11L1 6L7 1" stroke={`${darkMode ? "white" : "#616161" }`} strokeWidth="2" />
              </svg>
            </button>
            <button className="next-month" onClick={handleNextMonth}>
              <svg
                width="12"
                height="16"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 11L7 6L1 1" stroke={`${darkMode ? "white" : "#616161" }`} strokeWidth="2" />
              </svg>
            </button>
          </div>
          )}
        </div>

        {
          yeardrawer ? (
            <div className='cal-years-group'>
              {yearsArray && yearsArray.map((yeardata, index) => (
                <button
                  key={index}
                  className={`${yeardata !== null && 'cal-year-cell'} ${yeardata === dateValue.getFullYear() ? 'selected' : ''}`}
                  onClick={() => handleSelectedYear(yeardata)}
                >
                  {yeardata}
                </button>
              ))}
            </div>
          ) :
            <div className="cal-group">
              <div className='cal-group-header'>
                {weekdaysShort.map((day, idx) => (
                  <span key={idx} className="cal-group-header-weeks">
                    {day}
                  </span>
                ))}
              </div>
              <div className='cal-group-days'>
                <div className={`calendar-grid ${animation}`}>
                  {daysArray.map((day: any, index) => (
                    
                    <button
                      key={index}
                      className={`${day == null ? 'calendar-cell-null' : 'calendar-cell'} ${day === dateValue.getDate() ? 'selected' : ''}${day === currdate.getDate() && dateValue.getMonth() === currdate.getMonth() && dateValue.getFullYear() === currdate.getFullYear() && day !== dateValue.getDate() ? 'today' : ''}`}
                      onClick={() => handleselectedDate(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
        }
      </div>
    </>
  );
};

export default Calendar;

Calendar.defaultProps = {
  darkMode: false,
  readOnly: false,
};