import EventForm from '../components/EventForm';

function NewEventPage() {
  console.log("dentro del componente neweventpage");
  return <EventForm method="post" />;
}

export default NewEventPage;

