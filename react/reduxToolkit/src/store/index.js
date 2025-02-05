//import {createStore} from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialCounterState = {counter:0, showCounter: true};


//this part is a slice for redux toolkit
const counterSlice = createSlice({
    name: 'counterState',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++; //here in toolkit you can mutate the state!!!
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

const initialAuthState = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState:initialAuthState,
    reducers: {

        login(state){
            state.isAuthenticated = true;
        },

        logout(state) {
            state.isAuthenticated = false;
        }
    }
});

//logic of how to change the internal state
// const counterReducer = (state = initialState, action) => {
//     /*when we want to change the state, always do it in an inmutable manner, never mutate the existing state and return it that leads to bugs */

//     if(action.type === 'increment'){
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter
//         };
//     } 

//     if(action.type === 'decrement'){
//         return {
//             counter: state.counter - 1,
//             showCounter: state.showCounter
//         };
//     }

//     if(action.type === 'toggle'){
//         return {
//             counter: state.counter,
//             showCounter: !state.showCounter
//         };
//     }

//     return state;
// };

//this is where the app state is created
//const store = createStore(counterReducer);

//this is the way to create the global state app with the toolkit, it will merge all the reducers into one
const store = configureStore({
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer }
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;