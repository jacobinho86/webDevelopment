import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples from './components/Examples.jsx';

function App() {
  

  /*the empty tag serves to only return one elemento from the component, but with no wrapping elements that'll be extra in the DOM 
  this is called a fragment and it is a short hand for the react bult-in component "Fragment"*/
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
