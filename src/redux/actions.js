export const setMembers = (member) => {
	return {
		type: 'SET_MEMBERS',
		payload: member,
	};
};

export const setYoutube = (data) => {
	return {
		type: 'SET_YOUTUBE',
		payload: data,
	}
}

export const setGallery = (data) => {
	return {
		type: 'SET_GALLERY',
		payload: data,
	}
}