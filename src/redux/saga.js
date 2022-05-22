import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchMembers } from './api';
import * as types from './actionType';

//Flickr 데이터 요청 및 액션객체 반환
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: types.FLICKR.error, payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

//youtube 데이터 요청 및 액션객체 반환
export function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.error, payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

//members 데이터 요청 및 액션객체 반환
export function* returnMembers() {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: types.MEMBERS.success, payload: response.data.data });
	} catch (err) {
		yield put({ type: types.MEMBERS.error, payload: err });
	}
}
export function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}

export default function* rootSaga() {
	console.log('rootSaga');
	yield all([fork(callFlickr), fork(callYoutube), fork(callMembers)]);
}