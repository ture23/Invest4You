import { GET_ALL_USERS, GET_ME, GET_USER, UPDATE_USER, UPDATE_ME, DELETE_USER, DELETE_ME } from '../actionTypes';

const user = (user = [], action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return action.payload;
        case GET_ME:
        case GET_USER:
            return user.map((user) => (user._id === action.payload._id ? action.payload : user));
        case UPDATE_USER:
        case UPDATE_ME:
            return user.map((user) => (user._id === action.payload._id ? action.payload : user));
        case DELETE_USER:
        case DELETE_ME:
            return user.filter((user) => user._id !== action.payload._id);
        default:
            return user;
    }
};

export default user;


 