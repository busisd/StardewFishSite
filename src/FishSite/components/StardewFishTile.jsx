import React, { useState } from "react";
import "../styles/StardewFishTile.css";
import StardewFishModal from "./StardewFishModal";
import StardewFishImage from "./StardewFishImage";

function StardewFishTile({ fishEntry, isChecked, setCheckedFish }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StardewFishImage
        fishName={fishEntry.name}
        className={
          isChecked
            ? "grid-item-content stardew-fish-tile fish-tile-checked"
            : "grid-item-content stardew-fish-tile"
        }
        onClick={e => {
          if (e.ctrlKey) {
            setCheckedFish(oldVal => ({
              ...oldVal,
              [fishEntry.name]: !isChecked
            }));
          } else {
            setIsModalOpen(true);
          }
        }}
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
