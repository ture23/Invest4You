import { FETCH_ALL, CREATE, UPDATE, DELETE, CREATENEWS, CREATEPRICE, FETCH_ALL_NEWS, FETCH_ALL_PRICES } from '../actionTypes';
import * as api from '../api/api';

// 

export const getAllCompanies = () => async (dispatch) => {
    try {
        
        const { data } = await api.getAllCompanies();

        dispatch({ type: FETCH_ALL, payload: data})
 
    } catch (error) {
        console.log(error.message)
        
    }
}
export const getAllNews = () => async (dispatch) => {
    try {
        
        const { data } = await api.getAllNews();

        dispatch({ type: FETCH_ALL_NEWS, payload: data})
 
    } catch (error) {
        console.log(error.message)
        
    }
}
export const GetAllPrices = () => async (dispatch) => {
    try {
        
        const { data } = await api.GetAllPrices();

        dispatch({ type: FETCH_ALL_PRICES, payload: data})
 
    } catch (error) {
        console.log(error.message)
        
    }
}

export const createCompany = (post) => async (dispatch) => {
    try {
        const { data } = await api.createCompany(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}
export const createNews = (post) => async (dispatch) => {
    try {
        const { data } = await api.createNews(post);

        dispatch({ type: CREATENEWS, payload: data });
    } catch (error) {
        console.log(error)
    }
}
export const createPrice = (post) => async (dispatch) => {
    try {
        const { data } = await api.newPrice(post);

        dispatch({ type: CREATEPRICE, payload: data });
    } catch (error) {
        console.log(error)
    }
}
export const updateCompany = (id, updateComp) => async (dispatch) => {
    try {
        // console.log(post)
        const {data} = await api.updateCompany(id, updateComp);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }
}

export const deleteCompany = (id) => async (dispatch) => {
    try {
        await api.deleteCompany(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}
export const likeCompany = (id) => async (dispatch) => {

    try {
        const { data } = await api.likeCompany(id);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error);
    }
}

// action creators a function that return an action and  an action is object that has the type nad payload with async thunk we dispatch it 