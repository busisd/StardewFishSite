import React, { useState } from "react";
import "../styles/FishSiteContainer.css";
import "../styles/StardewLocationCheckbox.css";
import "../../ThreeColumnContainer/ThreeColumnContainer.css";
import FishData from "../FishData2";
import StardewFishTile from "./StardewFishTile";
import SquareGrid from "../../SquareGrid/SquareGrid";
import SelectGrid from "../../SquareGrid/SelectGrid";
import { selectGridLocations, selectGridSeasons, selectGridWeather } from "./SelectGridItems";

function containsTrue(obj) {
  for (let entry of Object.entries(obj)) {
    if (entry[1]) return true;
  }
  return false;
}

function checkAllOpportunities(fishEntry, fieldToCheck) {
  for (let opportunity of fishEntry.catch_opportunities) {
    if (opportunity[fieldToCheck]) return true;
  }
  return false;
}

function checkAllFields(fishEntry, obj) {
  for (let field of Object.entries(obj)) {
    if (field[1] && checkAllOpportunities(fishEntry, field[0].toLowerCase()))
      return true;
  }
  return false;
}

function checkOpportunityLocations(fishEntry, searchLocation) {
  for (let opportunity of fishEntry.catch_opportunities) {
    if (opportunity.location === searchLocation) return true;
  }
  return false;
}

function checkAllLocations(fishEntry, locationsObj) {
  for (let field of Object.entries(locationsObj)) {
    if (field[1] && checkOpportunityLocations(fishEntry, field[0])) return true;
  }
  return false;
}

const filterFish = (
  fishEntry,
  fishSearch,
  locationState,
  weatherState,
  seasonState
) =>
  fishEntry.name.toLowerCase().includes(fishSearch.toLowerCase()) &&
  (!containsTrue(locationState) ||
    checkAllLocations(fishEntry, locationState)) &&
  (!containsTrue(weatherState) || checkAllFields(fishEntry, weatherState)) &&
  (!containsTrue(seasonState) || checkAllFields(fishEntry, seasonState));

const FishSiteContainer = () => {
  const [fishSearch, setFishSearch] = useState("");
  const [locationState, setLocationState] = useState({});
  const [weatherState, setWeatherState] = useState({});
  const [seasonState, setSeasonState] = useState({});

  return (
    <div className="three-col-container">
      <div className="three-col-center three-col-align-center">
        <SquareGrid childProps={{}}>
          {FishData.filter(fishEntry =>
            filterFish(
              fishEntry,
              fishSearch,
              locationState,
              weatherState,
              seasonState
            )
          ).map(fishEntry => (
            <StardewFishTile
              fishEntry={fishEntry}
              uniqueKey={fishEntry.name}
              key={fishEntry.name}
            />
          ))}
        </SquareGrid>
      </div>
      <div className="three-col-left">
        <input onChange={e => setFishSearch(e.target.value)} />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridLocations}
          selectState={locationState}
          setSelectState={setLocationState}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridWeather}
          selectState={weatherState}
          setSelectState={setWeatherState}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridSeasons}
          selectState={seasonState}
          setSelectState={setSeasonState}
        />
      </div>
    </div>
  );
};

const FishSiteContainer2 = () => (
  <div className="three-col-container">
    <div className="three-col-left" style={{ backgroundColor: "red" }}></div>
    <div className="three-col-center" style={{ backgroundColor: "blue" }}></div>
    <div className="three-col-right" style={{ backgroundColor: "green" }}></div>
  </div>
);

export default FishSiteContainer;
