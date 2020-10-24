import { combineReducers } from 'redux';
import authReducer from '../views/auth/authReducer'

const rootReducer = combineReducers({
    auth:authReducer
})

export default rootReducer;