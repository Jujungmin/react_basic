import { useSelector } from 'react-redux';
import Popup from '../common/Popup';
import { useRef, useState } from 'react';

function Vids() {
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	return (
		<>
		<section id='vids' className='myScroll'>
			<h1>Recent Youtube</h1>

			<ul className="vidList">
				{vidData.map((vid, idx) => {
					if(idx < 3) return (
						<li key={idx} onClick={() => {
							setIndex(idx);
							pop.current.open();
							}}>
							<img src={vid.snippet.thumbnails.medium.url} />
						</li>
					)
				})}
			</ul>
		</section>

		<Popup ref={pop}>
			<span onClick={() => pop.current.close()}>close</span>
		</Popup>
		</>
	);
}

export default Vids;
