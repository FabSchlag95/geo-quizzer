/**
 * MainModal component provides structuring and conditional display of all modal screens.
 * It renders different modals based on the current screen state from the game context.
 *
 * - If the current screen is "END_SCREEN", it displays the EndModal within an custom overlay.
 * - For other screens, it displays the corresponding modal (RulesModal, HintModal, or GuessResultModal) within a modal container
 *  and a default overlay.
 *
 * @component
 */
import "./Modal.css";
import RulesModal from "./RulesModal";
import HintModal from "./HintModal";
import EndModal from "./EndModal";
import GuessResultModal from "./GuessResultModal";
import { useContext } from "react";
import { gameContext } from "../contexts";

export default function MainModal() {
  const { currentScreen } = useContext(gameContext);

  if (currentScreen) {
    if (currentScreen === "END_SCREEN") {
      return (
        <div className="end-modal-overlay">
          <EndModal />
        </div>
      );
    } else {
      return (
        <div className="overlay">
          <div className="modal-container">
            {
              {
                INFO: <RulesModal />,
                HINT: <HintModal />,
                GUESS_RESULT: <GuessResultModal />,
              }[currentScreen]
            }
          </div>
        </div>
      );
    }
  }
}
