import React from 'react';
import GSAP from "gsap/all";

const { useRef, useEffect } = React;

const style={
    backgroundColor: 'orange',
    height: '7em',
    width: '7em',
    borderRadius: '100%'
}

export const TestAnim = () => {
    useEffect(() => {      
      GSAP.to('.ball', {x:250, duration: 1})
  }, []);
  return (
    <>
      <div className="ball" style={style}></div>
    </>
  );
}