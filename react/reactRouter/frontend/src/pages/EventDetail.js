import EventItem from "../components/EventItem";
import { json } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";

function EventDetailPage() {
    const data = useRouteLoaderData('eventDetail'); //search for the specific loader data in the parent route
    console.log("QUE CHINGADOS PASAAAAAAAAAAAAAA!!!!!!!!!!!");
    console.log(data);

    return (
        <>
            <EventItem event={data.event}/>
        </>
    );
}

export default EventDetailPage;

//react router passes an object to loader functions, with the request and the parameters.
export async function loader({request, params}) {

    const response = await fetch('http://localhost:8080/events/' + params.eventId); //this is how we can access the parameters of the url
    console.log('loader detalpage.....................');
    console.log(request);
    console.log(params.eventId);
    

    if(!response.ok) {
        throw json({message: "Could not fetch details for selected event..."},{status:500});
    }else {
        return response;
    }
}

export async function action({params, request}) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/'+eventId, {method:request.method});

    if(!response.ok) {
        throw json({message: "Could not delete selected event..."},{status:500});
    }else {
        return redirect('/events');
    }
}