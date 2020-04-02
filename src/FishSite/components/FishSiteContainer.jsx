import React, { useState } from "react";
import "../styles/FishSiteContainer.css";
import "../styles/FishSiteSelectGrids.css";
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
  selectGridBundles,
  makeSelectGridCheck,
  selectGridLegendary
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
    if (field[1] && fishEntry.bundle === field[0]) return true;
  }
  return false;
}

function checkOnlySunny(fishEntry) {
  for (let opportunity of fishEntry.catch_opportunities) {
    if (opportunity.sunny && !opportunity.rainy) return true;
  }
  return false;
}

function checkOnlyRainy(fishEntry) {
  for (let opportunity of fishEntry.catch_opportunities) {
    if (opportunity.rainy && !opportunity.sunny) return true;
  }
  return false;
}

function checkWeather(fishEntry, weatherState) {
  if (weatherState.sunny || weatherState.rainy) {
    return checkAllFields(fishEntry, {
      sunny: weatherState.sunny,
      rainy: weatherState.rainy
    });
  } else if (weatherState.onlySunny) {
    return checkOnlySunny(fishEntry);
  } else if (weatherState.onlyRainy) {
    return checkOnlyRainy(fishEntry);
  } else {
    return true;
  }
}

function checkLegendary(fishEntry, legendaryState) {
  if (Boolean(legendaryState.common) === Boolean(legendaryState.legendary))
    return true;
  else if (legendaryState.common) return !fishEntry.legendary;
  else return fishEntry.legendary;
}

const filterFish = (
  fishEntry,
  fishSearch,
  locationState,
  weatherState,
  seasonState,
  bundleState,
  checkedFish,
  shouldHide,
  legendaryState
) =>
  fishEntry.name.toLowerCase().includes(fishSearch.toLowerCase()) &&
  (!containsTrue(locationState) ||
    checkAllLocations(fishEntry, locationState)) &&
  checkWeather(fishEntry, weatherState) &&
  (!containsTrue(seasonState) || checkAllFields(fishEntry, seasonState)) &&
  (!containsTrue(bundleState) || checkAllBundles(fishEntry, bundleState)) &&
  (!shouldHide || !checkedFish[fishEntry.name]) &&
  checkLegendary(fishEntry, legendaryState);

const FishSiteContainer = () => {
  const [fishSearch, setFishSearch] = useState("");
  const [locationState, setLocationState] = useState({});
  const [weatherState, setWeatherState] = useState({});
  const [seasonState, setSeasonState] = useState({});
  const [bundleState, setBundleState] = useState({});
  const [checkedFish, setCheckedFish] = useLocalStorage("checkedFish", {});
  const [checkState, setCheckState] = useState({});
  const [legendaryState, setLegendaryState] = useState({});

  const filteredFishEntries = FishData.filter(fishEntry =>
    filterFish(
      fishEntry,
      fishSearch,
      locationState,
      weatherState,
      seasonState,
      bundleState,
      checkedFish,
      checkState.shouldHide,
      legendaryState
    )
  );
  const filteredCommonFishEntries = filteredFishEntries.filter(
    fishEntry => !fishEntry.legendary
  );

  return (
    <div className="three-col-container">
      <div className="three-col-left">
        <input
          value={fishSearch}
          onChange={e => setFishSearch(e.target.value)}
          placeholder="Search for fish"
        />
        <button onClick={() => setFishSearch("")}>Clear search</button>
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridLocations}
          selectState={locationState}
          setSelectState={setLocationState}
          childProps={{ className: "location-filter" }}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridWeather}
          selectState={weatherState}
          setSelectState={setWeatherState}
          childProps={{ className: "weather-filter" }}
          gridMultiSelect={false}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridSeasons}
          selectState={seasonState}
          setSelectState={setSeasonState}
          childProps={{ className: "season-filter" }}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridBundles}
          selectState={bundleState}
          setSelectState={setBundleState}
          childProps={{ className: "bundle-filter" }}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={selectGridLegendary}
          selectState={legendaryState}
          setSelectState={setLegendaryState}
          childProps={{ className: "legendary-filter" }}
          gridMultiSelect={false}
        />
        <SelectGrid
          style={{ "--grid-items-per-row": 5, "--grid-width": "400px" }}
          items={makeSelectGridCheck(
            setCheckedFish,
            setFishSearch,
            setCheckState,
            [setLocationState, setWeatherState, setSeasonState, setBundleState, setLegendaryState]
          )}
          selectState={checkState}
          setSelectState={setCheckState}
          childProps={{ className: "checkbox-filter" }}
        />
      </div>
      <div className="three-col-center three-col-align-center">
        <SquareGrid childProps={{}}>
          {filteredFishEntries.map(fishEntry => (
            <StardewFishTile
              fishEntry={fishEntry}
              isChecked={Boolean(checkedFish[fishEntry.name])}
              setCheckedFish={setCheckedFish}
              checkMode={checkState.checkMode}
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
          Use <kbd>ctrl</kbd>+<kbd>click</kbd> to check off a fish, or use fish
          check mode
        </span>
        <br />
        <span>Checked fish will be saved between visits</span>
        <br />
        <br />
        <span>
          Expected profit per catch (ignoring quality and fish rarity):{" "}
          {filteredFishEntries.length > 0
            ? (
                filteredFishEntries
                  .map(entry => entry.price_normal)
                  .reduce((total, newPrice) => total + newPrice) /
                filteredFishEntries.length
              ).toFixed(2)
            : "N/A"}
        </span>
        <br />
        <span>
          Expected profit per catch, ignoring legendary fish:{" "}
          {filteredCommonFishEntries.length > 0
            ? (
                filteredCommonFishEntries
                  .map(entry => entry.price_normal)
                  .reduce((total, newPrice) => total + newPrice) /
                filteredCommonFishEntries.length
              ).toFixed(2)
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default FishSiteContainer;
