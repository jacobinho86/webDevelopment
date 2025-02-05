import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useSubmit } from 'react-router-dom';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData(); //this is where we get out token
  const submit = useSubmit();

  useEffect(()=>{

    //if we don't have a token then there is nothing to do here
    if(!token) {
      return;
    }

    //if the token has expired then logout and return
    if(token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'post'});
      return;
    }
    
    //if we do have a token, then we'll wait until the duration of the token to auto logout by sending a request to /logout action
    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, {action: '/logout', method: 'post'});
    }, tokenDuration);
  },[token,submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
