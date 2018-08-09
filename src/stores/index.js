import { createStore } from 'redux';
import reducers from '../reducers';

export default function configureStore() {

  const store = createStore(reducers);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    })
  }

  return store;
}