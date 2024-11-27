import React, { memo } from "react";

const GlobalPoints = memo(({ globalPoints })=>{
  return (
    <div className="global-points">
      <p>Score {globalPoints||0} p.</p>
    </div>
  );
})

export default GlobalPoints