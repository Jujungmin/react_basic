import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube, setMembers, setFlicker } from './redux/actions';
import axios from 'axios';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/main/Main';
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Flickr from './components/sub/Flickr';
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

	const fetchFlickr = async () => {
		const api_key = '8fba436cfe2e8ae7f3a3aafcf18574c6';
		const method = 'flickr.interestingness.getList';
		const per_page = 50;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${per_page}`;

		await axios.get(url).then((json) => {
			dispatch(setFlicker(json.data.photos.photo));
		});
	}

	const fetchMembers = async () => {
		const url = path + '/DB/department.json';
		await axios.get(url).then((json) => {
			dispatch(setMembers(json.data.data));
		});
	};

	useEffect(() => {
		fetchYoutube();
		fetchMembers();
		fetchFlickr();
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main}></Route>
				{/* componet대신 render :: 기존라우터 인라인으로 수정 */}
				<Route path='/' render={() => <Header type={'sub'} />}></Route>
			</Switch>

			<Route path='/department' component={Department}></Route>
			<Route path='/community' component={Community}></Route>
			<Route path='/youtube' component={Youtube}></Route>
			<Route path='/gallery' component={Gallery}></Route>
			<Route path='/flickr' component={Flickr}></Route>
			<Route path='/location' component={Location}></Route>
			<Route path='/join' component={Join}></Route>

			<Footer />
		</>
	);
}

export default App;
