import classes from './EventItem.module.css';
import { Link } from 'react-router-dom';
import { useSubmit } from 'react-router-dom';

function EventItem({ event }) {
  const submit = useSubmit(); //submit data and trigger actions programatically through the function returned by useSubmit hook

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, {method:'delete'}); //first parameter is the data that we want to send, second argument are form like parameters
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
