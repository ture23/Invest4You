import { combineReducers } from 'redux';

import company from './company'
import news from './news'
import auth from './auth'
import price from './price'
import user from './user'

export default combineReducers({ company, news, auth, price, user});