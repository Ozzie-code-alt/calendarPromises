"use client";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEvents from "./AddEventModal";
import axios from "axios"
import moment from "moment";

interface EventObject {
  title: string,
  start: Date,
  end: Date
}


const Calendar: React.FC=() => {
  const [modalOpen, setModalOPen] = useState<boolean>(false);
  const [events, setEvents] = useState([])
  // const calendarHEHE = React.createRef() 
  const calendarRef = useRef<FullCalendar>(null);

  const onEventAdded = (event:EventObject) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title
    });
    console.log(event)
  };


  const handleEventAdd  = async(data)=>{
    // await axios.post("/api/calendar/create-event", data.event)
    
    // await axios.post("/api/calendar/create-event", data.event).then((response) => {
    //   console.log(response);
    // }, (error) => {
    //   console.log(error);
    // });
    console.log(data)
    await axios.post("http://localhost:5000/api/calendar/create-event", data.event);

  }

    async function handleDateSet(data){
    console.log(data)
    // const response = await axios.get("/api/calendar/get-events?start="+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString())
    // Update the URLs with the correct server address and port
    const response = await axios.get("http://localhost:5000/api/calendar/get-events?start=" + moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString())

    setEvents(response.data)
    console.log(response.data)
  }


  return (
    <>
      <section>
        <button onClick={() => setModalOPen(true)}> Add Event</button>

        <div className="relative z-0">
          <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventAdd={(event) => handleEventAdd(event)}
            datesSet={(date)=> handleDateSet(date)}
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
