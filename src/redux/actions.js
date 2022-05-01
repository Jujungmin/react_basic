// 인수로 전달된 값을 type이 SET_MEMBERS인 액션 객체를 변환하는 함수
export const setMembers = member => {
	return {
		type: 'SET_MEMBERS',
		payload: member,
	};
};