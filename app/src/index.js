import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './Reducers/reducers';
import App from './Containers/App'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}
//applyMiddleware(...middleware),
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
