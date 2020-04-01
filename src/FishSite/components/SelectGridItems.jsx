import React from "react";

const selectGridLocations = [
  {
    name: "Ocean",
    checked: <div className="location-checkbox checked">Beach</div>,
    unchecked: <div className="location-checkbox unchecked">Beach</div>
  },
  {
    name: "Mountain Lake",
    checked: <div className="location-checkbox checked">Mountain</div>,
    unchecked: <div className="location-checkbox unchecked">Mountain</div>
  },
  {
    name: "River",
    checked: <div className="location-checkbox checked">River</div>,
    unchecked: <div className="location-checkbox unchecked">River</div>
  },
  {
    name: "Night Market",
    checked: <div className="location-checkbox checked">Night Market</div>,
    unchecked: <div className="location-checkbox unchecked">Night Market</div>
  },
  {
    name: "Secret Woods",
    checked: <div className="location-checkbox checked">Secret Woods</div>,
    unchecked: <div className="location-checkbox unchecked">Secret Woods</div>
  },
  {
    name: "Mines",
    checked: <div className="location-checkbox checked">Mines</div>,
    unchecked: <div className="location-checkbox unchecked">Mines</div>
  },
  {
    name: "Sewers",
    checked: <div className="location-checkbox checked">Sewers</div>,
    unchecked: <div className="location-checkbox unchecked">Sewers</div>
  },
  {
    name: "Desert",
    checked: <div className="location-checkbox checked">Desert</div>,
    unchecked: <div className="location-checkbox unchecked">Desert</div>
  },
  {
    name: "Mutant Bug Lair",
    checked: <div className="location-checkbox checked">Mutant Bug Lair</div>,
    unchecked: (
      <div className="location-checkbox unchecked">Mutant Bug Lair</div>
    )
  },
  {
    name: "Witch's Swamp",
    checked: <div className="location-checkbox checked">Witch's Swamp</div>,
    unchecked: <div className="location-checkbox unchecked">Witch's Swamp</div>
  }
];

const selectGridWeather = [
  {
    name: "sunny",
    checked: <div className="location-checkbox checked">Sunny</div>,
    unchecked: <div className="location-checkbox unchecked">Sunny</div>
  },
  {
    name: "rainy",
    checked: <div className="location-checkbox checked">Rainy</div>,
    unchecked: <div className="location-checkbox unchecked">Rainy</div>
  }
];

const selectGridSeasons = [
  {
    name: "spring",
    checked: <div className="location-checkbox checked">Spring</div>,
    unchecked: <div className="location-checkbox unchecked">Spring</div>
  },
  {
    name: "summer",
    checked: <div className="location-checkbox checked">Summer</div>,
    unchecked: <div className="location-checkbox unchecked">Summer</div>
  },
  {
    name: "fall",
    checked: <div className="location-checkbox checked">Fall</div>,
    unchecked: <div className="location-checkbox unchecked">Fall</div>
  },
  {
    name: "winter",
    checked: <div className="location-checkbox checked">Winter</div>,
    unchecked: <div className="location-checkbox unchecked">Winter</div>
  }
];

export { selectGridLocations, selectGridSeasons, selectGridWeather };
