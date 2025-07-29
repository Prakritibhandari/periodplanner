document.addEventListener("DOMContentLoaded", function() {
  const calendarEl = document.getElementById("calendar");
  const lastPeriodInput = document.getElementById("lastPeriodInput");
  const showCalendarBtn = document.getElementById("showCalendarBtn");

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: false,
    events: []
  });

  calendar.render();

  showCalendarBtn.addEventListener("click", () => {
    const lastPeriodDateStr = lastPeriodInput.value;
    if (!lastPeriodDateStr) {
      alert("Please select your last period date.");
      return;
    }

    const periodLength = 5;
    const cycleLength = 28;

    calendar.removeAllEvents();

    let lastPeriodDate = new Date(lastPeriodDateStr);

    for (let cycle = -1; cycle <= 1; cycle++) {
      let cycleStart = new Date(lastPeriodDate);
      cycleStart.setDate(cycleStart.getDate() + cycle * cycleLength);

      // Mark period days
      for (let i = 0; i < periodLength; i++) {
        let day = new Date(cycleStart);
        day.setDate(day.getDate() + i);
        calendar.addEvent({
          title: 'Period',
          start: day.toISOString().split('T')[0],
          allDay: true,
          color: '#f44336' // red for period
        });
      }

      // Mark ovulation day
      let ovulationDay = new Date(cycleStart);
      ovulationDay.setDate(ovulationDay.getDate() + 13);
      calendar.addEvent({
        title: 'Ovulation',
        start: ovulationDay.toISOString().split('T')[0],
        allDay: true,
        color: '#4caf50' // green for ovulation
      });
    }

    calendar.gotoDate(lastPeriodDate);
  });
});

