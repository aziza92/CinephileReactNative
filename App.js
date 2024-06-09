import React from 'react';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';
import {persistStore} from 'redux-persist';
import Navigation from './Navigation/Navigation';
import {Provider} from 'react-redux';
import store from './redux/store';

const persistor = persistStore(store);
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
