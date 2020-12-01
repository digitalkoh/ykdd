import React from 'react';
const { useRef, useEffect, useState } = React;

function useDragging() {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  function onMouseMove(e) {
    if (!isDragging) return;
    setPos({
      x: e.x - ref.current.offsetWidth / 2,
      y: e.y - ref.current.offsetHeight / 2,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e) {
    setIsDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;
    setIsDragging(true);

    setPos({
      x: e.x - ref.current.offsetWidth / 2,
      y: e.y - ref.current.offsetHeight / 2,
    });

    e.stopPropagation();
    e.preventDefault();
  }

  // When the element mounts, attach an mousedown listener
  useEffect(() => {
    ref.current.addEventListener("mousedown", onMouseDown);

    return () => {
      ref.current.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  // Everytime the isDragging state changes, assign or remove
  // the corresponding mousemove and mouseup handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
    } else {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    }
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging]);

  return [ref, pos.x, pos.y, isDragging];
}



function TestAnim() {
  const [ref, x, y, isDragging] = useDragging();

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width: 150,
        height: 150,
        background: isDragging ? "blue" : "gray",
        left: x,
        top: y,
      }}
    >
        X
    </div>
  );
}

export default TestAnim;