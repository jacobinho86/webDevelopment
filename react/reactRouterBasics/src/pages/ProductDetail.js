import { Link, useParams } from "react-router-dom"; //this is a hook to access the specific dynamic id route used to get this element

function ProductDetailPage () {
    const params = useParams();
    return (
        <>
            <h1>Product Detail</h1>
            {/*productId was the name of the dynamic part of the route, as defined in the router definition */}
            <p>{params.productId}</p>
            {/*relative = "path" means that we will get back (the ..) relative to the active path, default behavior is relative to the parent route */}
            <p><Link to=".." relative="path">Back</Link></p>
        </>
    );
}

export default ProductDetailPage;