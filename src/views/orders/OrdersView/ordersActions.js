import { INSERT_ORDER, CHANGE_ORDER_STATUS } from './ordersConstants';



export const insertOrder = (order) => {
    return {
        type: INSERT_ORDER,
        payload: {
            order
        }
    }
}

export const changeOrderStatus = (orderId) => {
    return {
        type: CHANGE_ORDER_STATUS,
        payload: {
            orderId
        }
    }
}


