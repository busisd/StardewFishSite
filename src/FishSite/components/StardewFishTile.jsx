import React, { useState } from "react";
import "../styles/StardewFishTile.css";
import StardewFishModal from "./StardewFishModal";
import StardewFishImage from "./StardewFishImage";

function StardewFishTile({ fishEntry }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StardewFishImage
        fishName={fishEntry.name}
        className={"grid-item-content stardew-fish-tile"}
        onClick={() => setIsModalOpen(true)}
      />
      <StardewFishModal
        visible={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        fishEntry={fishEntry}
      />
    </>
  );
}

export default StardewFishTile;
