import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../common/Layout';

function Youtube() {
  const [items, setItems] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);

  const api_key = 'AIzaSyC1ZoNu5yeRlCzN99-WFMmpbx2XZKXpr4Y';
  const play_list = 'PL0_TVLt64K1Wc00HL3Xs4KPSmOEKNeqeZ';
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&playlistId=${play_list}&maxResults=3&part=snippet`;


	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.items);
			setItems(json.data.items);
		});
	}, []);

	return (
		<Layout name={'Youtube'}>
			{items.map((item, idx) => {
				let desc = item.snippet.description;
				let desc_len = desc.length;
				let date = item.snippet.publishedAt;

				return (
					<article
						key={idx}
						onClick={() => {
							setIsPop(!isPop);
			setIndex(idx);
						}}>
						<div className='inner'>
							<div className='pic'>
								<img src={item.snippet.thumbnails.medium.url} />
							</div>
							<h2>{item.snippet.title}</h2>
							<p>{desc_len > 200 ? desc.substr(0, 200) + '...' : desc}</p>
							<span>{date.split('T')[0]}</span>
						</div>
					</article>
				);
			})}
			{isPop ? <Popup /> : null}
		</Layout>
	);

	function Popup() {
		useEffect(() => {
			// console.log('pop');
			document.body.style.overflow = 'hidden';

			return () => {
				document.body.style.overflow = 'auto';
			};
		}, []);

		return (
			<aside className='popup'>
        		<iframe src={
						'https://www.youtube.com/embed/' +
						items[index].snippet.resourceId.videoId
					} frameBorder='0'></iframe>
				<span onClick={() => setIsPop(!isPop)}>close</span>
			</aside>
		);
	}
}

export default Youtube;