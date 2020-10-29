import { combineReducers } from 'redux';
import authReducer from '../../views/auth/authReducer'
import ordersReducer from '../../views/orders/OrdersView/ordersReducer'
import requestsReducer from '../../views/requests/RequestsView/requestsReducer'
const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    requests:requestsReducer
})

export default rootReducer;