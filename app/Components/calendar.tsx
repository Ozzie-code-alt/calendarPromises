"use client";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEvents from "./AddEventModal";

const Calendar = () => {
  const [modalOpen, setModalOPen] = useState(false);

  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
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
          onEventAdded={(event) => onEventAdded(event)
            }
        />
      </section>
    </>
  );
};

export default Calendar;
