import React, { useState } from "react";
import FishData from "./FishData";
import StardewFishTile from "./StardewFishTile";
import SquareGrid from "../SquareGrid/SquareGrid";

const FishSiteContainer = () => {
  const [fishSearch, setFishSearch] = useState("");

  return (
    <>
      <SquareGrid childProps={{}}>
        {FishData.filter(fishEntry =>
          fishEntry[0].toLowerCase().includes(fishSearch.toLowerCase())
        ).map(fishEntry => (
          <StardewFishTile
            fishEntry={fishEntry}
            uniqueKey={fishEntry[0]}
            key={fishEntry[0]}
          />
        ))}
      </SquareGrid>
      <input onChange={e => setFishSearch(e.target.value)} />
    </>
  );
};

export default FishSiteContainer;
