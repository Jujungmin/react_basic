import { combineReducers } from "redux";

const memberReducer = (state = {members: []}, action) => {
	switch (action.type) {
		case 'SET_MEMBERS' :
			return { ...state, members: action.payload };

		default:
			return state;
	}
};

const youtubeReducer = (state= {youtube: []}, action) => {
	switch(action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload};

		default:
			return state;
	}
}

const galleryReducer = (state= {gallery: []}, action) => {
	switch(action.type) {
		case 'SET_GALLERY':
			return { ...state, gallery: action.payload};

		default:
			return state;
	}
}

const flickrReducer = (state = {flickr: []}, action) => {
	switch(action.type) {
		case 'FLICKR_START':
			return {...state};

		case 'FLICKR_SUCCESS':
			return {...state, flickr: action.payload};

		default:
			return state;
	}
}

const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	galleryReducer,
	flickrReducer
});

export default reducers;