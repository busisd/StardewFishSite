import React from "react";
import "../styles/StardewFishModal.css";
import Modal from "../../Util/Modal";
import StardewFishImage from "./StardewFishImage";
import StardewFishModalTitle from "./StardewFishModalTitle";
import StardewFishModalPrices from "./StardewFishModalPrices";
import StardewFishModalCatchOpportunities from "./StardewFishModalCatchOpportunities";

const StardewFishModal = ({ fishEntry, closeModal, ...rest }) => (
  <Modal onClickBackground={closeModal} {...rest}>
    <StardewFishModalTitle fishName={fishEntry.name} />
    <br />
    <StardewFishImage className="modal-fish-image" fishName={fishEntry.name} />
    <br />
    <StardewFishModalPrices fishEntry={fishEntry} />
    <br />
    <StardewFishModalCatchOpportunities
      fishName={fishEntry.name}
      catchOpportunities={fishEntry.catch_opportunities}
    />
    <br />
    <span>Difficulty: {fishEntry.catch_difficulty}</span>
    <br /><br />
    {fishEntry.bundle === "No" ? "" : <><span>Bundle: {fishEntry.bundle}</span><br /><br /></>}
    <button onClick={closeModal}>Close</button>
  </Modal>
);

export default StardewFishModal;
