/**
 * RulesModal component displays the rules of the game.
 * When onClick is proved for the button it will be used, otherwise the nextGameState function is used.
 *
 * @component
 */

import { useContext } from "react";
import { gameContext } from "../contexts";

export default function RulesModal({ onClick }) {
  const { rules, nextGameState } = useContext(gameContext);
  return (
    <>
      <h3>Rules:</h3>
      <ul>
        {rules.map((rule, i) => (
          <li key={rule + i}>{rule}</li>
        ))}
      </ul>
      <button onClick={onClick || nextGameState}>
        {onClick ? "Continue" : "Start First Round!"}
      </button>
    </>
  );
}
