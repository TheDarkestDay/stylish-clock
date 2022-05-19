import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';
import './typography.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './service-worker-registration';

const handleUpdate = () => {
  toast.info('Update available. Please, re-open the application');
};

const handleOfflineReady = () => {
  toast.info('The app is ready for offline use.');
};

serviceWorkerRegistration.register({
  onUpdate: handleUpdate,
  onSuccess: handleOfflineReady,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
