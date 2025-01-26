/**
 * MainUI component structures all UI components
 * such as hints, scoring, clock, guesses, and the confirm guess button.
 *
 * @component
 */

import Clock from "./Clock";
import Hints from "./Hints";
import Guesses from "./Guesses";
import Credits from "./Credits";
import "./UI.css";
import ConfirmGuessBtn from "./ConfirmGuessBtn";
import Streak from "./Streak";

export default function MainUI() {
  return (
    <div className="ui-container">
      <Hints />
      <div className="ui-container-right">
        <div className="scoring-container">
          <Credits />
          <Streak />
        </div>
        <Clock />
        <Guesses />
        <ConfirmGuessBtn />
      </div>
    </div>
  );
}
