import React from 'react';
import ReactDOM from 'react-dom/client';
// import "dotenv/config.js"
import App from './App';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';

import {Toaster} from "react-hot-toast"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster/>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

