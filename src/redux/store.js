import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import { watcherSaga } from "./sagas/root-saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
    reducers,
    {},
    composeWithDevTools(
        applyMiddleware(...middleware)
        // other store enhancers if any
    )
);

sagaMiddleware.run(watcherSaga);

export default store;
