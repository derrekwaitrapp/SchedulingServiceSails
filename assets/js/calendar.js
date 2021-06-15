document.addEventListener('DOMContentLoaded', function() {

  var blocks = {};
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      blocks = JSON.parse(this.responseText);
      console.log(blocks)
      blocks = blocks.map((block) => {
        return {
          title: block.title,
          start: block.start,
          end: block.end
        }
      });

      console.log(blocks)

      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2021-06-03',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: blocks
      });
      // calendarInstance.createSchedules(schedule.blocks);
      calendar.render();
    }
  };
  xhttp.open("GET", "/blocks/", true);
  xhttp.send();
});
