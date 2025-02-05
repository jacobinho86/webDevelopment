import Product from './components/Product.jsx';
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import { CartContext } from './store/shopping-cart-context.jsx';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
 

  return (
    /*the value prop of the context provider is used to initialize the context, we also set a default value when defining the context
  such value will be used only when a component that was not wrapped by the provider component tries to access the context value */
    <CartContextProvider>
      <Header  />
      {/*This is component composition, we are displaying the childs of the component in the parent not in the component itself,
       we are using the component as a wraper. This is a solution to the prop drilling problem, but it doesn't scale because all 
       of the components will end up in the App parent, blowing the code */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product}  />
            </li>
          ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
