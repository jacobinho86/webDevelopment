import { useLoaderData } from 'react-router-dom'; //access to the data sent by the nearest loader function
import EventsList from '../components/EventsList';
import { json } from 'react-router-dom';
import { defer } from 'react-router-dom';
import { Await } from 'react-router-dom';
import { Suspense } from 'react'; //shows a component a fallback while waiting for a response

function EventsPage() {
  const {events} = useLoaderData();

  //the await component will wait for the promise to be resolved
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents}/>}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    //return {isError: true, message: "Couldn't fetch events data"};
    //throw new Response(JSON.stringify({message: 'Could not fetch events'}), {status:500}); //when an error is thrown in a loader, react will rend the closest error element
    throw json({message: 'Could not fetch events'},{status:500}); //this function builds responses with less effort
  } else {
    const resData = await response.json();
    return resData.events;  
  }
}

export function loader() {
  //the idea behind defer is to wait for a value, so the functions that execute in it should return a promise
  return defer({
    events: loadEvents(), //EXECUTE, NOT JUST USE POINTER!!!!
  });
}