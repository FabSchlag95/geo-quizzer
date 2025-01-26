

/**
 * Custom hook to calculate and return the aspect ratio of an image.
 * Gets the imagePAth as input and returns the aspectRatio in an array.
 */
import { useEffect, useState } from "react";

export default function useImage(imagePath) {
  const [imageAspectRatio, setImageAspectRatio] = useState(0);
  useEffect(() => {
    if (imagePath) {
      const img = new Image();
      img.src = imagePath;
      img.onload = () => {
        const imageAspectRatio = img.width / img.height;
        setImageAspectRatio(imageAspectRatio);
      };
    }
  }, [imagePath]);
  return [imageAspectRatio];
}
