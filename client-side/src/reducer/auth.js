import { AUTH, LOGOUT } from '../actionTypes'

const authReducer = (state = { }, action) => {
    switch (action.type) {
        case AUTH:
            console.log('doslo dovde')
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            console.log('ovdwe isto')
            return {...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;