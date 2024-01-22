import React from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

serviceWorkerRegistration.register();

reportWebVitals()