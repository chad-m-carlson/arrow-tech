import {useState, useEffect, } from 'react';

export const useWindowWidth = () => {
  const [dimensions, setDimensions] = useState({height: window.innerHeight, width: window.innerWidth})

  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }
  
  useEffect( () => {
    const handleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)}
  });

  return dimensions;
}

