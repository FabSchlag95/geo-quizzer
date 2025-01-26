

/**
 * FullscreenImage component displays an image in fullscreen mode with zoom and move functionality.
 *@component
 */

import { useState } from "react";

export default function FullscreenImage({ image, deactivate }) {
  const [zoomLevel, setZoomLevel] = useState(99);
  const [mousePositionX, setMousePositionX] = useState(50);
  const [mousePositionY, setMousePositionY] = useState(50);

  // adding a zoom to the picture modal
  const handleWheel = (e) => {
    setZoomLevel((prevZoomLevel) => {
      const zoomLevel = prevZoomLevel + e.deltaY * -0.1; // proper zoom in / out
      return Math.min(Math.max(zoomLevel, 99), 500); // Limit zoom level between 100% and 500%
    });
  };

  // by mouse move get the variables to position the zoom div
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = zoomLevel > 100 ? (x / rect.width) * 100 : 50;
    const yPercent = zoomLevel > 100 ? (y / rect.height) * 100 : 50;

    setMousePositionX(xPercent);
    setMousePositionY(yPercent);
  };

  return (
    <div className="overlay">
      <div
        className="fullscreen-img"
        onClick={deactivate}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: `${mousePositionX}% ${mousePositionY}%`,
          backgroundSize: zoomLevel >= 100 ? `${zoomLevel}%` : "contain",
        }}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      />
    </div>
  );
}
