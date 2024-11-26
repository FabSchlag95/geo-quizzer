import React, { useContext } from "react";
import { gameContext } from "../../App";

export default function GlobalPoints() {
  const { globalPoints } = useContext(gameContext);
  return (
    <div className="global-points">
      <p>Score {globalPoints||0} p.</p>
    </div>
  );
}
