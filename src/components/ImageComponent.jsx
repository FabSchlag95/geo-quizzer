import React, { useEffect, useState } from "react";

export default function ImageComponent({ imagePath }) {
  const [imageIsActive, setImageIsActive] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(150);

  // adding a zoom to the picture modal
  const handleWheel = (e) => {
    e.preventDefault();
    setZoomLevel((prevZoomLevel) => {
      const zoomLevel = prevZoomLevel + e.deltaY * -0.1; // proper zoom in / out
      return Math.min(Math.max(zoomLevel, 100), 500); // Limit zoom level between 90% and 500%
    });
  };

  // by mouse move get the variables to position the zoom div
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setZoomStyle({
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: `${zoomLevel}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  useEffect(() => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      const imageAspectRatio = img.width / img.height;
      setImageAspectRatio(imageAspectRatio);
    };
  },[imagePath]);

  return (
    <div
      onClick={() => setImageIsActive(!imageIsActive)}
      style={{
        borderRadius: 10,
        width: "100%",
        aspectRatio: imageAspectRatio, 
        cursor: "pointer",
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        ...(imageIsActive && {
          position: "absolute",
          boxShadow: "var(--shadow)",
          aspectRatio:"unset",
          top: 0,
          left:0,
          width: "calc(100% - 20px)",
          height: "calc(100% - 20px)",
          margin:10,
          ...zoomStyle,
        }),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    ></div>
  );
}
