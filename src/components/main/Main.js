import React from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';

function Main() {
  return (
	<>
		<Header type={'main'} />
		<Visual />
		<News />
		<Pics />
		<Vids />
	</>
  )
}

export default Main;