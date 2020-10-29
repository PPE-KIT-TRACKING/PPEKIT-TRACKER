import { createReducer } from '../../../app/common/utils/reducerUtil';
import { INSERT_ORDER, CHANGE_ORDER_STATUS } from './ordersConstants';
import { v4 as uuid } from 'uuid';


const initialState = [
  {
    id: 1,
    ref: 'CDD1049',
    amount: 30.5,
    supplier: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity: 10,
  },
  {
    id: 2,
    ref: 'CDD1048',
    amount: 25.1,
    supplier: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    supplier: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
    
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    supplier: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    supplier: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    supplier: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered',
    costOffered: 1000,
    itemName: "Sanitizer",
    quantity:10
  }
];

export const insertOrder = (state, payload) =>{
    return [Object.assign({}, payload.order),...state]
}

export const changeOrderStatus = (state, payload) => {
    const newstate = state.map((value, index, array) => {
        if (value.id === payload.orderId)
        return Object.assign({}, { ...value, status: "completed" })
       
        return value;
    });

    return newstate;
}


export default createReducer(initialState, {
    [INSERT_ORDER]: insertOrder,
    [CHANGE_ORDER_STATUS]:changeOrderStatus
})

