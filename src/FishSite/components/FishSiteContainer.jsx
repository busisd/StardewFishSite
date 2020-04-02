import React, { useState } from "react";
import "../styles/FishSiteContainer.css";
import "../styles/StardewLocationCheckbox.css";
import "../../ThreeColumnContainer/ThreeColumnContainer.css";
import FishData from "../FishData2";
import StardewFishTile from "./StardewFishTile";
import SquareGrid from "../../SquareGrid/SquareGrid";
import SelectGrid from "../../SquareGrid/SelectGrid";
import {
  selectGridLocations,
  selectGridSeasons,
  selectGridWeather,
  hideCheckedItems,
  selectGridBundles
} from "./SelectGridItems";
import useLocalStorage from "../../LocalStorageHook/useLocalStorage";

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

function checkAllBundles(fishEntry, bundlesObj) {
  for (let field of Object.entries(bundlesObj)) {
    if (field[1] && fishEntry.bundle == field[0]) return true;
  }
  return false;
}

const filterFish = (
  fishEntry,
  fishSearch,
  locationState,
  weatherState,
  seasonState,
  bundleState,
  checkedFish,
  hideCheckedState
) =>
  fishEntry.name.toLowerCase().includes(fishSearch.toLowerCase()) &&
  (!containsTrue(locationState) ||
    checkAllLocations(fishEntry, locationState)) &&
  (!containsTrue(weatherState) || checkAllFields(fishEntry, weatherState)) &&
  (!containsTrue(seasonState) || checkAllFields(fishEntry, seasonState)) &&
  (!containsTrue(bundleState) || checkAllBundles(fishEntry, bundleState)) &&
  (!hideCheckedState.shouldHide || !checkedFish[fishEntry.name]);

const FishSiteContainer = () => {
  const [fishSearch, setFishSearch] = useState("");
  const [locationState, setLocationState] = useState({});
  const [weatherState, setWeatherState] = useState({});
  const [seasonState, setSeasonState] = useState({});
  const [bundleState, setBundleState] = useState({});
  const [checkedFish, setCheckedFish] = useLocalStorage("checkedFish", {});
  const [hideCheckedState, setHideCheckedState] = useState({});

  return (
    <div className="three-col-container">
      <div className="three-col-left">
        <input
          onChange={e => setFishSearch(e.target.value)}
          placeholder="Search for fish"
        />
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
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridBundles}
          selectState={bundleState}
          setSelectState={setBundleState}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={hideCheckedItems}
          selectState={hideCheckedState}
          setSelectState={setHideCheckedState}
        />
      </div>
      <div className="three-col-center three-col-align-center">
        <SquareGrid childProps={{}}>
          {FishData.filter(fishEntry =>
            filterFish(
              fishEntry,
              fishSearch,
              locationState,
              weatherState,
              seasonState,
              bundleState,
              checkedFish,
              hideCheckedState
            )
          ).map(fishEntry => (
            <StardewFishTile
              fishEntry={fishEntry}
              isChecked={Boolean(checkedFish[fishEntry.name])}
              setCheckedFish={setCheckedFish}
              uniqueKey={fishEntry.name}
              key={fishEntry.name}
            />
          ))}
        </SquareGrid>
      </div>
      <div className="three-col-right">
        <span>Click on a fish to see more information about it</span>
        <br />
        <span>Search for fish using the provided filters</span>
        <br />
        <br />
        <span>
          Use <kbd>ctrl</kbd>+<kbd>click</kbd> to check off a fish
        </span>
        <br />
        <span>Checked fish will be saved between visits</span>
      </div>
    </div>
  );
};

export default FishSiteContainer;
