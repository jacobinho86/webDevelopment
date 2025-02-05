import EventForm from '../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditEventPage() {
    const data = useRouteLoaderData('eventDetail');
    return (
        <EventForm event={data.event} method='patch' />
    );
}

export default EditEventPage;