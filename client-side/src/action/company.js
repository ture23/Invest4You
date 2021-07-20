import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../actionTypes';
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

export const createCompany = (post) => async (dispatch) => {
    try {
        const { data } = await api.createCompany(post);

        dispatch({ type: CREATE, payload: data });
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