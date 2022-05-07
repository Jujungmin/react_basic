import { useSelector } from 'react-redux';
import Layout from '../common/Layout';

function Department() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((store) => 
		store.memberReducer.members
	)

	return (
		<Layout name={'Department'}>
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
