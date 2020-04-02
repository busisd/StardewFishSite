import React from "react";
import SquareGrid from "./SquareGrid";

const toggleStateMultiSelect = (setSelectState, itemName, newValue) => {
  setSelectState(oldSelectState => ({
    ...oldSelectState,
    [itemName]: newValue
  }));
};

const toggleStateSingleSelect = (setSelectState, itemName, newValue) => {
  setSelectState({
    [itemName]: newValue
  });
};

const makeClickHandler = (gridMultiSelect, setSelectState, itemName, newValue) => 
  gridMultiSelect ? () => toggleStateMultiSelect(setSelectState, itemName, newValue) : 
  () => toggleStateSingleSelect(setSelectState, itemName, newValue)

/*  Each item should be in the form:
  {
    name: [key of item in selectState]
    checked: [something renderable to go in the grid]
    unchecked: [something renderable to go in the grid]
    (optional) onClick: [a custom click handler function]
  }
*/
const SelectGrid = ({ selectState, setSelectState, gridMultiSelect=true, items, ...rest }) => (
  <SquareGrid {...rest}>
    {items.map(item =>
      selectState[item.name]
        ? React.cloneElement(item.checked, {
            ...item.props,
            onClick: item.onClick || makeClickHandler(gridMultiSelect, setSelectState, item.name, false),
            key: item.name
          })
        : React.cloneElement(item.unchecked, {
            ...item.props,
            onClick: item.onClick || makeClickHandler(gridMultiSelect, setSelectState, item.name, true),
            key: item.name
          })
    )}
  </SquareGrid>
);

export default SelectGrid;
