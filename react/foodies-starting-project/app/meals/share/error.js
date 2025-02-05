//this is an error component that nextjs will use to serve any error at the level page it is located and nested ones
'use client'; //has to be a client component btw

export default function Error() {
    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>Failed to create meal.</p>
        </main>
    );
}