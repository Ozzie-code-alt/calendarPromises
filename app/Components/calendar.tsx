"use client";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEvents from "./AddEventModal";

interface EventObject {
  title: string,
  start: Date,
  emd: Date
}


const Calendar: React.FC=() => {
  const [modalOpen, setModalOPen] = useState<boolean>(false);

  // const calendarHEHE = React.createRef() 
  const calendarRef = useRef<FullCalendar>(null);

  const onEventAdded = (event:EventObject) => {
    let calendarApi = this.calendarRef.current.getApi();
    calendarApi.addEvent(event);
    console.log(event)
  };

  return (
    <>
      <section>
        <button onClick={() => setModalOPen(true)}> Add Event</button>

        <div className="relative z-0">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
          />
        </div>

        <AddEvents
          isOpen={modalOpen}
          onClose={() => setModalOPen(false)}
          onEventAdded={(event:EventObject) => onEventAdded(event)
            }
        />
      </section>
    </>
  );
};

export default Calendar;
