import Modal from '../components/Modal';
import classes from './NewPost.module.css';
import { Link, Form, redirect } from 'react-router-dom';

function NewPost() {
 

  return (
    <Modal>
      <Form className={classes.form} method='post' >
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link type="button" to="..">Cancel</Link>
          <button type="submit">Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({request}) {
  const form = await request.formData();
  const postData = Object.fromEntries(form);
  const response = await fetch('http://localhost:8080/posts',{
    method: 'POST',
    body: JSON.stringify(postData),
    Headers:{
        'Content-Type': 'application/json'
    }
  });
  return redirect('/');
}