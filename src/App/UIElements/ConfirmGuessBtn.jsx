import { useCallback } from "react";

export default function ConfirmGuessBtn({ tempCoords, nextGameState }) {
  const onClick = useCallback(() => {
    if (tempCoords) nextGameState();
  }, [tempCoords, nextGameState]);
  return (
    <i
      onClick={onClick}
      className={
        "fa-solid fa-circle-check confirm-guess " +
        (tempCoords ? "active" : "inactive")
      }
    />
  );
}
