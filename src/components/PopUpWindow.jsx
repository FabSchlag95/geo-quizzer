/**
 * PopUpWindow component renders a pop-up window with an overlay.
 * @component 
 */

import "./components.css";

export default function PopUpWindow({ children }) {
  return (
    <div className="overlay">
      <div className="pop-up-window">{children}</div>
    </div>
  );
}
