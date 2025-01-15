import React, { useState } from "react";
import Calendar from "react-calendar";

function Model({
  closemodel,
  modelheading,
  areaname,
  setapointdate,
  mindateOfCalender,
  maxdateOfCalender,
  DisableingDate,
}) {
  let disabledDatesSet = new Set(
    DisableingDate &&
      DisableingDate.filter((date) => {
        if (!date) return false;
        const dateParts = date.replace(/[()]/g, "").split(", ");
        const dates = dateParts[0].split(" ");
        const year = new Date().getFullYear();
        const dateString = `${dates[2]} ${dates[1]}, ${year}`;
        const parsedDate = new Date(dateString);
        return (
          parsedDate >= mindateOfCalender && parsedDate <= maxdateOfCalender
        );
      })
  );

  const handelclose = () => {
    closemodel(false);
    document.body.style.overflow = "unset";
  };
  /*   const disabledDatesSet = new Set(DisableingDate);
   */ const getNonWeekendDay = (date) => {
    // Check if the current date is a weekend day
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }

    return date;
  };

  const [selectedDate, setSelecteddate] = useState(
    getNonWeekendDay(mindateOfCalender)
  );
  const selecteddate = selectedDate.getDate();
  const selectedmonth = selectedDate.toLocaleString("default", {
    month: "short",
  });
  const dayname = selectedDate.getDayName();
  const handledates = () => {
    const nonWeekendDay = getNonWeekendDay(selectedDate);
    setapointdate(
      `( ${nonWeekendDay.getDate()} ${nonWeekendDay.toLocaleString("default", {
        month: "short",
      })}, ${nonWeekendDay.getDayName()} )`
    );
    closemodel(false);
    document.body.style.overflow = "unset";
  };
  const isDisabledDate = (date) => {
    // Check if the date is in the array of disabled dates
    if (
      disabledDatesSet.has(
        `( ${date.getDate()} ${date.toLocaleString("default", {
          month: "short",
        })}, ${date.getDayName()} )`
      )
    ) {
      return true;
    }

    // Check if the date is a weekend day
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }

    return false;
  };
  const tileClassName = ({ date, view }) => {
    if (isDisabledDate(date) && !(date.getDay() === 0 || date.getDay() === 6)) {
      return "already-slotted";
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="model-wrapper">
        <div className="model-container">
          <div className="model-box">
            <div className="model-heade">
              <div>
                <h5 className="m-0">{modelheading}</h5>
                <p className="staetname-heading m-0">
                  Selected Area - {areaname}
                </p>
              </div>
              <p className="close-btn" onClick={handelclose}>
                x
              </p>
            </div>
            <div className="model-body">
              <Calendar
                minDate={mindateOfCalender}
                maxDate={maxdateOfCalender}
                value={selectedDate}
                onChange={setSelecteddate}
                tileDisabled={({ date }) => isDisabledDate(date)}
                tileClassName={tileClassName}
              />
            </div>
            <div className="model-footer">
              <p className="m-0">
                {selecteddate + " " + selectedmonth + ", " + dayname}
              </p>
              <button className="confirm-btn" onClick={handledates}>
                Appoint
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Model;
