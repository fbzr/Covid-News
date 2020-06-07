import axios from 'axios';
import { LOADING_ERROR, FETCH_COVID_DATA, FETCH_NEWS_DATA, UPDATE_COUNTRY, TOGGLE_MOBILE, FETCH_TOP_HEADLINES } from './types';

export const fetchCovidData = () => async dispatch => {
    // Fetch covid data
    try {
        const resCovidData = await axios.get('https://api.covid19api.com/summary');
        
        dispatch({
            type: FETCH_COVID_DATA,
            payload: {
                data: resCovidData.data,
            }
        })
    } catch(err) {
        dispatch({
            type: LOADING_ERROR,
            payload: `Error fetching data: ${err.message}`
        })
    }
}

export const fetchNewsData = () => async dispatch => {
    try {
        // News api not working in production anymore
        // const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&q=corona&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);

        const res = await axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`);

        console.log(res);

        dispatch({
            type: FETCH_NEWS_DATA,
            payload: {
                news: res.data.results
            }
        })
    } catch(err) {
        dispatch({
            type: LOADING_ERROR,
            payload: `Error fetching data: ${err.message}`
        })
    }
}

export const selectCountry = (country) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_COUNTRY,
            payload: {
                countryData: country,
            }
        })
    } catch(err) {
        dispatch({
            type: LOADING_ERROR,
            payload: `Error fetching data: ${err.message}`
        })
    }
}

export const toggleMobile = () => dispatch => {
    dispatch({
        type: TOGGLE_MOBILE
    })
}