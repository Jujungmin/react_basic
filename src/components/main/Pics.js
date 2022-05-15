import { useSelector } from 'react-redux';

function Pics() {
	const gallery = useSelector((store) => store.galleryReducer.gallery);
	return (
		<section id='pics' className='myScroll'>
			<h1>Recent Gallery</h1>

			{
				gallery.map((pic, idx) => {
					if(idx < 5) {
						return (
							<li key={idx}>
								<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_s.jpg`} />
							</li>
						)
					}
				})
			}
		</section>
	);
}

export default Pics;
