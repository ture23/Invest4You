import {  CREATEPRICE, FETCH_ALL_PRICES } from '../actionTypes'


 const price = (prices = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PRICES:
            return action.payload;
        case CREATEPRICE:
            return [...prices, action.payload]
        default:
            return prices;
    }
}

export default price;