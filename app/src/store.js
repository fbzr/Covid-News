import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
import covidTrackerReducer from './reducers/covidTracker';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fetchCovidData, fetchNewsData } from './actions/covidTracker';

const store = createStore(covidTrackerReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

store.dispatch(fetchCovidData());
store.dispatch(fetchNewsData());

export default store;