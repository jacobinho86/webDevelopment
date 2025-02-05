import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
//just like the react context hook, this redux is a global provider, that is why we need to wrap the highest level of the app with it
//in the store prop we pass the store created by this application
root.render(<Provider store={store}><App /></Provider>);
