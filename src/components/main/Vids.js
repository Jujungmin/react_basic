
   
import { useSelector } from 'react-redux';
import Popup from '../common/Popup';
import { useRef, useState } from 'react';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	return (
		<>
			<section id='vids' className='myScroll'>
				<h1>Recent Youtube</h1>

				<ul className='vidList'>
					{youtube.map((vid, idx) => {
						if (idx < 3)
							return (
								<li
									key={idx}
									onClick={() => {
										setIndex(idx);
										pop.current.open();
									}}>
									<img src={vid.snippet.thumbnails.medium.url} />
								</li>
							);
					})}
				</ul>
			</section>

			<Popup ref={pop}>
				{youtube.length !== 0 && (
						<iframe
							src={
								'https://www.youtube.com/embed/' +
								youtube[index].snippet.resourceId.videoId
							}
							frameBorder='0'></iframe>
					)}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Vids;