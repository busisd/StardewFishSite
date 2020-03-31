import React, { useState } from "react";
import "./StardewFishTile.css";
import Modal from "../Util/Modal";

function StardewFishTile({ fishEntry }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <img
        src={`FishImages/${fishEntry[0].replace(" ", "_")}.png`}
        alt={fishEntry[0]}
        title={fishEntry[0]}
        className={"grid-item-content stardew-fish-tile"}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        visible={isModalOpen}
        onClickBackground={() => setIsModalOpen(false)}
      >
        {fishEntry.toString()}
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </>
  );
}

export default StardewFishTile;
