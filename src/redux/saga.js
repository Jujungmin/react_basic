import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';

// 순서3
export function* returnFlickr(action) {
	console.log(action);
	const response = yield call(fetchFlickr, action.opt);
	yield put({type: 'FLICKR_SUCCESS', payload: response.data.photos.photo});
}
// 순서2
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}
// 순서1
export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}
