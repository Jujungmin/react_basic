import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube, setMembers } from './redux/actions';
import axios from 'axios';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/main/Main';
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Department from './components/sub/Department';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Community from './components/sub/Community';

import './scss/style.scss';

const path = process.env.PUBLIC_URL;

function App() {
	const dispatch = useDispatch();

	const fetchYoutube = async () => {
		const key = 'AIzaSyC1ZoNu5yeRlCzN99-WFMmpbx2XZKXpr4Y';
		const id = 'PL0_TVLt64K1Wc00HL3Xs4KPSmOEKNeqeZ';
		const num = 7;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${id}&maxResults=${num}&part=snippet`;

		await axios.get(url).then((json) => {
			dispatch(setYoutube(json.data.items));
			// setLoading(true);
		});
	};

	const fetchMembers = async () => {
		const url = path + '/DB/department.json';
		await axios.get(url).then((json) => {
			dispatch(setMembers(json.data.data));
		});
	};

	useEffect(() => {
		fetchYoutube();
		fetchMembers();
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main}></Route>

				<Route path='/'>
					<Header type={'sub'} />
				</Route>
			</Switch>

			<Route path='/department' component={Department}></Route>
			<Route path='/community' component={Community}></Route>
			<Route path='/youtube' component={Youtube}></Route>
			<Route path='/gallery' component={Gallery}></Route>
			<Route path='/location' component={Location}></Route>
			<Route path='/join' component={Join}></Route>

			<Footer />
		</>
	);
}

export default App;
