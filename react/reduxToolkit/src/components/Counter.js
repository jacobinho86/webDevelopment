import { useSelector, useDispatch } from 'react-redux'; //custom hook created by the library to access state
import classes from './Counter.module.css';
import { counterActions } from '../store';

const Counter = () => {
  //the state parameter is managed by redux
  //the function should return the part of the state that we want
  //the subscription is done automatically by this hook
  //also it managed the destruction of the subscription if the component is eliminated of the DOM
  const counter = useSelector(state => state.counter.counter);
  const showCounter = useSelector(state => state.counter.showCounter);
  //this is a dispatch function, call it to dispatch an action to the redux store
  const dispatch = useDispatch();

  const incrementHandler = () => {
    //dispatch({type: 'increment'}); //custom action with type increment
    dispatch(counterActions.increment());
  };
  const decrementHandler = () => {
    //dispatch({type: 'decrement'}); //custom action with type decrement
    dispatch(counterActions.decrement());
  };
  const increaseHandler = () => {
    //dispatch({type: 'increase', amount:10});
    dispatch(counterActions.increase(10)); //{type: UNIQUE_ID, payload: 10}
  };
  const toggleCounterHandler = () => {
    //dispatch({type: 'toggle'});
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
