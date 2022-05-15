import axios from "axios";

export const fetchFlickr = async (opt) => {
	const api_key = '8fba436cfe2e8ae7f3a3aafcf18574c6';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	let url = '';

	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}`;
	}
	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&tags=${opt.tag}`;
	}
	if (opt.type === 'user') {
		url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${opt.count}&user_id=${opt.user}`;
	}

	// axios로 반환받은 데이터만 내보내는 순수함수 형태로 코드 변경
	return await axios.get(url);
};