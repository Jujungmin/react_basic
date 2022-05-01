import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const { kakao } = window;
	const path = process.env.PUBLIC_URL;
	const info = [
		{
			title: '송내역',
			latlag: new kakao.maps.LatLng(37.487626, 126.753045),
			imgSrc: path + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '강남 포스코',
			latlag: new kakao.maps.LatLng(37.506354, 127.055006),
			imgSrc: path + '/img/marker2.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '청담역',
			latlag: new kakao.maps.LatLng(37.51912, 127.051937),
			imgSrc: path + '/img/marker3.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	const container = useRef(null);

	const [map, setMap] = useState(null);
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(0);
	const [mapInfo] = useState(info);

	const handleTraffic = () => {
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	};

	useEffect(() => {
		container.current.innerHTML = '';

		const option = {
			center: mapInfo[index].latlag,
			level: 3,
		};
		const mapInstance = new kakao.maps.Map(container.current, option);

		new kakao.maps.Marker({
			map: mapInstance,
			position: mapInfo[index].latlag,
			title: mapInfo[index].title,
			image: new kakao.maps.MarkerImage(
				mapInfo[index].imgSrc,
				mapInfo[index].imgSize,
				mapInfo[index].imgPos
			),
		});

		const mapInit = () => {
			console.log('mapInit');
			mapInstance.setCenter(mapInfo[index].latlag);
		};

		//지도 컨트롤 타입 인스턴스 생성
		const mapTypeControl = new kakao.maps.MapTypeControl();
		mapInstance.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.BOTTOMRIGHT
		);

		//zoom컨트롤러 인스턴스 생성
		const zoomControl = new kakao.maps.ZoomControl();
		mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

		window.addEventListener('resize', mapInit);
		setMap(mapInstance);

		return () => window.removeEventListener('resize', mapInit);
	}, [index]);

	useEffect(() => {
		handleTraffic();
	}, [traffic]);

	return (
		<Layout name={'Location'}>
			<h1>Location</h1>

			<div id='map' ref={container}></div>

			<button onClick={() => setTraffic(!traffic)}>
				{traffic ? 'traffic ON' : 'traffic OFF'}
			</button>

			<ul>
				{mapInfo.map((data, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)}>
							{data.title}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Location;
