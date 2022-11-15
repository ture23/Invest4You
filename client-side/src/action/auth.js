import { AUTH, FORGOT_PASSWORD } from '../actionTypes'
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
        console.log('dosli dovde')
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
export const forgotPassword = (formData, history) => async (dispatch) => {

    try {
        
        const { data } = await api.forgotPassword(formData);
        dispatch({ type: FORGOT_PASSWORD, data });


        history.push('/')
    } catch (error) {
        // console.log('errorrrrr')
        // const { data } = await api.signup(formData);
        // dispatch({ type: AUTH, data });
        history.push('/auth')
        //   alert('Incorect Credencials')
    }
}