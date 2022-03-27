import React, { useRef, useEffect } from 'react'

function Youtube() {
  const frame = useRef(null);

  useEffect(() => {
    frame.current.classList.add('on');
  }, []);

  return (
    <section className='youtube' ref={frame}>
      <div className='inner'>
        <div>Youtube</div>
      </div>
    </section>
  )
}

export default Youtube