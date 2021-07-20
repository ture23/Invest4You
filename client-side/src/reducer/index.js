import { combineReducers } from 'redux';

import company from './company'
import auth from './auth'

export default combineReducers({company, auth});