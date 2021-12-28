import { combineReducers } from 'redux';

import company from './company'
import news from './news'
import auth from './auth'

export default combineReducers({ company, news, auth});