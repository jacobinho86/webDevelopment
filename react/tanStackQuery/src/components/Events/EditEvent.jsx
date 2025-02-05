import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id}),
  });

  const {mutate} = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => { //data passed to mutatefn
      const newEvent = data.event;

      await queryClient.cancelQueries({queryKey: ['events', params.id]}); //cancel all queries on that key

      const previousEvent = queryClient.getQueryData(['events', params.id]); //backup old data to roll back in case of error
      queryClient.setQueryData(['events', params.id],newEvent); //optimistic update of the data, do not wait for the backend!

      return {previousEvent}; //this object will end up in the context parameter of the onError function
    },

    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.previousEvent); //this is where the roll back happens
    },

    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]); //sucess or failure, make sure that when mutation finish, all data is sync
    },
  });

  function handleSubmit(formData) {
    mutate({id: params.id, event: formData});
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if(isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock title='Failed to load event' message={error.info?.message || 'Try again later...'}/>
        <div className='form-actions'>
          <Link to='../' className='button'>
            Okay
          </Link>
        </div>
      </>
    );
  }

  if(data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
