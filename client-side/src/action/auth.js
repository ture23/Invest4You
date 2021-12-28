import { AUTH } from '../actionTypes'
import * as api from '../api/api';
// import history from '../../../srver/routs/users';

export const singin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.singin(formData);

        dispatch({ type: AUTH, data });

        history.push('/')
    } catch (error) {

        
        alert('Incorect Credencials')
        history.push('/auth')
    }
}

export const signup = (formData, history) => async (dispatch) => {

    try {
        
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });


        history.push('/')
    } catch (error) {
        // console.log('errorrrrr')
        // const { data } = await api.signup(formData);
        // dispatch({ type: AUTH, data });
        history.push('/auth')
        //   alert('Incorect Credencials')
    }
}