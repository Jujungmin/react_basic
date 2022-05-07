import { useSelector } from 'react-redux';

function Vids() {
	const vidData = useSelector((store) => store.youtubeReducer.youtube);
	return (
		<section id='vids' className='myScroll'>
			<h1>Recent Youtube</h1>

			<ul className="vidList">
				{vidData.map((vid, idx) => {
					if(idx < 3) return (
						<li key={idx}>
							<img src={vid.snippet.thumbnails.medium.url} />
						</li>
					)
				})}
			</ul>
		</section>
	);
}

export default Vids;
