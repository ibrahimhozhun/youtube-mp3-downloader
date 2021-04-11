import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SongProvider } from './contexts/SongContext';
import "./styles.css";

ReactDOM.render(
  <React.StrictMode>
    <SongProvider>
      <App />
    </SongProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

