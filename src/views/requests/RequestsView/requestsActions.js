import { INSERT_REQUEST, REMOVE_REQUEST } from './requestsConstants';



export const insertRequest = (request)=>{
    return {
        type: INSERT_REQUEST,
        payload: {
            request
        }
    }
}

export const removeRequest = (requestId) => {
    return {
        type: REMOVE_REQUEST,
        payload: {
            requestId
        }
    }
}