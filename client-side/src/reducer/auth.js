import { AUTH, LOGOUT, FORGOT_PASSWORD } from '../actionTypes'

const authReducer = (state = { }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case FORGOT_PASSWORD:
            return {...state, authData: action?.data};

        default:
            return state;
    }
}

export default authReducer;