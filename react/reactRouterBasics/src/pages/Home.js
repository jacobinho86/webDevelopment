import { Link } from "react-router-dom";
//import MainNavigation from "../components/MainNavigation";
import { useNavigate } from "react-router-dom"; //this is used to navigate programatically

function HomePage() {
    const navigate = useNavigate();

    function navigateHandler() {
        navigate("/products");
    }
    return (
        <>
            <h1>My Home Page</h1>
            <p>
                {/*The Link component prevents the default behavior of sending HTTP requests, it updates the content without request */}
                Go to and see <Link to="/products">the list of products.</Link>
            </p>
            <p>
                <button onClick={navigateHandler}>Navigate to Products</button>
            </p>
        </>
    );
}

export default HomePage;