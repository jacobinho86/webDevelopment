import { useQuery } from '@tanstack/react-query'; //custom hook from tanstack

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  //data holds the response object from the request
  //isPending is the state of the request
  //isError is the state if the request threw an error
  //error is data from the error that happened
  const { data, isPending, isError, error} = useQuery({ 
    queryFn: ({signal, queryKey}) => fetchEvents({signal, ...queryKey[1]}), //defines the actual code that'll send the actual request, you have to write the code that sends them
    queryKey: ['events', {max:3}], //every query request must have a key in order for tanstack caching infrastructure
    staleTime: 5000, //this controls after which time react query update the cashed data
    //gcTime: 50000,//garbage collection time, how much time will data be stored in cache 
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info ? error.message : 'Failed to fetch events...'} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
