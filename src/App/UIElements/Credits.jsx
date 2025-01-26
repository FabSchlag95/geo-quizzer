/**
 * Credits component displays the current credits (in-game money) from the game context.
 *
 * @component
 */

import { useContext } from "react";
import { gameContext } from "../contexts";

export default function Credits() {
  const { credits } = useContext(gameContext);
  return (
    <div className="global-points">
      <p className="hidden-text">Credits:</p>
      <p>{credits || 0}⭐</p>
    </div>
  );
}
