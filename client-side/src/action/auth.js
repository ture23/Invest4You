import { AUTH } from '../actionTypes'
import * as api from '../api/api';
// import router from '../../../srver/routs/users';

export const singin = (formData, router, res) => async (dispatch) => {
    try {
        const { data } = await api.singin(formData);

        dispatch({ type: AUTH, data });

        router.push('/')
    } catch (error) {

        router.push('/auth')
        alert('Incorect Credencials')
    }
}

export const signup = (formData, router, res) => async (dispatch) => {
    try {
        
          const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });

        router.push('/')
    } catch (error) {
          router.push('/auth')
          alert('Incorect Credencials')
    }
}