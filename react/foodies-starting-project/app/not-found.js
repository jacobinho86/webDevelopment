//this special component will serve not found state on the page level and nested ones it is stored

export default function NotFound() {
    return (
        <main className="not-found">
            <h1>Not Found</h1>
            <p>Unfortunately, we could not find the requested page or resource.</p>
        </main>
    );
}