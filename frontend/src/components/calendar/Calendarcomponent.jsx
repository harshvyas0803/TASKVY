import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

// Sample Events
const events = [
  { title: "Team Event", date: "2025-02-25", backgroundColor: "#F87171" },
  { title: "Conference", start: "2025-02-26", backgroundColor: "#60A5FA" },
];

const CalendarComponent = () => {
  // Highlight today's date in the calendar
  const highlightToday = (arg) => {
    const today = new Date();
    const cellDate = arg.date;
    if (
      today.getFullYear() === cellDate.getFullYear() &&
      today.getMonth() === cellDate.getMonth() &&
      today.getDate() === cellDate.getDate()
    ) {
      arg.el.classList.add("today-cell");
    }
  };

  // Add custom class names to events
  const assignEventClasses = (arg) => {
    return arg.event.title.toLowerCase().includes("meeting") ? ["meeting-event"] : [];
  };

  // Handle date clicks
  const onDateClick = (arg) => {
    alert("Clicked on: " + arg.dateStr);
    console.log("Date clicked:", arg.dateStr);
  };

  // Handle event drag-and-drop
  const onEventDrop = (info) => {
    alert(`Event "${info.event.title}" moved to ${info.event.start.toLocaleDateString()}`);
    console.log("New start date:", info.event.start);
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date()}
        timeZone="local"
        weekends={true}
        editable={true}
        droppable={true}
        events={events}
        dateClick={onDateClick}
        eventDrop={onEventDrop}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        height="auto"
        dayCellDidMount={highlightToday}
        eventClassNames={assignEventClasses}
      />
    </div>
  );
};

export default CalendarComponent;
