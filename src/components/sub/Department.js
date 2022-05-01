import { useSelector, useDispatch } from 'react-redux';
import Layout from '../common/Layout';
// action 객체 생성함수 import
import { setMembers } from '../../redux/actions';

function Department() {
	const path = process.env.PUBLIC_URL;
	// useDispatch로부터 데이터 전달함수 활성화
	const dispath = useDispatch();
	const members = useSelector((store) => 
		store.memberReducer.members
	)

	// 변경할 새로운 데이터
	const newMembers = [
		{
			"name" : "Tom",
			"position" : "CEO",
			"pic" : "member4.jpg"
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

	return (
		<Layout name={'Department'}>
			<button onClick={() => {
				// action생성함수인 setMembers의 인수로 변경할 데이터 입력
				dispath(setMembers(newMembers));
			}}>멤버정보 변경</button>
			<ul>
				{members.map((data, idx) => {
					return (
						<li key={idx}>
							<img src={`${path}/img/${data.pic}`} />
							<h2>{data.name}</h2>
							<p>{data.position}</p>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Department;
