import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';

function Department() {
	// const [members, setMembers] = useState([]);
	const path = process.env.PUBLIC_URL;
	const members = useSelector((store) => 
		store.memberReducer.members
	)
	console.log(members);

	/*
	const url = `${path}/DB/department.json`;

	useEffect(() => {	
		axios
			.get(url)
			.then((json) => {
				console.log(json.data.data);
				setMembers(json.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	*/

	return (
		<Layout name={'Department'}>
			{/* <button
				onClick={() => {
					let newMembers = [...members];
					newMembers[0].name = 'Michael';
					setMembers(newMembers);
					console.log(members);
				}}>
				멤버정보 변경
			</button> */}
			
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
