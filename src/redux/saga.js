import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';
/*
	takeLatest : 컴포넌트로부터 데이터변경 요청이 여러번 들어올때 제일 최근 요청
	하나만 받는게 (takeEvery : 들어온느 요청을 모두 처리)
	(takeEvery보다 takeLatest를 더 많이 사용한다)
	
	all : 여러개의 함수를 모두 동기적으로 호출
	fork : 여러개의 함수를 비동기적으로 호출
	call : 첫번째 인수로 들어온 함수를 호출할때 두번째 인수를 받은 옵션을 적용해서 호출
	put : reducer에 데이터 변경 요청 (dispatch와 동일)
*/

// reducer에 middleware가 적용되 최종적으로 실행할 함수 호출
export function* returnFlickr(action) {
	console.log(action);
	const response = yield call(fetchFlickr, action.opt);
	yield put({type: 'FLICKR_SUCCESS', payload: response.data.photos.photo});
}

// 요청받은 액션 타입에 따라 함수 호출
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

// reducer에 적용될 rootSaga 생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}

/*
	saga흐름 보는 방법
	1. store.js에서 saga -> reducer에 미들웨어 처리
	2. 컴포넌트 파일에서 초기액션객체를 dispatch로 saga.js로 전달
	3. saga.js에서 전달받은 action데이터를 가공해서 다시 reducer.js에 전달
	4. reducer.js에서 action타입에 따라 데이터 store에 전달
*/