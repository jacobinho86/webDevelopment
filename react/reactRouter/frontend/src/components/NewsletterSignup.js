import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher(); //this is a hook to add the ability to excecute the action of this route without navigating to it
  const { data, state } = fetcher; //proxy objects to the state of the requests sent by fetcher

  useEffect(() => {
    if(state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data,state]);

  return (
    <fetcher.Form method="post" className={classes.newsletter} action='/newsletter'>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;