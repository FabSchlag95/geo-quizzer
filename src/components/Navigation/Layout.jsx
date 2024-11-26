import React from "react";
import Clock from "./Clock";
import HintDropdown from "./HintDropdown";
import GuessBar from "./GuessBar";
import ConfirmGuessBtn from "./ConfirmGuessBtn";
import GlobalPoints from "./GlobalPoints";

export default function Layout() {
  return (
    <>
      <div className="nav-header">
        <HintDropdown />
        <div className="nav-header-right">
          <GlobalPoints />
          <Clock />
        </div>
      </div>
      <GuessBar />
      <ConfirmGuessBtn />
    </>
  );
}
