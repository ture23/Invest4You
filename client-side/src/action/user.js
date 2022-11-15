import * as api from '../api/api';
import { GET_ALL_USERS, GET_ME, UPDATE_USER, GET_USER, UPDATE_ME, DELETE_USER, DELETE_ME } from '../actionTypes';



export const getAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers();

        dispatch({ type: GET_ALL_USERS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUser(id);

        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getMe = () => async (dispatch) => {
    try {
        const { data } = await api.getMe();

        dispatch({ type: GET_ME, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const { data: updatedUser } = await api.updateUser(id, data);

        dispatch({ type: UPDATE_USER, payload: updatedUser });
    } catch (error) {
        console.log(error.message);
    }
}
export const updateMe = (data) => async (dispatch) => {
    try {
        const { data: updatedUser } = await api.updateMe(data);

        dispatch({ type: UPDATE_ME, payload: updatedUser });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteUser(id);

        dispatch({ type: DELETE_USER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteMe = () => async (dispatch) => {
    try {
        const { data } = await api.deleteMe();

        dispatch({ type: DELETE_ME, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}



