import React, { useState, useEffect } from "react";
import moment from "moment";
import './Calendar.scss';
import { CalendarProps } from "./Calendar.types";

const Calendar: React.FC<CalendarProps> = ({
  dateValue,
  setDateValue,
}: CalendarProps) => {

  const [animation, setAnimation] = useState('');
  const [yeardrawer, setYeardrawer] = useState(false);

  const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const handlePrevMonth = () => {
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
    setAnimation('fade');
    setDateValue(prevDateValue => {
      const year = prevDateValue.getFullYear();
      const month = prevDateValue.getMonth();
      const day = prevDateValue.getDate();
    
      // Calculate the last day of the next month
      const nextMonthLastDay = new Date(year, month + 2, 0).getDate();
    
      let newDate;
      if (day > nextMonthLastDay) {
        // If the selected day is greater than the last day of the next month,
        // set it to the last day of the next month
        newDate = new Date(year, month + 1, nextMonthLastDay);
      } else {
        // Otherwise, proceed with the regular next month calculation
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
    if (day === null) return;
    
    setDateValue(prevDateValue => {
      const newDate = new Date(prevDateValue.getFullYear(), prevDateValue.getMonth(), day);
      return newDate;
    });
    
  };

  const handleSelectedYear = (yeardata: number | null) => {
    if (yeardata === null) return;
    
    setDateValue(prevDateValue => {
      const newDate = new Date(yeardata, prevDateValue.getMonth(), prevDateValue.getDate());
      return newDate;
    });
    
    setYeardrawer(false);
  }
  
  const handleyearselecter = () => {
    if (yeardrawer) {
      setYeardrawer(false);
    } else {
      setYeardrawer(true);
    }
  }

  const [yearsArray, setYearsArray] = useState<number[]>([]);
  
  const getyearlist = () => {
    const currentYear = new Date().getFullYear();
  
  for (let i = currentYear - 100; i <= currentYear + 99; i++) {
    setYearsArray(prevYearsArray => [...prevYearsArray, i]);
  }
}
  useEffect(()=>{
    getyearlist();
  },[])
  
  const daysArray:any[]  = [];
  
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth();

  const firstDayOfMonth = moment(`${year}-${month + 1}-01`, 'YYYY-M-D');
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const firstDayOfWeek = firstDayOfMonth.day();
    
  
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
      <div className="cal-container">
        <div className="cal-header">
          <h3 className={`cal-header-title ${yeardrawer ? 'rotate' : 'rotatereverse'}`} onClick={handleyearselecter}>
            {dateValue.toLocaleString('default', { month: 'short' })} {dateValue.getFullYear() }
            <svg
              focusable="false"
              aria-hidden="true"
              width="25"
              height="25"
              fill='#616161'
              viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
              <path
                stroke='#616161'
                d="M7 10l5 5 5-5z"></path></svg>
          </h3>
          <div className='cal-header-btn'>
            <button className="prev-month" onClick={handlePrevMonth}>
              <svg
                width="12"
                height="16"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 11L1 6L7 1" stroke="#616161" strokeWidth="2" />
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
                <path d="M1 11L7 6L1 1" stroke="#616161" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>

        {
          yeardrawer ? (
            <div className='cal-years-group'>
              {yearsArray.map((yeardata, index) => (
                <button
                  key={index}
                  className={`${yeardata == null ? '' : 'cal-year-cell'} ${yeardata === dateValue.getFullYear() ? 'selected' : ''}`}
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
                      className={`${day == null ? 'calendar-cell-null' : 'calendar-cell'} ${day === dateValue.getDate() ? 'selected' : ''}`}
                      onClick={() => handleselectedDate(day)}
                    >
                      {day !== null ? day : ''}
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