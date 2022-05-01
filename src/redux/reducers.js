import { combineReducers } from "redux";
// combineReducers :: 여러개의 reducers가 있을 때 하나로 묶어줌.

// 변경할 새로운 데이터
const initMember =  {
	members: [
			{
				"name" : "Tom",
				"position" : "CEO",
				"pic" : "member1.jpg"
			},
			{
				"name" : "Julia",
				"position" : "Vice President",
				"pic" : "member2.jpg"
			},
			{
				"name" : "Emma",
				"position" : "Back-end Developer",
				"pic" : "member3.jpg"
			},
			{
				"name" : "David",
				"position" : "Designer",
				"pic" : "member4.jpg"
			}
	]
}

// 초기데이터를 state에 저장했다가
// 추후 action객체가 전달되면
// action객체의 타입에 따라 기존 데이터를 변경해서 리턴
const memberReducer = (state = initMember, action) => {
	switch (action.type) {
		case 'SET_MEMBERS' :
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

const reducers = combineReducers({
	memberReducer,
});

export default reducers;