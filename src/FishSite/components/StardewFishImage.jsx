import React from "react";

const StardewFishImage = ({ fishName, ...props }) => (
  <img 
    src={`FishImages/${fishName.replace(/ /g, "_")}.png`}
    alt={fishName}
    title={fishName}
    {...props}
  />
);

export default StardewFishImage;
