import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './components/main/Main';
import Youtube from './components/sub/Youtube';
import Flickr from './components/sub/Flickr';
import Department from './components/sub/Department';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Community from './components/sub/Community';
import * as types from './redux/actionType';

import './scss/style.scss';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: types.FLICKR.start,
			opt: { type: 'interest', count: 100 },
		});
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.MEMBERS.start });
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main}></Route>
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department}></Route>
			<Route path='/community' component={Community}></Route>
			<Route path='/youtube' component={Youtube}></Route>
			<Route path='/flickr' component={Flickr}></Route>
			<Route path='/location' component={Location}></Route>
			<Route path='/join' component={Join}></Route>

			<Footer />
		</>
	);
}

export default App;