import { CREATENEWS, FETCH_ALL_NEWS } from '../actionTypes'


const novosti = (novosti = [], action) => {
     switch (action.type) {
        case FETCH_ALL_NEWS:
            return action.payload;
        case CREATENEWS:
            console.log('novost kreirana')
            return [...novosti, action.payload, console.log(novosti)];
           
         default:
            return novosti;
    }
}

export default novosti;
