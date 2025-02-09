import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
 
  /*

  This is how one would send the http requests from inside a component, not an action creator

  useEffect(() => {
    const sendCartData = async () =>{
      dispatch(uiActions.showNotification({status: 'pending', title: 'Sending...', message:'Sending cart data!'}));
      const response = await fetch('https://reduxtoolkitbackend-default-rtdb.firebaseio.com/cart.json', 
                             {method: 'PUT', body: JSON.stringify(cart)});
      if(!response.ok){
        throw new Error('Sending cart data failed...');
      }

      dispatch(uiActions.showNotification({status: 'success', title: 'Success!', message:'Sent cart data successfully!'}));

    };
    
    if(isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({status: 'error', title: 'Error!', message:'Sending cart data failed!'}));
    });
      
  }, [cart, dispatch]);
  */

  /* This is where we launch the requests from an action creator*/
  useEffect(() => {

    if(isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  /*this is where we'll populate the cart from the database*/
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
