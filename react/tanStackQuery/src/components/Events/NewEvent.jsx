import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../../util/http.js';
import { queryClient } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  //mutate is a function that will send the request
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => { //this function will be invoked on success of the mutation
      queryClient.invalidateQueries({queryKey: ['events']}); //force a refresh query, the data for events is stale now
      navigate('/events');
    },
  });

  function handleSubmit(formData) {
    mutate({event: formData});
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>
        )}
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.info?.message || 'Failed to create event. Check inputs...'} />}
    </Modal>
  );
}
