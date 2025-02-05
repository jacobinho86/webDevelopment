export default function BlogPostPage({ params }) { //this prop is set by next.js
    return (
        <main>
            <h1>Blog Posts</h1>
            {/*this slug key is the identifier defined in the folder [slug] */}
            <p>{params.slug }</p>
        </main>
    );
}