import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    return (
        <>
            <MainNavigation />
            <main>
                <h1>This Page Doesn't Exist!</h1>
                <p>Try again later...</p>
            </main>
        </>
    );
}

export default ErrorPage;