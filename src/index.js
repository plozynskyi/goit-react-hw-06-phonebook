import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistStor } from 'redux/store';

import './shared/styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
