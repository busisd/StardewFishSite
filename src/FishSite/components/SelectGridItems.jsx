import React from "react";

const makeSelectGridItem = (name, displayName, onClick) => ({
  name,
  checked: (
    <div className="location-checkbox checked">{displayName || name}</div>
  ),
  unchecked: (
    <div className="location-checkbox unchecked">{displayName || name}</div>
  ),
  onClick
});

const selectGridLocations = [
  makeSelectGridItem("Ocean", "Beach"),
  makeSelectGridItem("Mountain Lake"),
  makeSelectGridItem("River"),
  makeSelectGridItem("Night Market"),
  makeSelectGridItem("Secret Woods"),
  makeSelectGridItem("Mines"),
  makeSelectGridItem("Sewers"),
  makeSelectGridItem("Desert"),
  makeSelectGridItem("Mutant Bug Lair"),
  makeSelectGridItem("Witch's Swamp")
];

const selectGridWeather = [
  makeSelectGridItem("sunny", "Sunny"),
  makeSelectGridItem("rainy", "Rainy"),
  makeSelectGridItem("onlySunny", "Only sunny"),
  makeSelectGridItem("onlyRainy", "Only rainy")
];

const selectGridSeasons = [
  makeSelectGridItem("spring", "Spring"),
  makeSelectGridItem("summer", "Summer"),
  makeSelectGridItem("fall", "Fall"),
  makeSelectGridItem("winter", "Winter")
];

const selectGridBundles = [
  makeSelectGridItem("River Fish Bundle"),
  makeSelectGridItem("Lake Fish Bundle"),
  makeSelectGridItem("Ocean Fish Bundle"),
  makeSelectGridItem("Night Fishing Bundle"),
  makeSelectGridItem("Specialty Fish Bundle"),
  makeSelectGridItem("Field Research Bundle")
];

const makeSelectGridCheck = (
  setCheckedFish,
  setSearch,
  setCheckState,
  statesToClear
) => [
  {
    name: "checkMode",
    checked: (
      <div className="location-checkbox unchecked">Click fish to check</div>
    ),
    unchecked: (
      <div className="location-checkbox unchecked">Click fish for details</div>
    )
  },
  makeSelectGridItem("shouldHide", "Hide checked fish"),
  makeSelectGridItem("uncheckAll", "Uncheck all fish", () => {
    setCheckedFish({});
  }),
  makeSelectGridItem("clearFilters", "Clear filters", () => {
    setSearch("");
    setCheckState(state => ({ ...state, shouldHide: false }));
    statesToClear.forEach(setState => setState({}));
  })
];

const selectGridLegendary = [
  makeSelectGridItem("common", "Common fish"),
  makeSelectGridItem("legendary", "Legends"),
];

export {
  selectGridLocations,
  selectGridSeasons,
  selectGridWeather,
  selectGridBundles,
  makeSelectGridCheck,
  selectGridLegendary
};
