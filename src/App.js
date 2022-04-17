import { Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Visual from './components/main/Visual';
import Content from './components/main/Content';
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Department from './components/sub/Department';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Community from './components/sub/Community';


import './scss/style.scss';

function App() {
	return (
		<>
		<Switch>
			{/* exact ::  */}
			<Route exact path='/'>
				<Header type={'main'} />
				<Visual />
				<Content />
			</Route>

			<Route path='/'>
				<Header type={'sub'} />
			</Route>
		</Switch>

		<Route path='/department' component={Department}></Route>
		<Route path='/community' component={Community}></Route>
		<Route path='/youtube' component={Youtube}></Route>
		<Route path='/gallery' component={Gallery}></Route>
		<Route path='/Location' component={Location}></Route>
		<Route path='/Join' component={Join}></Route>
		
		<Footer />
		</>
	)
}

export default App;

/*
localhost:3000/gallery
깜빡임없이 바뀜. 컴포넌트안에서 바뀐다 => CSR 클라이언트사이드렌더링
*/