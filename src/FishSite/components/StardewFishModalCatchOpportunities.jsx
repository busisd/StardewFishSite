import React from "react";
import "../styles/StardewFishModalPrices.css";

const capitalizeWord = word =>
  `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;

const createOpportunityFieldString = (catchOpportunity, fieldsArray) =>
  fieldsArray
    .filter(name => catchOpportunity[name])
    .map(name => capitalizeWord(name))
    .reduce((accumulatedNames, newName) => `${accumulatedNames}, ${newName}`);

const StardewFishModalCatchOpportunity = ({ fishName, catchOpportunities }) => (
  <table className="modal-fish-prices">
    <caption>Catchable conditions</caption>
    <tbody>
      <tr>
        <th>Conditions</th>
        {catchOpportunities.map((opportunity, index) => (
          <th key={`${fishName}-header-${index}`}>Opportunity {index + 1}</th>
        ))}
      </tr>
      <tr>
        <td>Seasons</td>
        {catchOpportunities.map((opportunity, index) => (
          <td key={`${fishName}-season-${index}`}>
            {createOpportunityFieldString(opportunity, [
              "spring",
              "summer",
              "fall",
              "winter"
            ])}
          </td>
        ))}
      </tr>
      <tr>
        <td>Weather</td>
        {catchOpportunities.map((opportunity, index) => (
          <td key={`${fishName}-season-${index}`}>
            {createOpportunityFieldString(opportunity, ["sunny", "rainy"])}
          </td>
        ))}
      </tr>
      <tr>
        <td>Location</td>
        {catchOpportunities.map((opportunity, index) => (
          <td key={`${fishName}-location-${index}`}>{opportunity.location}</td>
        ))}
      </tr>
      <tr>
        <td>Time</td>
        {catchOpportunities.map((opportunity, index) => (
          <td key={`${fishName}-time-${index}`}>{opportunity.time}</td>
        ))}
      </tr>
    </tbody>
  </table>
);

export default StardewFishModalCatchOpportunity;
