import { StrictMode } from 'react'; /*this is meant to wrap other components */
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

/*it will execute every component function twice */
ReactDOM.createRoot(document.getElementById('root')).render(
<StrictMode>
    <App />
</StrictMode>

);
