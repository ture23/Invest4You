import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../actionTypes'

// 

 const company = (companys = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case DELETE:
            return companys.filter((company) => company._id !== action.payload);
        case CREATE:
            console.log('kreirano')
            return [...companys, action.payload];
        case UPDATE:
            return companys.map((company) => (company._id === action.payload._id ? action.payload : company));
        default:
            return companys;
    }
}

export default company;