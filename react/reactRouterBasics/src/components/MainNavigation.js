import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        {/*the end prop serves to indicate that the link should be active only if it ends with the path in the to prop */}
                        <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={({isActive}) => isActive ? classes.active : undefined}>Products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}