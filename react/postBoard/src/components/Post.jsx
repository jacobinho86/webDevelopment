import classes from './Post.module.css';
import { Link } from 'react-router-dom';

export default function Post({id, author, body}) {

    return (
        <li className={classes.Post}>
            <Link to={id}>
                <p className={classes.author}>{author}</p>
                <p className={classes.text}>{body}</p>
            </Link>
        </li>
    );
};