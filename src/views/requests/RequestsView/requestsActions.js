import { INSERT_REQUEST, REMOVE_REQUEST } from './requestsConstants';
import { asyncActionStart } from '../../async/asyncActions';
import { asyncActionFinish } from '../../async/asyncActions';


export const insertRequest = (request)=>{
    return {
        type: INSERT_REQUEST,
        payload: {
            request
        }
    }
}

export const removeRequest = (requestId) => {
    return async (dispatch, getState, { getFirestore }) => {
        try {
            const firestore = getFirestore()
            dispatch(asyncActionStart());
            await firestore.collection("requests").doc(requestId).delete()
			dispatch(asyncActionFinish()); 
        } catch (error) {
            console.log(error);
        }
        
    }
}