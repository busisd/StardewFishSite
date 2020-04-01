import React from "react";
import "../styles/StardewFishModal.css";
import Modal from "../../Util/Modal";
import StardewFishImage from "./StardewFishImage";
import StardewFishModalTitle from "./StardewFishModalTitle";
import StardewFishModalPrices from "./StardewFishModalPrices";

//Fish Name,Price (reg),Price (silver),Price (gold),Price (Irid),Spring,Summer,Fall,Winter,Weather,Location,Time,Difficulty,Bundle

const StardewFishModal = ({ fishEntry, closeModal, ...rest }) => (
  <Modal onClickBackground={closeModal} {...rest}>
    <StardewFishModalTitle fishName={fishEntry.name} />
    <br />
    <StardewFishImage className="modal-fish-image" fishName={fishEntry.name} />
    <br />
    <StardewFishModalPrices fishEntry={fishEntry} />
    <br />
    {/* {JSON.stringify(fishEntry)}
    <br /> */}
    <button onClick={closeModal}>Close</button>
  </Modal>
);

export default StardewFishModal;
