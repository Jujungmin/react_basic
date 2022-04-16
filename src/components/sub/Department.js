import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../common/Layout';

function Department() {
	// let [index, setIndex] = useState(0);
	// 추후 axios로 불러온 데이터 배열을 담을 state 생성
	const [members, setMembers] = useState([]);
	
	// public폴더의 절대 경로값을 구함
	const path = process.env.PUBLIC_URL;
	
	// 절대겅로에서부터의 json파일 데이터 url값 구함
	const url = `${path}/DB/department.json`;

	// 컴포넌트 생성시 처음 한번만 동작
	useEffect(() => {
		// axios로 위에 만든 url로 데이터 요청 후
		// 요청에 성공하면 state값을 옮겨담음
		axios.get(url)
		.then((json) => {
			// console.log(json.data.data);
			setMembers(json.data.data);
		}).catch((err) => {
			console.log(err);
		})
	}, []);

  return (
	  <Layout name={'Department'}>
		<button onClick={() => {
			// 기존에 있는 members에 deepCopy해서 state에 변경해줘야 한다.
			// 참조형 객체나 배열은 딥카피해야 한다.
			let newMembers = ([...members]);
			newMembers[0].name = 'Michael';
			setMembers(newMembers);
			console.log(members);
		}}>멤버정보 변경</button>

		{/* state에 있는 배열값을 반복돌면서 가상 DOM 생성 */}
		<ul>
			{members.map((data,idx) => {
				return (
					<li key={idx}>
						<img src={`${path}/img/${data.pic}`} />
						<h2>{data.name}</h2>
						<p>{data.position}</p>
					</li>
				)
			})}
		</ul>
	  </Layout>
		
  )
}

export default Department;
