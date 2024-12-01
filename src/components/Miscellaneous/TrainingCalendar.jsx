import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const TrainingCalendar = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
        const data = await response.json();
        setTrainings(data);
      } catch (e) {
        console.error('Could not fetch training sessions:', e);
      }
    };

    fetchTrainings();
  }, []); //Basic fetch call

  const events = trainings.map(training => ({
    title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
    start: dayjs(training.date).toISOString(),
    end: dayjs(training.date).add(training.duration, 'minute').toISOString(),
  }));

  return (
    <div className="custom-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" //Where the calendar opens, week view
        events={events}
        headerToolbar={{
          left: 'prev,today,next', //buttons
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay' //How to add agenda?
        }}
      />
    </div>
  );
};

//Code source docs: https://fullcalendar.io/docs/react, didn't need functionality listed in discussion, but got to know how to style the calendar with this:
//https://stackoverflow.com/questions/74513552/how-to-use-events-as-a-function-in-react-fullcalendar