import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import sagas from '../sagas';
import createSagaMiddleware from 'redux-saga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    })
  }

  return store;
}