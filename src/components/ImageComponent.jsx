/**
 * ImageComponent displays an image in the parent container with an option to view it in fullscreen.
 * @component
 */

import { useState } from "react";
import useImage from "../hooks/useImage";
import FullscreenImage from "./FullscreenImage";

export default function ImageComponent({ image, style }) {
  const [fullscreen, setFullscreen] = useState(false);
  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  const [aspectRatio] = useImage(image);
  return (
    <>
      <div
        onClick={handleFullscreen}
        className="img-div"
        style={{ backgroundImage: `url(${image})`, minHeight:aspectRatio<=1&&"200px", height:aspectRatio<=1&&"100%", width:aspectRatio>1&&"100%", aspectRatio, ...style }}
      />
      {fullscreen && (
        <FullscreenImage image={image} deactivate={handleFullscreen} />
      )}
    </>
  );
}
