import { createReducer } from '../../../utils/reducerUtil';
import { INSERT_REQUEST, REMOVE_REQUEST } from './requestsConstants';
import { v4 as uuid } from 'uuid';



function createData(id,name, location, requiredby, verified,ppeNeeded) {
    return {
        id,
        name,
        location,
        requiredby,
        verified,
        ppeNeeded
    };   
}


const initialState = [
    createData(uuid(), 'Ankur Hospital', 'New Delhi', '31/10/2020', 'Yes', [
        { orderId: 1, item: "Sanitizer", quantity: 5 },
        { orderId: 2, item: "Mask", quantity: 5 },
        { orderId: uuid(), item: "Gloves", quantity: 10 },
    ]),
    createData(uuid(), 'Vishal Hospital', 'New Delhi', '31/10/2020', 'Yes', [
        { orderId: uuid(), item: "Sanitizer", quantity: 5 },
        { orderId: uuid(), item: "Mask", quantity: 5 },
        { orderId: uuid(), item: "Gloves", quantity: 10 },
    ]),
    createData(uuid(), 'Kriplani Hospital', 'New Delhi', '31/10/2020', 'Yes', [
        { orderId: uuid(), item: "Sanitizer", quantity: 5 },
        { orderId: uuid(), item: "Mask", quantity: 5 },
        { orderId: uuid(), item: "Gloves", quantity: 10 },
    ]),
];



export const insertRequest = (state, payload) => {
    return [payload.request,...state]
}

export const removeRequest = (state, payload) => {
    return [
        ...state.filter(request => request.id !== payload.requestId)
    ]
}


export default createReducer(initialState, {
    [INSERT_REQUEST]: insertRequest,
    [REMOVE_REQUEST]: removeRequest
})
