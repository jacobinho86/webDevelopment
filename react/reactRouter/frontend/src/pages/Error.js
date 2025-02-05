import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    const error = useRouteError(); //access the response/error from the loader

    let title = "An error ocurred!!!"
    let message = "Something went wrong...";

    if(error.status === 500){
        message = error.data.message;
    }

    if(error.status === 404){
        title = "Could Not Found!!!";
        message = "No resource for that page...";
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default ErrorPage;