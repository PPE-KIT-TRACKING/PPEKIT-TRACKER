import { createReducer } from 'e:/Studies/Courses/Technology Courses/WEB_DEVELOPMENT/Project/Part1/01 Course introduction and getting started/Course Assets/Source Code/Section 15/After/revents/src/app/common/util/reducerUtil';
import {
	ASYNC_ACTION_START,
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_ERROR
} from './asyncConstants';

const initialState = {
	loading: false
};

export const asyncActionStarted = (state, payload) => {
	return { ...state, loading: true };
};

export const asyncActionFinished = state => {
	return { ...state, loading: false };
};

export const asyncActionError = state => {
	return { ...state, loading: false };
};

export default createReducer(initialState, {
	[ASYNC_ACTION_START]: asyncActionStarted,
	[ASYNC_ACTION_FINISH]: asyncActionFinished,
	[ASYNC_ACTION_ERROR]: asyncActionError
});
