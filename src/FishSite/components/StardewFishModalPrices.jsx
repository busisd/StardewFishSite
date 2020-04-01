import React from "react";
import "../styles/StardewFishModalPrices.css";
import silverStar from "../styles/SilverStar-24px.png";
import goldStar from "../styles/GoldStar-24px.png";
import iridiumStar from "../styles/IridiumStar-24px.png";

const StardewFishModalPrices = ({ fishEntry }) => (
  <>
    <table className="modal-fish-prices">
      <caption>Prices</caption>
      <tbody>
        <tr>
          <td>
            <span>Base</span>
          </td>
          <td>
            <img src={silverStar} alt="Silver quality" />
          </td>
          <td>
            <img src={goldStar} alt="Gold quality" />
          </td>
          <td>
            <img src={iridiumStar} alt="Iridium quality" />
          </td>
        </tr>
        <tr>
          <td>{fishEntry.price_normal}</td>
          <td>{fishEntry.price_silver}</td>
          <td>{fishEntry.price_gold}</td>
          <td>{fishEntry.price_iridium}</td>
        </tr>
      </tbody>
    </table>
  </>
);

export default StardewFishModalPrices;
