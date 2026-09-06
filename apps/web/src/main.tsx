import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initConfig } from './lib/api';

// Fetch config.json from S3 prior to mounting the React application
initConfig().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});