import { useNavigate } from 'react-router-dom';
import { Form } from 'react-router-dom'; //this form element will send the request generated at submit time to the action function defined in the route definition
import { useNavigation } from 'react-router-dom';
import { useActionData } from 'react-router-dom'; //hook similar to useloaderdata but for actions
import { redirect } from "react-router-dom";
import { json } from "react-router-dom";

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const data = useActionData(); //this is where react router returns the data returned by the action function
  const navigation = useNavigation();// check the status of the transition between requests

  const isSubmitting = navigation.state === 'submitting';


  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form className={classes.form} method={method}>
      {data && data.errors && <ul>
          {Object.values(data.errors).map(err => (<li key={err}>{err}</li>))}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required  defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required  defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required  defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

//this objects are reciebed from react router when the action is executed
export async function action({request, params}) {
  //extract the method from the request
  const method = request.method;
  //extract the form data from the request
  const data = await request.formData();
  

  const eventData = {
      title: data.get('title'), //this is the 'name' field of the inputs and text areas
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description'),
  };
  
  //set url depending on the method
  let url = 'http://localhost:8080/events';

  //the request will include the method in all caps REMEMBER IT!!!!
  if(method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch( url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
  });

  if(response.status === 422) {
      return response;
  }

  if(!response.ok){
      throw json({message: 'Could not save event data...'},{status: 500});
  }

  //if everything worked well, we will redirect the user away to the root events page
  return redirect('/events');
}
